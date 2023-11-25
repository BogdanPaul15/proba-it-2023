import React from 'react'
import Poll from './Poll/Poll'
import "./PollResults.scss"

function PollResults() {
    return (
        <section className="pollSection">
            <div className="pollShowcase">
                <Poll />
                <Poll />
                <Poll />
                <Poll />
            </div>
        </section>
    )
}

export default PollResults