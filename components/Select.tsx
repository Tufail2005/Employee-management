interface SelectProps {
    label: string;
    value: string;
    options: string[];
    onChangeState: (val: string) => void;
}


export default function Select({ label, value, options, onChangeState }: SelectProps){
    return(
        <div>
            <label className="font-semibold">{label}</label>
            <select 
                value={value} 
                className="border p-2 rounded-md"
                onChange={(e) => onChangeState(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}