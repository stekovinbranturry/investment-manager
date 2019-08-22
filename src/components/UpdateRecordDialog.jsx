import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputLabel,
	FormControl,
	NativeSelect
} from '@material-ui/core';

import StoreContext from '../stores';
import DashBoardStyle from '../style/DashBoardStyle';

const UpdateRecordDialog = () => {
	const classes = DashBoardStyle();
	const store = useContext(StoreContext);
	const {
		recordToUpdate,
		isUpdateRecordDialogOpen,
		closeUpdateRecordDialog,
		updateRecord
	} = store;
	const { itemID, carType } = toJS(recordToUpdate);
	const [isCashBack, setIsCashBack] = useState(0);
	const [sellMethod, setSellMethod] = useState('');
	const handleClose = () => {
		closeUpdateRecordDialog();
	};

	const handleUpdate = () => {
		updateRecord({
			itemID,
			isCashBack,
			sellMethod
		});
		closeUpdateRecordDialog();
	};

	return (
		<Dialog
			open={isUpdateRecordDialogOpen === 1}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			className={classes.dialog}
		>
			<DialogTitle id='form-dialog-title'>修改{carType}购买记录</DialogTitle>
			<DialogContent>
				<FormControl required className={classes.dialogInput}>
					<InputLabel htmlFor='cashback-native-required'>是否回款</InputLabel>
					<NativeSelect
						value={isCashBack}
						onChange={e => setIsCashBack(parseInt(e.target.value))}
						name='cashback'
						inputProps={{
							id: 'cashback-native-required'
						}}
					>
						<option value={0}>尚未回款</option>
						<option value={1}>已回款</option>
					</NativeSelect>
				</FormControl>
				{isCashBack === 1 && (
					<FormControl required className={classes.dialogInput}>
						<InputLabel shrink={true} htmlFor='sell-native-required'>
							回款渠道
						</InputLabel>
						<NativeSelect
							value={sellMethod}
							onChange={e => setSellMethod(e.target.value)}
							name='sell'
							inputProps={{
								id: 'sell-native-required'
							}}
						>
							<option value='' />
							<option value='wechatpay'>微信</option>
							<option value='alipay'>支付宝</option>
							<option value='unionpay'>银联</option>
						</NativeSelect>
					</FormControl>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					取消
				</Button>
				<Button onClick={handleUpdate} color='primary'>
					确认
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default observer(UpdateRecordDialog);
