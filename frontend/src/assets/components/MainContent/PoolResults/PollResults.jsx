import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Poll from './Poll/Poll'
import "./PollResults.scss"

function PollResults() {
    const [polls, setPolls] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios({
                    method: "GET",
                    url: 'http://localhost:3000/api/polls',
                });
                if (res.data.status === 'success') {
                    setPolls(res.data.data.polls);
                }
            } catch (err) {err}
        }
    
        fetchData(); // Call the async function
    
        // Poți adăuga dependențe aici, dacă este nevoie
    }, []);
    return (
        <section className="pollSection">
            <div className="pollShowcase">
                {
                    polls.map((poll) => {
                        return <Poll 
                        key={poll._id} 
                        id={poll._id} 
                        created_by={poll.created_by} 
                        question={poll.question} 
                        option1={poll.options.option1.name} 
                        option2={poll.options.option2.name} 
                        option3={poll.options.option3.name} 
                        votes1={poll.options.option1.votes.quantity} 
                        votes2={poll.options.option2.votes.quantity} 
                        votes3={poll.options.option3.votes.quantity}
                        voted_by1={poll.options.option1.votes.voted_by} 
                        voted_by2={poll.options.option2.votes.voted_by} 
                        voted_by3={poll.options.option3.votes.voted_by} 
                        />
                    })
                }
            </div>
        </section>
    )
}

export default PollResults