import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface IInputField {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  error?: string | null;
}

export function InputField({ name, type, placeholder, value, onChange, error }: IInputField) {
  return (
    <div className="mb-2 w-full">
      <div className="flex flex-row items-center bg-gray-100 rounded-xl h-10 px-3">
        <div className="h-4 w-4 border-2	border-pink-500 rounded-full mr-2" />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full h-full rounded-xl focus:border-none bg-gray-100 focus:outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
      {!!error && <p className="mb-2 text-red-600">{error}</p>}
    </div>
  );
}
