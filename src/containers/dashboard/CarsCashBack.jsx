import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';

const CarsCashBack = () => {
	const store = useContext(StoreContext);
	const { carsCashBack } = store;
	return (
		<Grid container spacing={1}>
			{toJS(carsCashBack).map(item => (
				<RecordCard key={item.itemID} cars={item} />
			))}
		</Grid>
	);
};

export default observer(CarsCashBack);
