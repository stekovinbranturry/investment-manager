import React, { Fragment, useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid, Typography } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';

const Today = () => {
	const store = useContext(StoreContext);
	const { todayBuy, todaySell, expiredCars } = store;
	const data = [
		{
			name: '今日购买:',
			list: toJS(todayBuy)
		},
		{
			name: '今日回款:',
			list: toJS(todaySell)
		},
		{
			name: '过期未回款:',
			list: toJS(expiredCars)
		}
	];
	return (
		<Fragment>
			{data.map((item, key) => (
				<div key={key}>
					<Grid container spacing={1}>
						<Grid item>
							<Typography variant='subtitle1' component='h5'>
								{item.name}
							</Typography>
						</Grid>
					</Grid>
					{item.list.length === 0 ? (
						'无'
					) : (
						<Grid container spacing={1}>
							{item.list.map(item => (
								<RecordCard key={item.itemID} cars={item} />
							))}
						</Grid>
					)}
				</div>
			))}
		</Fragment>
	);
};

export default observer(Today);
