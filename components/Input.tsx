import { int, number } from "zod";

interface inputType{
    label:string
    type:string
    placeholder:string
    value:string | number
    onChangeState:(value: any) => void;
}

export default function Input({label, type, placeholder, value, onChangeState}:inputType){
    return <div>
        <label>{label}</label>
        <br />
        <input type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>{
            onChangeState(e.target.value)
        }}/>
    </div>
}