import React from "react";
import styles from "./customInput.module.css";  

const CustomInput = ({ label, type, value, onChange, name }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.inputLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={styles.inputField}
        type={type || "text"}  
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
