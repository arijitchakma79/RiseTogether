// src/components/ui/FormField.tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  textarea?: boolean;
  select?: boolean;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  textarea = false,
  select = false,
  options = [],
}) => {
  return (
    <div className="form-field">
      {textarea ? (
        <>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="field-input textarea"
          />
          <label htmlFor={name} className="field-label">{label}</label>
        </>
      ) : select ? (
        <>
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="field-input select"
          >
            <option value="" disabled hidden>{label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <label htmlFor={name} className="field-label">{label}</label>
        </>
      ) : (
        <>
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="field-input"
          />
          <label htmlFor={name} className="field-label">{label}</label>
        </>
      )}
    </div>
  );
};

export default FormField;