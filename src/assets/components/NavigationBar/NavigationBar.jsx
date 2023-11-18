import React, { useState } from 'react'
import "./NavigationBar.scss"

function NavigationBar() {
	// Assume that menu is closed when website opens
	const [isMenuOpen, setIsMenuOpen] = useState(false);
    function menuHandler() {
		// Change state of menu when mobile hamburger is clicked
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <header className={`header ${isMenuOpen ? 'activeMenu' : ''}`}>
            <div className="headerMain">
				<a href="#" className="logo" title="Go to homepage.">
					<svg viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 17.1142V8.37782H3.40988C4.08091 8.36087 4.74811 8.48408 5.36882 8.73959C5.88124 8.9572 6.31684 9.3231 6.61963 9.79026C6.90457 10.2869 7.0545 10.8495 7.0545 11.4221C7.0545 11.9947 6.90457 12.5573 6.61963 13.0539C6.31474 13.5192 5.87977 13.8846 5.36882 14.1046C4.74952 14.3652 4.0815 14.4899 3.40988 14.4702H0.688903L1.2508 13.8852V17.118L0 17.1142ZM1.2508 14.0045L0.688903 13.381H3.38294C4.02963 13.4276 4.67223 13.2465 5.19949 12.8692C5.39508 12.6823 5.55077 12.4577 5.65714 12.209C5.76351 11.9603 5.81835 11.6926 5.81835 11.4221C5.81835 11.1516 5.76351 10.8839 5.65714 10.6352C5.55077 10.3864 5.39508 10.1619 5.19949 9.975C4.67274 9.59631 4.03009 9.41386 3.38294 9.45928H0.688903L1.2508 8.83581V14.0045Z" fill="#FF1F66"/>
						<path d="M10.9994 17.1911C10.3824 17.201 9.77356 17.0497 9.23288 16.7524C8.72249 16.4689 8.29828 16.0527 8.00517 15.5478C7.70033 15.018 7.54472 14.4155 7.55488 13.8043C7.54309 13.1942 7.69883 12.5925 8.00517 12.0648C8.30048 11.5659 8.72278 11.1542 9.22903 10.8717C9.77075 10.5739 10.3813 10.4239 10.9994 10.4368C11.615 10.4264 12.2231 10.5734 12.7659 10.864C13.2771 11.1399 13.7009 11.5531 13.9898 12.0571C14.2801 12.5944 14.4322 13.1955 14.4322 13.8063C14.4322 14.417 14.2801 15.0182 13.9898 15.5555C13.6999 16.0596 13.2764 16.4738 12.7659 16.7524C12.2254 17.0502 11.6164 17.2015 10.9994 17.1911ZM10.9994 16.1405C11.4025 16.148 11.8006 16.0498 12.154 15.8557C12.4868 15.662 12.7578 15.3777 12.9353 15.0359C13.1341 14.6564 13.2334 14.2327 13.2239 13.8043C13.2348 13.3771 13.1354 12.9543 12.9353 12.5766C12.753 12.2385 12.4779 11.9594 12.1424 11.7723C11.7926 11.583 11.401 11.4838 11.0032 11.4838C10.6055 11.4838 10.2139 11.583 9.86406 11.7723C9.53004 11.9626 9.25452 12.2408 9.06739 12.5766C8.85986 12.9519 8.75623 13.3757 8.7672 13.8043C8.75757 14.2341 8.86109 14.6588 9.06739 15.0359C9.2529 15.3769 9.52847 15.6605 9.86406 15.8557C10.2111 16.0482 10.6026 16.1464 10.9994 16.1405Z" fill="#FF1F66"/>
						<path d="M15.5715 17.1142V7.85052H16.7685V17.1142H15.5715Z" fill="#FF1F66"/>
						<path d="M18.5311 17.1142V7.85052H19.728V17.1142H18.5311Z" fill="#FF1F66"/>
						<path d="M9.44836 13.7659L10.4644 14.9205L12.6389 12.7075" stroke="#FF1F66" strokeMiterlimit="10"/>
						<path opacity="0.4" d="M27.2598 12.746C30.5033 12.746 33.1328 10.1166 33.1328 6.87299C33.1328 3.62943 30.5033 1 27.2598 1C24.0162 1 21.3868 3.62943 21.3868 6.87299C21.3868 10.1166 24.0162 12.746 27.2598 12.746Z" stroke="#04395E" strokeMiterlimit="10"/>
						<path d="M21.5061 8.22001C20.8634 5.04105 22.8262 1.77742 26.0052 1.13855" stroke="#04395E" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
						<path d="M36 3.2168H24.3964V5.60294H36V3.2168Z" fill="#04395E"/>
						<path d="M27.152 7.4118H24.3964V17.1873H27.152V7.4118Z" fill="#04395E"/>
						<path d="M31.551 5.60297H28.7954V17.1912H31.551V5.60297Z" fill="#04395E"/>
					</svg>
				</a>
				<button className="menuTrigger" onClick={menuHandler}>
					<span className="icon iconHamburger">
						<span className="hamburgerBar hamburgerBar1"></span>
						<span className="hamburgerBar hamburgerBar2"></span>
						<span className="hamburgerBar hamburgerBar3"></span>
					</span>
					<span className="SROnly">Open main menu</span>
				</button>
				<nav className="mainMenu">
					<ul className="mainMenuList">
						{/* <li className="mainMenuItem">
							<a href="#" className="mainMenuLink">
								<span className="linkText">Login</span>
							</a>
						</li>
						<li className="mainMenuItem">
							<a href="#" className="mainMenuLink">
								<span className="linkText">Register</span>
							</a>
						</li> */}
						<li className="mainMenuItem">
							<a href="#" className="mainMenuLink">
								<span className="linkText">Log out</span>
							</a>
						</li>
						<li className="mainMenuItem">
							<a href="#" className="mainMenuLink">
								<span className="linkText">Create poll</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
        </header>
    )
}

export default NavigationBar