import React from 'react';


const Textarea = ({ onChange, value, title, required = false, size = "lg", labelcolor = "dark", form = false, Icon }) => {
    return <div className={`test__InputContainer ${size}`}>
        <label className={labelcolor}>{title} {required && <span className='required'>*</span>}</label>
        <div className={form ? 'form__InputContainer' : 'input__IconContainer'}>
            {Icon && <Icon />}
            <textarea
                onChange={onChange}
                value={value}
                placeholder={title}
                required={required}
            ></textarea>

        </div>
    </div>
};

export default Textarea;
