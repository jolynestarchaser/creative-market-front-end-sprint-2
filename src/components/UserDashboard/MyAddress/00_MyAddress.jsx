import { useState } from "react";
import AddressCard from "./01_AddressCard";

const MyAddress = () => {
  const [address, setAddress] = useState(null); // null = ยังไม่มีที่อยู่
  const [mode, setMode] = useState("empty"); // "empty" | "form" | "view"
  const [form, setForm] = useState({
    label: "",
    name: "",
    tel: "",
    street: "",
    city: "",
    postcode: "",
    isCurrent: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setAddress(form);
    setMode("view");
  };

  const handleEdit = () => {
    setForm(address);
    setMode("form");
  };

  const handleDelete = () => {
    setAddress(null);
    setMode("empty");
  };

  const handleCancel = () => {
    setMode(address ? "view" : "empty");
  };

  const handleClickAdd = () => {
    setForm({
      label: "",
      name: "",
      tel: "",
      street: "",
      city: "",
      postcode: "",
      isCurrent: true,
    });
    setMode("form");
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          My Address
        </h1>
        <p className="mt-1 text-sm text-gray-400">ที่อยู่ของฉัน</p>
      </header>

      <h2 className="text-lg font-bold text-gray-900">ที่อยู่จัดส่ง</h2>

      {/* Empty State */}
      {mode === "empty" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 p-10">
          <p className="text-gray-400">ยังไม่มีข้อมูลที่อยู่</p>
          <button
            onClick={handleClickAdd}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm text-white hover:opacity-90"
          >
            + เพิ่มที่อยู่ใหม่
          </button>
        </div>
      )}

      {/* Form */}
      {mode === "form" && (
        <div className="rounded-2xl border border-violet-200 bg-white p-6 space-y-4">
          <p className="font-medium text-gray-800">
            {address ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "ชื่อที่อยู่",
                name: "label",
                placeholder: "บ้าน / ที่ทำงาน",
              },
              {
                label: "ชื่อผู้รับ",
                name: "name",
                placeholder: "ชื่อ-นามสกุล",
              },
              {
                label: "เบอร์โทรศัพท์",
                name: "tel",
                placeholder: "0XX-XXX-XXXX",
              },
              {
                label: "ที่อยู่",
                name: "street",
                placeholder: "บ้านเลขที่, ถนน, ซอย",
              },
              {
                label: "เมือง / จังหวัด",
                name: "city",
                placeholder: "กรุงเทพมหานคร",
              },
              { label: "รหัสไปรษณีย์", name: "postcode", placeholder: "10110" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">{field.label}</label>
                <input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-violet-400"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="rounded-lg bg-violet-600 px-6 py-2 text-sm text-white hover:opacity-90"
            >
              บันทึก
            </button>
            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-200 px-6 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* View */}
      {mode === "view" && address && (
        <AddressCard
          address={address}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
};

export default MyAddress;
