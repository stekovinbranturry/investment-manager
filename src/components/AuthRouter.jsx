import { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const AuthRouter = props => {
	useEffect(() => {
		const pathList = ['/signup', '/signin'];
		const currentPath = props.location.pathname;

		axios.post('/user/auth').then(res => {
			if (res.data.code === 1) {
				if (!pathList.includes(currentPath)) {
					props.history.push('/signup');
				}
			}
			if (res.data.code === 0) {
				if (pathList.includes(currentPath) || currentPath === '/') {
					props.history.push('/dashboard');
				}
			}
		});
		// eslint-disable-next-line
	}, []);

	return null;
};

export default withRouter(AuthRouter);
