import React from 'react';





const TimePicker = ({ onChange, value, format = "12h", title, readOnly = false, required = false, onBlur = null, size = "md", Icon, form = false }) => {
    return <div className={`test__InputContainer ${size}`}>
        <label>{title} {required && <span className="required">*</span>}</label>
        <div className={form ? 'form__InputContainer' : 'input__IconContainer'}>
            {Icon && <Icon />}
            <input
                type="time"
                onChange={onChange}
                value={value}
                placeholder={title}
                readOnly={readOnly}
                required={required}
                onBlur={onBlur}
                timeformat={format}
            />
        </div>
    </div>;
};

export default TimePicker;