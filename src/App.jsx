import React from 'react'
import NavigationBar from './assets/components/NavigationBar/NavigationBar'
import MainContent from './assets/components/MainContent/MainContent'
import FooterBar from './assets/components/FooterBar/FooterBar'
import "./App.scss"

function App() {
	return (
	
		<div className="framework">
			<NavigationBar />
			<MainContent />
			<FooterBar />
		</div>
	)
}

export default App
