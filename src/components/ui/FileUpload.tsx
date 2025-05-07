// src/components/ui/FileUpload.tsx
import React from 'react';

interface FileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, fileName }) => {
  return (
    <div className="form-field upload-wrapper">
      <span className="upload-filename">{fileName || 'No file chosen'}</span>
      <label htmlFor="file-upload" className="upload-button">Choose File</label>
      <input type="file" id="file-upload" onChange={onChange} />
    </div>
  );
};

export default FileUpload;
