import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import SignOut from '../../components/SignOut.jsx';

const UserInfo = () => {
	const store = useContext(StoreContext);
	const { user } = store;
	const { firstName, lastName, username } = user;
	return (
		<div>
			<p>{lastName}</p>
			<p>{firstName}</p>
			<p>{username}</p>
			<SignOut />
		</div>
	);
};

export default observer(UserInfo);
