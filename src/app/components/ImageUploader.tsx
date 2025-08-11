"use client";

import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  maxImages?: number;
  onImagesChange: (files: File[]) => void;
  label?: string;
  initialImages?: File[];
}

export default function ImageUploader({
  maxImages = 5,
  onImagesChange,
  label = "이미지 업로드",
  initialImages = [],
}: ImageUploaderProps) {
  const [images, setImages] = useState<File[]>(initialImages);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialImages.length > 0) {
      const newPreviews = initialImages.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  }, [initialImages]);

  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length + validImageFiles.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const newImages = [...images, ...validImageFiles];
    const newPreviews = [...previews];

    validImageFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      newPreviews.push(url);
    });

    setImages(newImages);
    setPreviews(newPreviews);
    onImagesChange(newImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setImages(newImages);
    setPreviews(newPreviews);
    onImagesChange(newImages);
  };

  const handleUploadClick = () => {
    if (images.length >= maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <div className="d-flex flex-wrap gap-3 align-items-start">
        {/* 기존 이미지 미리보기 */}
        {previews.map((preview, index) => (
          <div key={index} className="position-relative">
            <div
              className="border rounded d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px", overflow: "hidden" }}
            >
              <img
                src={preview}
                alt={`미리보기 ${index + 1}`}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute"
              style={{
                top: "-5px",
                right: "-5px",
                width: "20px",
                height: "20px",
                padding: "0",
                borderRadius: "50%",
                fontSize: "12px",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              ×
            </button>
          </div>
        ))}

        {/* 업로드 버튼 (최대 개수에 도달하지 않았을 때만 표시) */}
        {images.length < maxImages && (
          <div
            className="border border-dashed border-warning rounded d-flex align-items-center justify-content-center cursor-pointer"
            style={{ width: "80px", height: "80px", cursor: "pointer" }}
            onClick={handleUploadClick}
          >
            <div className="text-center">
              <i
                className="bx bx-plus text-muted"
                style={{ fontSize: "24px" }}
              ></i>
              <div className="text-muted small">
                {images.length}/{maxImages}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="d-none"
        onChange={handleFileSelect}
      />

      <div className="form-text mt-2">
        이미지 파일만 업로드 가능하며, 최대 {maxImages}개까지 선택할 수
        있습니다.
      </div>
    </div>
  );
}
