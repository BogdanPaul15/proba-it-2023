import { React, useEffect, useState } from 'react'
import axios from 'axios'
import voted from '../../../../images/circle-check-solid.svg'
import "./Poll.scss"

function Poll(props) {
    const [currentUserId, setCurrentUserId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [votingError, setVotingError] = useState('');

    // Handle poll voting
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
				}, 400);
            }
		} catch (err) {
			setVotingError(err.response.data.message);
		}
    }

    // Handle poll deletion
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
			setVotingError(err.response.data.message);
		}
    }

    // Retrieve user id from the jwt token
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

    }, []);

    return (
        <div className="pollCard">
            <div className="pollHeader">
                <h2 className="pollQuestion">{props.question}</h2>
                <h3 className="pollInstruction">Make a choice:</h3>
            </div>
            <form>
                <ul className="pollOptionShowcase">
                    {
                        // Map over all options of the poll
                        props.options.map((option) => {
                            return(
                                <li className="pollOptionItem" key={option._id}>
                                    {
                                        // If the user already votes to this poll, show him the results by percentage (only if he's logged in)
                                        props.voters.find(el => el === currentUserId) ?
                                        <div className="pollVoting">
                                            <p>{`${Math.trunc((option.votes.quantity / props.total_votes) * 100)}%`}</p>
                                        </div> : "" 
                                    }
                                    <div className="pollInputs">
                                        <div className="pollInput">
                                            {
                                                // Handle situation when user is not logged in by not letting him to vote (disable the field), or if he already voted, hide the input 
                                                currentUserId ? 
                                                props.voters.find(el => el === currentUserId) ? <input type="radio" id={option._id} name="options" value={option.name} onChange={() => setSelectedOption(option._id)} disabled className="SROnly" /> :
                                                <input type="radio" id={option._id} name="options" value={option.name} onChange={() => setSelectedOption(option._id)} /> : 
                                                <input type="radio" id={option._id} name="options" value={option.name} onChange={() => setSelectedOption(option._id)} disabled />
                                            }
                                            <label htmlFor={option._id}>{option.name}</label>
                                            {
                                                // Show a circle-check to highlight the user's answer
                                                option.votes.voters.find(el => el === currentUserId) ?
                                                <img src={voted} alt="Circle check." /> : ""
                                            }
                                        </div>
                                        {
                                            // If the user already voted and is logged in, display a progress bar for each option representing the votes
                                            props.voters.find(el => el === currentUserId) &&  (option.votes.quantity / props.total_votes) * 100 ?
                                            <div className="pollOptionProgress">
                                                <div className="progressBar" style={{width: `${(option.votes.quantity / props.total_votes) * 100}%`}}></div>
                                            </div> : ""
                                        }
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </form>
            <p className="pollVotingError">{votingError}</p>
            <footer className="pollFooter">
                <div className="pollStats">
                    <span>Total Votes: {props.total_votes}</span>
                </div>
                <div className="pollOptionButtons">
                    {
                        // If the user is who created the poll, display him the 'delete' button
                        currentUserId == props.created_by ? <button className="pollButton" onClick={handlePollDelete}>Delete</button> : ""
                    }
                    {
                        // If the user didn't vote to this poll, display him the 'vote' button
                        currentUserId ? props.voters.find(el => el === currentUserId) ? "" : <button type="submit" className="pollButton" onClick={handlePollVote}>Vote</button> : ""
                    }
                </div>
            </footer>
        </div>
    )
}

export default Poll