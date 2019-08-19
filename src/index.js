import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import Store from './stores';

ReactDOM.render(
	<Provider Store={Store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
