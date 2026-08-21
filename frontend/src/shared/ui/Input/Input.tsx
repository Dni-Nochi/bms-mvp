import type { FC, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode; // Слот для иконки слева
}

export const Input: FC<InputProps> = ({
  label,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[13px] text-gray-700 font-medium">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors py-2.5 ${
            icon ? 'pl-9 pr-3' : 'px-3'
          }`}
          {...props}
        />
      </div>
    </div>
  );
};
