import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, TextField } from '@material-ui/core';
import { Edit, Check } from '@material-ui/icons';
import StoreContext from '../../stores';
import SignOut from '../../components/SignOut.jsx';
import DashBoardStyle from '../../style/DashBoardStyle';

const UserInfo = () => {
	const classes = DashBoardStyle();
	const store = useContext(StoreContext);
	const { user, updateUser } = store;
	const { firstName, lastName, username, weifen } = user;

	const [isEditable, setIsEditable] = useState(false);
	const [firstNameInput, setFirstNameInput] = useState(firstName);
	const [lastNameInput, setLastNameInput] = useState(lastName);
	const [weifenInput, setWeifenInput] = useState(weifen);

	const handleUpdate = () => {
		const payload = {
			firstName: firstNameInput,
			lastName: lastNameInput,
			weifen: weifenInput
		};
		updateUser(payload);
		setIsEditable(false);
	};
	return (
		<div>
			<div className={classes.userInfo}>
				<Typography variant='h5' component='h2'>
					Welcome {username}
				</Typography>
			</div>

			{!isEditable && (
				<div className={classes.userInfo}>
					<Edit color='primary' onClick={() => setIsEditable(true)} />
				</div>
			)}
			<TextField
				disabled={!isEditable}
				label='姓'
				type='text'
				value={firstNameInput}
				onChange={e => setFirstNameInput(e.target.value.trim())}
				margin='normal'
				variant='outlined'
			/>
			<TextField
				disabled={!isEditable}
				label='名'
				type='text'
				value={lastNameInput}
				onChange={e => setLastNameInput(e.target.value.trim())}
				margin='normal'
				variant='outlined'
			/>
			<TextField
				disabled={!isEditable}
				label='微分'
				type='number'
				value={weifenInput}
				onChange={e => setWeifenInput(e.target.value)}
				margin='normal'
				variant='outlined'
			/>
			<div className={classes.userInfo}>
				{isEditable && (
					<Check color='secondary' fontSize='large' onClick={handleUpdate} />
				)}
			</div>
			<div className={classes.userInfo} />
			<div className={classes.userInfo}>
				<SignOut />
			</div>
		</div>
	);
};

export default observer(UserInfo);
