import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import SignOut from '../../components/SignOut.jsx';

const UserInfo = () => {
	const store = useContext(StoreContext);
	const { user, totalNumber } = store;
	const { username } = user;
	return (
		<div>
			<p>Welcome {username}</p>
			<p>购买车辆总数：{totalNumber}</p>
			<SignOut />
		</div>
	);
};

export default observer(UserInfo);
