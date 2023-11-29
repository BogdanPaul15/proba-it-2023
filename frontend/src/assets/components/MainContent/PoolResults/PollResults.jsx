import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Poll from './Poll/Poll'
import "./PollResults.scss"

function PollResults() {
    // Get all the polls from the database
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
            } catch (err) {
                console.log(err);
            }
        }
    
        fetchData(); // Call the async function

    }, []);
    return (
        <section className="pollSection">
            <div className="pollShowcase">
                {
                    // Map over all polls
                    polls.map((poll) => {
                        return <Poll 
                        key={poll._id} 
                        id={poll._id} 
                        created_by={poll.created_by} 
                        question={poll.question} 
                        options={poll.options}
                        total_votes={poll.total_votes}
                        voters={poll.voters}
                        />
                    })
                }
            </div>
        </section>
    )
}

export default PollResults