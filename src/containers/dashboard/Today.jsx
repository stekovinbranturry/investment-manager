import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid, Typography } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';

const Today = () => {
	const store = useContext(StoreContext);
	const { todayBuy, todaySell } = store;
	return (
		<Grid container spacing={1}>
			<Grid item>
				<Typography variant='subtitle1' component='h5'>
					今日购买:
				</Typography>
			</Grid>

			{toJS(todayBuy).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
			<Grid item>
				<Typography variant='subtitle1' component='h5'>
					今日回款:
				</Typography>
			</Grid>
			{toJS(todaySell).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(Today);
