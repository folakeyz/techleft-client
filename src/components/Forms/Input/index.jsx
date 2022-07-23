import React from 'react';


const Input = ({ onChange, value, type, title, readOnly = false, required = false, onBlur = null, size = "md", Icon, form = false, placeholder }) => {
    return <div className={`test__InputContainer ${size}`}>
        <label>{title} {required && <span className="required">*</span>}</label>
        <div className={form ? 'form__InputContainer' : 'input__IconContainer'}>
            {Icon && <Icon />}
            <input
                type={type}
                onChange={onChange}
                value={value}
                placeholder={placeholder ? placeholder : title}
                readOnly={readOnly}
                required={required}
                onBlur={onBlur}
            />
        </div>
    </div>;
};

export default Input;
