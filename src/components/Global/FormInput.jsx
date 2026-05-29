const FormInput = ({
  label,
  description, // 1. เพิ่ม Prop สำหรับรับข้อความอธิบาย
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  inputMode,
  required,
  isTextArea = false, // 2. เพิ่ม Prop เพื่อเช็คว่าอยากให้เรนเดอร์เป็น Textarea ไหม
  rows = 4, // ควบคุมจำนวนบรรทัดเริ่มต้นของ Textarea
  wrapperClass = "",
  inputWidthClass = "w-full",
}) => {
  const baseClass =
    "p-3 outline-none focus:ring-1 placeholder-gray-400 text-gray-800 transition-colors duration-200";
  const inputClass = error
    ? `${inputWidthClass} ${baseClass} border-2 border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50`
    : `${inputWidthClass} ${baseClass} border border-gray-400 focus:border-black focus:ring-black`;

  return (
    <div className={wrapperClass}>
      {/* ส่วน Label */}
      {label && (
        <label className="block text-base font-bold text-black mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* ส่วน Description (เรนเดอร์เฉพาะตอนที่มีการส่งค่าเข้ามา) */}
      {description && (
        <span className="block text-sm text-gray-500 mb-3">{description}</span>
      )}

      {/* เช็คว่าเป็น Textarea หรือ Input ธรรมดา */}
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {/* แสดง Error ถ้ามี */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
