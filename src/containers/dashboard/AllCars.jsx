import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import uuid from 'uuid/v4';
import StoreContext from '../../stores';
import CarsCommon from './CarsCommon.jsx';

const AllCars = () => {
	const store = useContext(StoreContext);
	const {
		ownedCars,
		totalNumber,
		totalBuyMoney,
		totalSellMoney,
		totalProfit
	} = store;

	const summary = [
		{
			id: uuid(),
			name: '已购车辆:',
			value: `${totalNumber} 辆`
		},
		{
			id: uuid(),
			name: '总投入:',
			value: `￥ ${totalBuyMoney}`
		},
		{
			id: uuid(),
			name: '预计总收入:',
			value: `￥ ${totalSellMoney}`
		},
		{
			id: uuid(),
			name: '预计总收益:',
			value: `￥ ${totalProfit}`
		}
	];
	return <CarsCommon summary={summary} carsList={toJS(ownedCars)} />;
};

export default observer(AllCars);
