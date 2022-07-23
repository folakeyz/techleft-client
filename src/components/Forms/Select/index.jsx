import React from 'react';


const Select = ({ onChange, value, title, options, readOnly = false, required = false, form = false, Icon, filter = "", filterValue = "", secondaryFilter = "", secondaryValue = "", labelcolor = "dark", size = "md", concat = "" }) => {
    return <div className={`test__InputContainer ${size}`}>
        <label className={labelcolor}>{title}{required && <span className='required'>*</span>}</label>
        <div className={form ? 'form__InputContainer' : 'input__IconContainer'}>
            {Icon && <Icon />}
            <select
                onChange={onChange}
                value={value}
                // defaultValue={title}
                disabled={readOnly}
                required={required}> <option value="" disabled>{title}</option>
                {options && options.map((item, i) => (
                    filter ? <option value={secondaryValue ? item[secondaryValue] : item[filterValue]} key={i}>{secondaryFilter ? item[filter][secondaryFilter] + " " + item[filter][concat] : item[filter]}</option> : <option value={item.value} key={i}>{item.value}</option>
                ))}


            </select>
        </div>
    </div>
};

export default Select;
