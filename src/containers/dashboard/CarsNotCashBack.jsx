import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import uuid from 'uuid/v4';
import StoreContext from '../../stores';
import CarsCommon from './CarsCommon.jsx';

const CarsNotCashBack = () => {
	const store = useContext(StoreContext);
	const {
		carsNotCashBack,
		totalNumberNotCashBack,
		totalBuyMoneyNotCashBack,
		totalSellMoneyNotCashBack,
		totalProfitNotCashBack
	} = store;
	const summary = [
		{
			id: uuid(),
			name: '待回款车辆:',
			value: `${totalNumberNotCashBack} 辆`
		},
		{
			id: uuid(),
			name: '待回款投入:',
			value: `￥ ${totalBuyMoneyNotCashBack}`
		},
		{
			id: uuid(),
			name: '待回款收入:',
			value: `￥ ${totalSellMoneyNotCashBack}`
		},
		{
			id: uuid(),
			name: '待回款收益:',
			value: `￥ ${totalProfitNotCashBack}`
		}
	];
	return <CarsCommon summary={summary} carsList={toJS(carsNotCashBack)} />;
};

export default observer(CarsNotCashBack);
