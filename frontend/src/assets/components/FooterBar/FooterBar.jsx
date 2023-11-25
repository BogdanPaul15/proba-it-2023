import React from 'react'
import facebook from "../../images/facebook.svg"
import instagram from "../../images/instagram.svg"
import twitch from "../../images/twitch.svg"
import "./FooterBar.scss"

function FooterBar() {
    return (
        <footer className="footer">
            <ul className="footerIcons">
                <li className="footerIconsItem">
                    <a href="https://www.instagram.com/lsacbucuresti/" target="_blank" title="Mergi la pagina de instagram Lsac București." className="footerIconsLink">
                        <img src={instagram} alt="Instagram Logo" />
                    </a>
                </li>
                <li className="footerIconsItem">
                    <a href="https://www.facebook.com/LsacBucuresti" target="_blank" title="Mergi la pagina de facebook Lsac București." className="footerIconsLink">
                        <img src={facebook} alt="Facebook Logo" />
                    </a>
                </li>
                <li className="footerIconsItem">
                    <a href="https://www.twitch.tv/lsac_bucuresti" target="_blank"  title="Mergi la pagina de twitch Lsac București." className="footerIconsLink">
                        <img src={twitch} alt="Twitch Logo" />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default FooterBar