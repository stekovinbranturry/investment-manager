import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import uuid from 'uuid/v4';
import StoreContext from '../../stores';
import CarsCommon from './CarsCommon.jsx';

const CarsCashBack = () => {
	const store = useContext(StoreContext);
	const {
		carsCashBack,
		totalNumberCashBack,
		totalBuyMoneyCashBack,
		totalSellMoneyCashBack,
		totalProfitCashBack
	} = store;
	const summary = {
		title: '已回款车辆',
		details: [
			{
				id: uuid(),
				name: '车辆数（辆）:',
				value: `${totalNumberCashBack}`
			},
			{
				id: uuid(),
				name: '买入（元）:',
				value: `${totalBuyMoneyCashBack}`
			},
			{
				id: uuid(),
				name: '卖出（元）:',
				value: `${totalSellMoneyCashBack}`
			},
			{
				id: uuid(),
				name: '盈利（元）:',
				value: `${totalProfitCashBack}`
			}
		]
	};
	return <CarsCommon summary={summary} carsList={toJS(carsCashBack)} />;
};

export default observer(CarsCashBack);
