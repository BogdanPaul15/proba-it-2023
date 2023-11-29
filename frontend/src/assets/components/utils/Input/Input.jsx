import "./Input.scss"

function Input({ label, type, id, placeholder, value, onChange }) {
    return (
        <div className="inputContainer">
            <label htmlFor={id} className="SROnly">{label}</label>
            <input id={id} type={type} className="formInput" placeholder={placeholder} value={value} onChange={onChange} name={id} autoComplete="off" />
        </div>
    )
}

export default Input