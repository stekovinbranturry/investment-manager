import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import uuid from 'uuid/v4';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';
import SummaryCard from '../../components/SummaryCard.jsx';

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
	return (
		<Grid container spacing={1}>
			<SummaryCard summary={summary} />
			{toJS(ownedCars).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(AllCars);
