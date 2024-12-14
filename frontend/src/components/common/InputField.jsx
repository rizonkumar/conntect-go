export const InputField = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border border-red-500" : ""
        }`}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
