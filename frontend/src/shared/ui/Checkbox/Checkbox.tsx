import type { FC, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          {...props}
        />
        {/* Иконка галочки, которая появляется только когда чекбокс active (checked) */}
        <svg
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-[14px] text-gray-700 select-none group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
};
