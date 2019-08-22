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
	const summary = [
		{
			id: uuid(),
			name: '已回款车辆:',
			value: `${totalNumberCashBack} 辆`
		},
		{
			id: uuid(),
			name: '已回款投入:',
			value: `￥ ${totalBuyMoneyCashBack}`
		},
		{
			id: uuid(),
			name: '已回款收入:',
			value: `￥ ${totalSellMoneyCashBack}`
		},
		{
			id: uuid(),
			name: '已回款收益:',
			value: `￥ ${totalProfitCashBack}`
		}
	];
	return <CarsCommon summary={summary} carsList={toJS(carsCashBack)} />;
};

export default observer(CarsCashBack);
