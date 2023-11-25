import React from 'react'
import "./Poll.scss"

function Poll() {
    return (
        <div className="pollCard">
            <h2 className="pollQuestion">Ce animal se afla pe tricourile departamentului de IT?</h2>
            <h3 className="pollInstruction">Make a choice:</h3>
            <form className="#">
                <ul className="pollOptionShowcase">
                    <li className="pollOptionItem">
                        <input type="radio" id="option1" name="options" value="Option 1" className="" />
                        <label htmlFor="option1">Option 1</label>
                    </li>
                    <li className="pollOptionItem">
                        <input type="radio" id="option2" name="options" value="Option 2" className="" />
                        <label htmlFor="option2">Option 2</label>
                    </li>
                    <li className="pollOptionItem">
                        <input type="radio" id="option3" name="options" value="Option 3" className="" />
                        <label htmlFor="option3">Option 3</label>
                    </li>
                    <li className="pollOptionItem">
                        <input type="radio" id="option4" name="options" value="Option 4" className="" />
                        <label htmlFor="option4">Option 4</label>
                    </li>
                </ul>
                <div className="pollOptionButtons">
                    <button className="pollButton">Delete</button>
                    <button className="pollButton">Vote</button>
                </div>
            </form>

        </div>
    )
}

export default Poll