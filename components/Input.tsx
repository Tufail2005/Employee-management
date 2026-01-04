interface inputType {
  label?: string;
  type: string;
  placeholder: string;
  value?: string | number;
  onChangeState: (value: any) => void;
}

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChangeState,
}: inputType) {
  const isTextarea = type === "description";
  return (
    <div>
      <label>{label}</label>
      <br />
      {isTextarea ? (
        <textarea
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeState(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeState(e.target.value)}
        />
      )}
    </div>
  );
}
