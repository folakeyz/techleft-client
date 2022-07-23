import React from 'react';


const DateInput = ({ onChange, value, type, title, readOnly = false, required = false, size = "md", labelcolor = "dark", form = false, Icon }) => {
    return <div className={`test__InputContainer  ${size}`}>
        <label className={labelcolor}>{title}{required && <span className='required'>*</span>}</label>
        <div className={form ? 'form__InputContainer' : 'input__IconContainer'}>
            {Icon && <Icon />}
            <input
                type={type}
                onChange={onChange}
                value={value}
                placeholder={title}
                readOnly={readOnly}
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => (e.currentTarget.type = "text")}
                required={required}

            />

        </div>
    </div>
};

export default DateInput;
