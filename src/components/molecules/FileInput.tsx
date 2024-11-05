"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface FileInputProps {
  imagePath?: string;
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ imagePath, onChange }) => {
  const [preview, setPreview] = useState<string | undefined>(imagePath);

  useEffect(() => {
    setPreview(imagePath);
  }, [imagePath]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      } else {
        alert('Please select a valid image file (png, jpeg, jpg)');
        setPreview(undefined);
        onChange(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {preview && <Image src={preview} alt="Preview" width={345} height={200} className="mb-2 rounded-full" />}
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