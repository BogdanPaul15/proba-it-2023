import React from "react"
import close from "../../../images/close-modal.svg"
import "./Modal.scss"

function Modal({ onClose, pollTitle, children}) {
    return (
        <div className="modalCard">
            <article className="modalContainer">
                <div className="headerModal">
                    <button className="modalClose" onClick={onClose}>
                        <img src={close} alt="Close button for Modal" />
                    </button>
                </div>
                <section className="modalBody">
                    <div className="modalHeader">
                        <h2 className="modalTitle">{pollTitle}</h2>
                    </div>
                    {children}
                </section>
            </article>
        </div>
    )
}

export default Modal