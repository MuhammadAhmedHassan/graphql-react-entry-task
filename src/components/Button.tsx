interface IButton {
  title: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export function Button({ title, className, onClick, disabled, type }: IButton) {
  return (
    <button
      type={type}
      className={' py-2 px-4 rounded-xl disabled:cursor-not-allowed ' + className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
