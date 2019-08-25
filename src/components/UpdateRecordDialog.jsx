import React, { Fragment, useState, useContext } from 'react';
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
import { Delete } from '@material-ui/icons';
import StoreContext from '../stores';
import DashBoardStyle from '../style/DashBoardStyle';

const UpdateRecordDialog = () => {
	const classes = DashBoardStyle();
	const store = useContext(StoreContext);
	const {
		recordToUpdate,
		isUpdateRecordDialogOpen,
		closeUpdateRecordDialog,
		updateRecord,
		deleterRecord
	} = store;
	const { itemID, carType } = toJS(recordToUpdate);
	const [isCashBack, setIsCashBack] = useState(0);
	const [sellMethod, setSellMethod] = useState('');
	const [confirmOpen, setConfirmOpen] = useState(false);
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
	const handleConfirmDelete = () => {
		deleterRecord();
		setConfirmOpen(false);
		closeUpdateRecordDialog();
	};
	return (
		<Fragment>
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
							<option value={0}>待回款</option>
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
					<Button color='secondary' onClick={() => setConfirmOpen(true)}>
						<Delete color='secondary' /> 删除记录
					</Button>
					<Button onClick={handleClose} color='primary'>
						取消
					</Button>
					<Button onClick={handleUpdate} color='primary'>
						确认
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					确定删除{carType}购买记录
				</DialogTitle>
				<DialogActions>
					<Button onClick={() => setConfirmOpen(false)} color='primary'>
						取消
					</Button>
					<Button onClick={handleConfirmDelete} color='secondary'>
						确定删除
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default observer(UpdateRecordDialog);
