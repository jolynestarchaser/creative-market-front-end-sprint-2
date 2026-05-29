import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function UploadFiles({ selectedFile, onFileChange, error }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onFileChange(file);
  };

  return (
    <div>
      <div className={`border-2 border-dashed ${error ? "border-red-500 bg-red-50" : "border-gray-400 bg-white"} p-12 text-center relative hover:bg-gray-50 transition`}>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center">
          <IoCloudUploadOutline className={`text-5xl ${error ? "text-red-400" : "text-gray-400"} mb-4`} />
          <p className="font-semibold text-gray-700">
            Drag and drop your file here
          </p>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
          </p>
        </div>

        <label
          htmlFor="file-upload"
          className={`mt-4 inline-block px-4 py-2 border ${error ? "border-red-500 text-red-500" : "border-gray-300"} rounded hover:bg-gray-100 font-medium cursor-pointer`}
        >
          {selectedFile ? selectedFile.name : "Browse Files"}
        </label>
      </div>
      {/* แสดงข้อความ Error ด้านล่างก้อนเมฆ */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}