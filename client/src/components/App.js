import React from 'react';

import Header from './Header';
import './App.css';

function App({ children }) {
	return (
		<div>
			<Header />
			<div className='container'>{children}</div>
		</div>
	);
}

export default App;
