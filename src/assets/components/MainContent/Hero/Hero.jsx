import React from 'react'
import ilustration from "../../../images/ilustration.svg"
import "./Hero.scss"

function Hero() {
    return (
        <div className="heroContent">
            <div className="heroText">
                <h1 class="heroTitle">Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.</h1>
            </div>
            <div className="heroIlustration">
                <img src={ilustration} alt="" />
            </div>
        </div>
    )
}

export default Hero