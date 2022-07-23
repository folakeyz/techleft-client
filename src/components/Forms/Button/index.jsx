import React from 'react';



const Button = ({ onClick, type = "submit", title, disabled = false, loading = false, isFullWidth = false, size = "md", Icon, color = "color1", label=false }) => {
    return <div className={isFullWidth ? `test__InputContainer ${size}` : `btnContainer ${size}`}>
        {label && <label style={{visibility:"hidden"}}>{title}</label>}
        <button type={type} onClick={onClick} disabled={disabled || loading} className={`btn ${color}`}>
            {title} {Icon && <Icon />} {loading && <span className='loading'></span>}
        </button>
    </div>
}

export default Button
