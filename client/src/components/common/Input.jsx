const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  register,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...(register ? register : {})}
        {...props}
        className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder-gray-400 outline-none transition-all duration-200
          ${error
            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 bg-white focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/20'
          }`}
      />
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
