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

	const summary = {
		title: '全部车辆',
		details: [
			{
				id: uuid(),
				name: '车辆数（辆）:',
				value: `${totalNumber}`
			},
			{
				id: uuid(),
				name: '买入（元）:',
				value: `${totalBuyMoney}`
			},
			{
				id: uuid(),
				name: '卖出（元）:',
				value: `${totalSellMoney}`
			},
			{
				id: uuid(),
				name: '盈利（元）:',
				value: `${totalProfit}`
			}
		]
	};
	return <CarsCommon summary={summary} carsList={toJS(ownedCars)} />;
};

export default observer(AllCars);
