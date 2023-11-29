import React from "react"
import "./PollInput.scss"

function PollInput({ label, type, id, placeholder, value, onChange, visible }) {
    return (
        <div className="pollInputContainer">
            <label htmlFor={id} className={visible}>{label}</label>
            <input id={id} type={type} className="formPollInput" placeholder={placeholder} value={value} onChange={onChange} name={id} autoComplete="off" />
        </div>
    )
}

export default PollInput