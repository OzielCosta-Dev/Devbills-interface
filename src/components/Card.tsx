import type { ReactNode } from "react";

interface CardProp {
    children: ReactNode; 
    title?: string;
    subtitle?: String;
    icon?: ReactNode;
    hover:?: boolean;
    glowEffect?: boolean;
    className?: string;
}





const Card = ({ children, className = "", glowEffect = false, hover = false, icon, subtitle, title }: CardProps) => {



    return (
        <div className={`bg-gray-900 rounded-xl border border-gray-700 shadow-md p-6 transition-all *:**:
                  ${hover ? "hover: border-primary-500 shadow-lg hover:-translate-y-0.5" : ""}
                  ${glowEffect ? 'glow' : ''}
                  ${className}
        
        `}>
            {children}
        </div>
    )
}



export default Card;