import React from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button } from '@material-ui/core';

const Logout = props => {
	const removeCookie = useCookies(['userid'])[2];

	const logout = () => {
		removeCookie('userid');
		props.history.push('/signin');
	};
	return (
		<Button variant='contained' color='secondary' onClick={logout}>
			退出登录
		</Button>
	);
};

export default withRouter(Logout);
