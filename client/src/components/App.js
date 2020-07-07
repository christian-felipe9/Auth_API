import React from 'react';

import Header from './Header';
import './App.css';

function App({ children }) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

export default App;
