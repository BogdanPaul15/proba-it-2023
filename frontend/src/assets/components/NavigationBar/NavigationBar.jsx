import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../MainContent/Modal/Modal';
import Input from '../utils/Input/Input';
import PollInput from '../utils/PollInput/PollInput';
import add from '../../images/plus-solid.svg'
import x from '../../images/delete.svg'
import "./NavigationBar.scss"

function NavigationBar() {
	// Assume that menu and all modals are closed when website opens
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showCreatePoll, setshowCreatePoll] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	// Handle createPoll inputs
	const [inputCount, setInputCount] = useState(3); // Track the number of inputs
	const [createPollData, setCreatePollData] = useState({
		question: "",
		options: Array.from({ length: 3 }, () => ({ name: "" })), // Initialize with 3 empty inputs
	});

	// Add a new option to the form
	const addOptionInput = () => {
		setInputCount(inputCount + 1);
		setCreatePollData((prevData) => ({
		...prevData,
		options: [...prevData.options, { name: "" }],
		}));
	};

	// Remove an existing option from the form
	const removeOptionInput = (indexToRemove) => {
		setCreatePollData((prevData) => ({
			...prevData,
			options: prevData.options.filter((_, index) => index !== indexToRemove),
		}));
		setInputCount(inputCount - 1);
	};

	// Handle errors
	const [error, setError] = useState('');

	// Handle Registration and Login forms 
	const [regFormData, setRegFormData] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});

	const handleRegChange = (e) => {
		const { name, value } = e.target;
		setRegFormData((prevFormData) => ({
			...prevFormData, 
			[name]: value,
		}));
	};

	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginFormData((prevFormData) => ({
			...prevFormData, 
			[name]: value,
		}));
	};

	const handlePollChange = (e, index) => {
		const { value } = e.target;
		// Update the option at the specified index
		setCreatePollData((prevFormData) => {
			const updatedOptions = [...prevFormData.options];
			updatedOptions[index].name = value;
			return {
				...prevFormData,
				options: updatedOptions,
			};
		});
	};
	
	const handleRegSubmit = async (e) => {
		try {
			e.preventDefault();

			// Fetch POST request to send registration form data
			const { email, password, passwordConfirm } = regFormData;
			const res = await axios({
				method: 'POST',
				url: "http://localhost:3000/api/users/register",
				data: {
					email,
					password,
					passwordConfirm,
				}
			});
			if(res.data.status === 'success') {
				// On success registration, close the reg modal and open the login modal
				closeModal();
				setShowLogin(true);
			}
		} catch (err) {
			setError(err.response.data.message);
		}
	};

	const handleLoginSubmit = async (e) => {
		try {
			e.preventDefault();

			// Fetch POST request to send login form data
			const { email, password } = loginFormData;
			const res = await axios({
				method: "POST",
				url: "http://localhost:3000/api/users/login",
				credentials: 'include',
				withCredentials: true,
				data: {
					email,
					password,
				}
			});
			if(res.data.status === 'success') {
				window.setTimeout(() => {
					location.assign('/');
				}, 400);
			}
		} catch (err) {
			setError(err.response.data.message);
		}
	}

	const handleCreatePoll = async (e) => {
		try {
			e.preventDefault();
			const { question, options } = createPollData;
			const res = await axios({
				method: "POST",
				url: "http://localhost:3000/api/polls",
				withCredentials: true,
				data: {
					question, 
					options
				}
			});
			if(res.data.status === 'success') {
				window.setTimeout(() => {
					location.assign('/');
				}, 400);
			}
		} catch (err) {
			setError(err.response.data.message);
		}
	}

	const handleLogOut = async () => {
		try {
			const res = await axios({
				method: "GET",
				url: 'http://localhost:3000/api/users/logout',
				credentials: 'include',
				withCredentials: true,
			});
			if(res.data.data.status === 'success') {
				location.reload(true);
			}
		} catch (err) {
			setError(err.response.data.message);
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
					setIsUserLoggedIn(true);
				}
			} catch (err) {
				console.log(err);
			}
		}
	
		fetchData(); // Call the async function

        // Poți adăuga dependențe aici, dacă este nevoie
    }, []);


	// Handle all modals (Login, Register and CreatePoll)
	// Also close the menu on mobile when a modal is opened
	const openLogin = () => {
		setShowLogin(true);
		setIsMenuOpen(!isMenuOpen);
	};

	const openRegister = () => {
		setShowRegister(true);
		setIsMenuOpen(!isMenuOpen);
	};

	const openCreatePoll = () => {
		setshowCreatePoll(true);
		setIsMenuOpen(!isMenuOpen);
	};

	const closeModal = () => {
		setShowLogin(false);
		setShowRegister(false);
		setshowCreatePoll(false);
		setError('');
		setRegFormData('');
		setLoginFormData('');
		setCreatePollData({
			question: "",
			options: Array.from({ length: 3 }, () => ({ name: "" })), // Initialize with 3 empty inputs
		});
	};

    return (
		<>
			<header className={`header ${isMenuOpen ? 'activeMenu' : ''}`}>
				<div className="headerMain">
					<a href="/" className="logo" title="Go to homepage.">
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
					{/* Change state of menu when mobile hamburger is clicked */}
					<button  type="button" className="menuTrigger" onClick={() => setIsMenuOpen(!isMenuOpen)}> 
						<span className="icon iconHamburger">
							<span className="hamburgerBar hamburgerBar1"></span>
							<span className="hamburgerBar hamburgerBar2"></span>
							<span className="hamburgerBar hamburgerBar3"></span>
						</span>
						<span className="SROnly">Open main menu</span>
					</button>
					{/* Conditional render the content of the navbar by isUserLoggedIn */}
					<nav className="mainMenu">
						<ul className="mainMenuList">
							{isUserLoggedIn ?
								<>
									<li className="mainMenuItem">
									<button type="button" className="mainMenuLink" onClick={handleLogOut}>
										<span className="linkText">Log out</span>
									</button>
									</li>
									<li className="mainMenuItem">
										<button type="button" className="mainMenuLink" onClick={openCreatePoll}>
											<span className="linkText">Create poll</span>
										</button>
									</li>
								</> : 
								<>
									<li className="mainMenuItem">
										<button type="button" className="mainMenuLink" onClick={openLogin}>
											<span className="linkText">Login</span>
										</button>
									</li>
									<li className="mainMenuItem">
										<button type="button" className="mainMenuLink" onClick={openRegister}>
											<span className="linkText">Register</span>
										</button>
									</li>
								</>
							}
						</ul>
					</nav>
				</div>
			</header>
			{/* Conditional rendering the modals when they are opened */}
			{
				showLogin && 
				<Modal onClose={closeModal} pollTitle="Login">
					<form onSubmit={handleLoginSubmit}>
						<Input label="Email" type="email" id="email" placeholder="Email" value={loginFormData.email} onChange={handleLoginChange} />
						<Input label="Password" type="password" id="password" placeholder="Password" value={loginFormData.password} onChange={handleLoginChange}/>
						<p className="formsError">{error}</p>
						<button type="submit">Login</button>
					</form>
				</Modal>
			}
			{
				showRegister && 
				<Modal onClose={closeModal} pollTitle="Register">
					<form onSubmit={handleRegSubmit}>
						<Input label="Email" type="email" id="email" placeholder="Email" value={regFormData.email} onChange={handleRegChange} />
						<Input label="Password" type="password" id="password" placeholder="Password" value={regFormData.password} onChange={handleRegChange} />
						<Input label="Confirm Password" type="password" id="passwordConfirm" placeholder="Confirm Password" value={regFormData.passwordConfirm} onChange={handleRegChange} />
						<p className="formsError">{error}</p>
						<button type="submit">Register</button>
					</form>	
				</Modal>
			}
			{	
				showCreatePoll && 
				<Modal onClose={closeModal} pollTitle="Create Poll">
					<form onSubmit={handleCreatePoll}>
						<PollInput
							label="Title"
							type="text"
							id="question"
							placeholder="Type your question here"
							value={createPollData.question}
							visible="formPollLabel"
							onChange={(e) => setCreatePollData((prevData) => ({ ...prevData, question: e.target.value }))}
						/>
						<div className="formPollOptionsSection">
							<p>Options</p>
							<div className="formPollOptions">
								{
									createPollData.options.slice(0, inputCount).map((option, index) => (
									<div key={index} className="optionInputContainer">
										<PollInput
											label={`Option ${index + 1}`}
											type="text"
											id={`option${index + 1}`}
											placeholder={`Option ${index + 1}`}
											value={option.name}
											visible="SROnly"
											onChange={(e) => handlePollChange(e, index)}
										/>
										{index >= 3 && ( // Make sure default inputs are not removable
											<button type="button" className="removeOptionBtn" onClick={() => removeOptionInput(index)}>
												<img src={x} alt="Remove the input." />
											</button>
										)}
									</div>
								))}
								<button type="button" className="optionAdd" onClick={addOptionInput}>
									<img src={add} alt="Add a new input." />
									<span>Add Option</span>
								</button>
							</div>
						</div>
						<p className="formsError">{error}</p>
						<button type="submit">Create poll</button>
					</form>	
				</Modal>
			}
		</>
    )
}

export default NavigationBar