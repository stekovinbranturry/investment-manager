import { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const AuthRouter = props => {
	useEffect(() => {
		const pathList = ['/signup', '/signin'];
		const currentPath = props.location.pathname;

		axios.get('/user/auth').then(res => {
			if (res.status === 200 && res.data.code === 1) {
				if (!pathList.includes(currentPath)) {
					props.history.push('/signup');
				}
			}
			if (res.status === 200 && res.data.code === 0) {
				if (pathList.includes(currentPath) || currentPath) {
					props.history.push('/dashboard');
				}
			}
		});
	});

	return null;
};

export default withRouter(AuthRouter);
