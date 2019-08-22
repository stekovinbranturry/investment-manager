import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import uuid from 'uuid/v4';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';
import SummaryCard from '../../components/SummaryCard.jsx';

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
			name: '未回款车辆:',
			value: `${totalNumberNotCashBack} 辆`
		},
		{
			id: uuid(),
			name: '未回款投入:',
			value: `￥ ${totalBuyMoneyNotCashBack}`
		},
		{
			id: uuid(),
			name: '未回款收入:',
			value: `￥ ${totalSellMoneyNotCashBack}`
		},
		{
			id: uuid(),
			name: '未回款收益:',
			value: `￥ ${totalProfitNotCashBack}`
		}
	];
	return (
		<Grid container spacing={1}>
			<SummaryCard summary={summary} />
			{toJS(carsNotCashBack).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(CarsNotCashBack);
