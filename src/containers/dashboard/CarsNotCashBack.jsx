import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';

const CarsNotCashBack = () => {
	const store = useContext(StoreContext);
	const { carsNotCashBack } = store;
	return (
		<Grid container spacing={1}>
			{toJS(carsNotCashBack).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(CarsNotCashBack);
