import React from 'react'
import './toggle.css'

const Switch = ({ title, checked, onChange }) => {
    return (
        <div className="techleft__InputContainer techleft__child">
            <label>{title}</label>
            <input type="checkbox" id="toggle" class="offscreen"
                checked={checked}
                onChange={onChange} />
            <label htmlFor="toggle" class="switch"></label></div>
    )
}

export default Switch