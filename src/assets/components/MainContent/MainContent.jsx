import React from 'react'
import Hero from './Hero/Hero'
import PollResults from './PoolResults/PollResults'
import "./MainContent.scss"

function MainContent() {
    return (
        <main className="main">
            <Hero />
            <PollResults />
        </main>
    )
}

export default MainContent