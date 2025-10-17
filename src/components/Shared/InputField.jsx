export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};
