import { useEffect, useState } from 'react'
import axios from 'axios'
import "./Poll.scss"

function Poll(props) {
    const [currentUserId, setCurrentUserId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [votingError, setVotingError] = useState('');
    const handlePollVote = async (e) => {
        try {
            e.preventDefault();

            if (!selectedOption) {
                setVotingError("You must select an option.");
                return;
            }

			const res = await axios({
				method: "PATCH",
				url: `http://localhost:3000/api/polls/vote/${props.id}`,
                withCredentials: true,
                data: {
                    currentUserId,
                    selectedOption
                }
			});
			if(res.data.status === "success") {
                window.setTimeout(() => {
					location.assign('/');
				}, 1500);
                // console.log(res.data.body)
            }
		} catch (err) {
			setVotingError(err.response.data.message);
		}
    }
    const handlePollDelete = async (e) => {
		try {
            e.preventDefault();
			const res = await axios({
				method: "DELETE",
				url: `http://localhost:3000/api/polls/${props.id}`,
                withCredentials: true,
			});
			if(res.data.status === "success") {
                location.reload(true);
            }
		} catch (err) {
			err
		}
    }
    useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios({
					method: "GET",
					url: 'http://localhost:3000/api/users/checkToken',
					credentials: 'include',
					withCredentials: true,
				});
				if (res.data.status === 'success') {
					setCurrentUserId(res.data.id);
				}
			} catch (err) {err}
		}
	
		fetchData(); // Call the async function

        // Poți adăuga dependențe aici, dacă este nevoie
    }, [currentUserId]);
	
    return (
        <div className="pollCard">
            <div className="pollHeader">
                <h2 className="pollQuestion">{props.question}</h2>
                <h3 className="pollInstruction">Make a choice:</h3>
            </div>
            <form className="#">
                <ul className="pollOptionShowcase">
                    <li className="pollOptionItem">
                        <div className="pollInputs">
                            <input type="radio" id="option1" name="options" value={props.option1} className="" onChange={() => setSelectedOption("option1")} />
                            <label htmlFor="option1">{props.option1}</label>
                        </div>
                        <p>{props.votes1}</p>
                    </li>
                    <li className="pollOptionItem">
                        <div className="pollInputs">
                            <input type="radio" id="option2" name="options" value={props.option2} className="" onChange={() => setSelectedOption("option2")}/>
                            <label htmlFor="option2">{props.option2}</label>
                        </div>
                        <p>{props.votes2}</p>
                    </li>
                    <li className="pollOptionItem">
                        <div className="pollInputs">
                            <input type="radio" id="option3" name="options" value={props.option3} className="" onChange={() => setSelectedOption("option3")}/>
                            <label htmlFor="option3">{props.option3}</label>
                        </div>
                        <p>{props.votes3}</p>
                    </li>
                </ul>
                <p className="pollVotingError">{votingError}</p>
                <div className="pollOptionButtons">
                    {
                        currentUserId == props.created_by ? <button className="pollButton" onClick={handlePollDelete}>Delete</button> : ""
                    }
                    {
                        currentUserId ? <button className="pollButton" onClick={handlePollVote}>Vote</button> : ""
                    }
                </div>
            </form>
        </div>
    )
}

export default Poll