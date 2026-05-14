import React from "react";
import PropTypes from "prop-types";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
  className = "",
}) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3
          rounded-xl
          border
          bg-white
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-primary
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-slate-300"
          }
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default Input;