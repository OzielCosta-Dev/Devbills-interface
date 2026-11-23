import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectionProps {
    value: TransactionType, 
    id?: string,
    onchange: (type:TransactionType) => void;
}

const TransactionTypeSelector = ({value, onChange, id}: TransactionTypeSelectionProps) => {
   const transactionsTypeButtons = [
    {  
        type: TransactionType.EXPENSE,
        label: "Despesas",
        activeClasses: 'bg-red-500 border-red-500 text-red-700 font-medium',
        inativeClasses: 'bg-transparent border-red-300 text-red-500 hover:bg-red-50',
    },
    {
        type: TransactionType.INCOME,
        label: "Receitas",
        activeClasses: 'bg-green-500 border-green-500 text-green-700 font-medium',
        inativeClasses: 'bg-transparent border-green-300 text-green-500 hover:bg-green-50',
    }
   ]

    return (
        <fieldset className="flex gap-2" id={id}>
            <legend className="sr-only">Tipo de transação</legend>
            {transactionsTypeButtons.map( item => (
                <button
                    key={item.type}
                    type="button"
                    className={`cursor-pointer flex items-center justify-center border rounded-md py-2 px-4 transition-all ${value === item.type ? item.activeClasses : item.inativeClasses}`}
                    onClick={() => onChange(item.type)}
                >
                    {item.label}
                </button>
            ))}
        </fieldset>
    
)}


export default TransactionTypeSelector;