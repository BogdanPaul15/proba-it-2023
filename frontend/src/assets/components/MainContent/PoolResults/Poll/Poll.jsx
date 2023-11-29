import { useEffect, useState } from 'react'
import axios from 'axios'
import voted from '../../../../images/circle-check-solid.svg'
import "./Poll.scss"

function Poll(props) {
    const [currentUserId, setCurrentUserId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [votingError, setVotingError] = useState('');
    const handlePollVote = async (e) => {
        try {
            e.preventDefault();

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
    // console.log(currentUserId);
    return (
        <div className="pollCard">
            <div className="pollHeader">
                <h2 className="pollQuestion">{props.question}</h2>
                <h3 className="pollInstruction">Make a choice:</h3>
            </div>
            <form className="#">
                <ul className="pollOptionShowcase">
                    {
                        props.options.map((option) => {
                            return(
                                <li className="pollOptionItem" key={option._id}>
                                    {
                                    props.voters.find(el => el === currentUserId) ?
                                    <div className="pollVoting">
                                        <p>{`${Math.trunc((option.votes.quantity / props.total_votes) * 100)}%`}</p>
                                    </div> : "" }
                                    <div className="pollInputs">
                                        <div className="asta">
                                            {
                                                currentUserId ? 
                                                props.voters.find(el => el === currentUserId) ? <input type="radio" id={option._id} name="options" value={option.name} className="" onChange={() => setSelectedOption(option._id)} disabled className="SROnly" /> :
                                                <input type="radio" id={option._id} name="options" value={option.name} className="" onChange={() => setSelectedOption(option._id)} /> : 
                                                <input type="radio" id={option._id} name="options" value={option.name} className="" onChange={() => setSelectedOption(option._id)} disabled />
                                            }
                                            <label htmlFor={option._id}>{option.name}</label>
                                            {
                                                option.votes.voters.find(el => el === currentUserId) ?
                                                <img src={voted} /> : ""
                                            }
                                        </div>
                                        {
                                            props.voters.find(el => el === currentUserId) &&  (option.votes.quantity / props.total_votes) * 100 ?
                                            <div className="pollOptionProgress">
                                            <div className="progressBar" style={{width: `${(option.votes.quantity / props.total_votes) * 100}%`}}></div>
                                        </div> : ""
                                        }
                                    </div>
                                    {/* {
                                        props.voters.find(el => el === currentUserId) ? <p>{option.votes.quantity}</p> : ""
                                    } */}
                                    {console.log(props.voters)}
                                </li>
                            );
                        })
                    }
                </ul>
                <p className="pollVotingError">{votingError}</p>
                <footer className="pollFooter">
                    <div className="pollStats">
                        <span>Total Votes: {props.total_votes}</span>
                    </div>
                    <div className="pollOptionButtons">
                        {
                            currentUserId == props.created_by ? <button className="pollButton" onClick={handlePollDelete}>Delete</button> : ""
                        }
                        {
                            currentUserId ? props.voters.find(el => el === currentUserId) ? "" : <button className="pollButton" onClick={handlePollVote}>Vote</button> : ""
                        }
                    </div>
                </footer>
            </form>
        </div>
    )
}

export default Poll