import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import SignOut from '../../components/SignOut.jsx';

const UserInfo = () => {
	const store = useContext(StoreContext);
	const { user } = store;
	const { username } = user;
	return (
		<div>
			<p>Welcome {username}</p>
			<SignOut />
		</div>
	);
};

export default observer(UserInfo);
