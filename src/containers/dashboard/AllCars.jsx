import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';

const AllCars = () => {
	const store = useContext(StoreContext);
	const { ownedCars } = store;
	return (
		<Grid container spacing={1}>
			{toJS(ownedCars).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(AllCars);
