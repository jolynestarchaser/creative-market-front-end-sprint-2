import { useEffect, useState } from "react";
import AddressCard from "./01_AddressCard";

const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

const emptyForm = {
  recipientName: "",
  phone: "",
  street: "",
  district: "",
  province: "",
  postcode: "",
};

const MyAddress = () => {
  const [address, setAddress] = useState(null);
  const [mode, setMode] = useState("empty");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchAddress = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${serverBaseUrl}/api/user-dashboard/my-address`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load address");
        }

        setAddress(result.data);
        setMode(result.data ? "view" : "empty");
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError(fetchError.message || "Failed to load address");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();

    return () => controller.abort();
  }, []);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`${serverBaseUrl}/api/user-dashboard/my-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save address");
      }

      setAddress(result.data);
      setForm(result.data);
      setMode("view");
    } catch (saveError) {
      setError(saveError.message || "Failed to save address");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setForm(address || emptyForm);
    setMode("form");
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`${serverBaseUrl}/api/user-dashboard/my-address`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete address");
      }

      setAddress(null);
      setForm(emptyForm);
      setMode("empty");
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete address");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(address || emptyForm);
    setMode(address ? "view" : "empty");
    setError("");
  };

  const handleClickAdd = () => {
    setForm(emptyForm);
    setMode("form");
    setError("");
  };

  const fields = [
    {
      label: "ชื่อผู้รับ",
      name: "recipientName",
      placeholder: "ชื่อ-นามสกุล",
    },
    {
      label: "เบอร์โทรศัพท์",
      name: "phone",
      placeholder: "0XX-XXX-XXXX",
    },
    {
      label: "ที่อยู่",
      name: "street",
      placeholder: "บ้านเลขที่, ถนน, ซอย",
    },
    {
      label: "เขต / อำเภอ",
      name: "district",
      placeholder: "เขต / อำเภอ",
    },
    {
      label: "จังหวัด",
      name: "province",
      placeholder: "กรุงเทพมหานคร",
    },
    {
      label: "รหัสไปรษณีย์",
      name: "postcode",
      placeholder: "10110",
    },
  ];

  if (loading) {
    return <section className="text-sm text-gray-500">กำลังโหลดที่อยู่...</section>;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          My Address
        </h1>
        <p className="mt-1 text-sm text-gray-400">ที่อยู่ของฉัน</p>
      </header>

      <h2 className="text-lg font-bold text-gray-900">ที่อยู่จัดส่ง</h2>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      ) : null}

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

      {mode === "form" && (
        <div className="space-y-4 rounded-2xl border border-violet-200 bg-white p-6">
          <p className="font-medium text-gray-800">
            {address ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">{field.label}</label>
                <input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={submitting}
              className="rounded-lg bg-violet-600 px-6 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "กำลังบันทึก..." : "บันทึก"}
            </button>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className="rounded-lg border border-gray-200 px-6 py-2 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-60"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {mode === "view" && address && (
        <AddressCard
          address={address}
          onEdit={handleEdit}
          onDelete={handleDelete}
          submitting={submitting}
        />
      )}
    </section>
  );
};

export default MyAddress;
