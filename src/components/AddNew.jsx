import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import uuid from 'uuid/v4';
import {
	Button,
	Input,
	Dialog,
	DialogActions,
	DialogContentText,
	DialogContent,
	DialogTitle,
	InputLabel,
	FormControl,
	NativeSelect
} from '@material-ui/core';

import StoreContext from '../stores';
import DashBoardStyle from '../style/DashBoardStyle';
import { getSellDate } from '../utils/getSellDate';

const AddNew = () => {
	const classes = DashBoardStyle();
	const store = useContext(StoreContext);
	const { isAddNewOpen, closeAddNew, goods, goodsNameList, addNewItem } = store;
	const [carType, setCarType] = useState('');
	const [buyPrice, setBuyPrice] = useState(0);
	const [buyMethod, setBuyMethod] = useState('');
	const [buyDate, setBuyDate] = useState('');
	const [isCashBack, setIsCashBack] = useState(0);
	const [sellMethod, setSellMethod] = useState('');
	const [errCheck, setErrCheck] = useState(false);

	const handleClose = () => {
		closeAddNew();
	};

	const getDay = type =>
		parseInt([...toJS(goods)].filter(item => item.name === type)[0].day);

	const getRate = type =>
		parseInt([...toJS(goods)].filter(item => item.name === type)[0].rate) /
		1000;

	const handleAddItem = () => {
		if (!carType || !buyDate) {
			setErrCheck(true);
			return;
		}
		const sellPrice = (parseFloat(buyPrice) * (1 + getRate(carType))).toFixed(
			2
		);
		const item = {
			itemID: uuid(),
			carType,
			buyPrice: parseFloat(buyPrice),
			buyMethod: buyMethod,
			buyDate: buyDate,
			isCashBack,
			sellPrice: parseFloat(sellPrice),
			sellMethod,
			sellDate: getSellDate(buyDate, getDay(carType)),
			profit: parseFloat((sellPrice - buyPrice).toFixed(2))
		};
		addNewItem(item);
		closeAddNew();
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
						error={errCheck && !carType}
						value={carType}
						onChange={e => setCarType(e.target.value)}
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
					<InputLabel shrink={true} htmlFor='price'>
						购买价格
					</InputLabel>
					<Input
						error={errCheck && !buyPrice}
						required
						id='price'
						type='number'
						value={buyPrice}
						onChange={e => setBuyPrice(e.target.value)}
					/>
				</FormControl>
				<FormControl required className={classes.dialogInput}>
					<InputLabel shrink={true} htmlFor='pay-native-required'>
						支付渠道
					</InputLabel>
					<NativeSelect
						error={errCheck && !buyMethod}
						value={buyMethod}
						onChange={e => setBuyMethod(e.target.value)}
						name='pay'
						inputProps={{
							id: 'pay-native-required'
						}}
					>
						<option value='' />
						<option value='wechatpay'>微信</option>
						<option value='alipay'>支付宝</option>
						<option value='unionpay'>银联</option>
					</NativeSelect>
				</FormControl>
				<FormControl required className={classes.dialogInput}>
					<InputLabel shrink={true} htmlFor='date'>
						购买日期
					</InputLabel>
					<Input
						error={errCheck && !buyDate}
						required
						id='date'
						type='date'
						value={buyDate}
						onChange={e => setBuyDate(e.target.value)}
					/>
				</FormControl>
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
							error={errCheck && !sellMethod}
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
				<Button onClick={handleAddItem} color='primary'>
					确认
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default observer(AddNew);
