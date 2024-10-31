"use client";

import React, { useState } from 'react';

interface FileInputProps {
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      } else {
        alert('Please select a valid image file (png, jpeg, jpg)');
        setPreview(null);
        onChange(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {preview && <img src={preview} alt="Preview" className="mb-2 max-w-xs" />}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer bg-primary p-2 rounded">
        {preview ? 'Mudar Imagem' : 'Inserir Imagem'}
      </label>
    </div>
  );
};

export default FileInput;