import { FirebaseError } from "firebase/app";
import {
	signOut as firebaseSignOut,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
	authState: AuthState;
	signWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const firebaseErrorMessages: Record<string, string> = {
	"auth/popup-closed-by-user": "A janela de login foi fechada antes de concluir.",
	"auth/cancelled-popup-request": "Login cancelado.",
	"auth/popup-blocked":
		"O navegador bloqueou a janela de login. Permita pop-ups e tente novamente.",
	"auth/network-request-failed": "Falha de conexão. Verifique sua internet.",
};

const getAuthErrorMessage = (err: unknown, fallback: string): string => {
	if (err instanceof FirebaseError) {
		return firebaseErrorMessages[err.code] ?? fallback;
	}
	return fallback;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// Começa como "loading" até o Firebase informar se há sessão ativa,
	// evitando redirecionar para /login ao recarregar uma página privada.
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		error: null,
		loading: true,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			(user) => {
				setAuthState({
					user: user
						? {
								uid: user.uid,
								email: user.email,
								displayName: user.displayName,
								photoURL: user.photoURL,
							}
						: null,
					error: null,
					loading: false,
				});
			},
			(error) => {
				console.error("Erro na autenticação", error);
				setAuthState({
					user: null,
					error: "Erro ao verificar autenticação",
					loading: false,
				});
			},
		);

		return () => unsubscribe();
	}, []);

	const signWithGoogle = useCallback(async (): Promise<void> => {
		setAuthState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			await signInWithPopup(firebaseAuth, googleAuthProvider);
		} catch (err) {
			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: getAuthErrorMessage(err, "Erro ao tentar fazer login"),
			}));
		}
	}, []);

	const signOut = useCallback(async (): Promise<void> => {
		setAuthState((prev) => ({ ...prev, loading: true }));

		try {
			await firebaseSignOut(firebaseAuth);
		} catch (err) {
			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: getAuthErrorMessage(err, "Erro ao tentar sair"),
			}));
			throw err;
		}
	}, []);

	const value = useMemo(
		() => ({ authState, signWithGoogle, signOut }),
		[authState, signWithGoogle, signOut],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}

	return context;
};
