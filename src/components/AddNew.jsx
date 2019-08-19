import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import StoreContext from '../stores';
import DashBoardStyle from '../style/DashBoardStyle';

const AddNew = () => {
	const classes = DashBoardStyle();
	const store = useContext(StoreContext);
	const { isAddNewOpen, closeAddNew, goodsNameList } = store;
	const [car, setCar] = useState('');
	const [date, setDate] = useState('');
	const [isCashBack, setIsCashBack] = useState(0);
	const [errCheck, setErrCheck] = useState(false);

	const handleClose = () => {
		closeAddNew();
	};

	const handleAddItem = () => {
		if (!car || !date) {
			setErrCheck(true);
			return;
		}
		console.log({ car, date, isCashBack });
	};

	return (
		<Dialog
			open={isAddNewOpen === 1}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>添加新的购买记录</DialogTitle>
			<DialogContent>
				<DialogContentText>
					摩托车旧：收益率是6%的摩托车
					<br />
					摩托车新：收益率是4%的摩托车
				</DialogContentText>
				<FormControl required className={classes.dialogInput}>
					<InputLabel shrink={true} htmlFor='car-native-required'>
						购买车辆
					</InputLabel>
					<NativeSelect
						error={errCheck && !car}
						value={car}
						onChange={e => setCar(e.target.value)}
						name='car'
						inputProps={{
							id: 'car-native-required'
						}}
					>
						<option value='' />
						{goodsNameList.map(item => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</NativeSelect>
				</FormControl>
				<FormControl required className={classes.dialogInput}>
					<InputLabel shrink={true} htmlFor='date'>
						购买日期
					</InputLabel>
					<Input
						error={errCheck && !date}
						required
						id='date'
						type='date'
						value={date}
						onChange={e => setDate(e.target.value)}
					/>
				</FormControl>
				<FormControl required className={classes.dialogInput}>
					<InputLabel htmlFor='cashback-native-required'>是否回款</InputLabel>
					<NativeSelect
						value={isCashBack}
						onChange={e => setIsCashBack(e.target.value)}
						name='cashback'
						inputProps={{
							id: 'cashback-native-required'
						}}
					>
						<option value={0}>尚未回款</option>
						<option value={1}>已回款</option>
					</NativeSelect>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					取消
				</Button>
				<Button onClick={handleAddItem} color='primary'>
					确认
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default observer(AddNew);
