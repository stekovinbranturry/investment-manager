import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import { Grid } from '@material-ui/core';
import GoodsCard from '../../components/GoodsCard.jsx';

const GoodsInfo = () => {
	const store = useContext(StoreContext);
	const { goods } = store;
	return (
		<Grid container spacing={2}>
			<GoodsCard goods={toJS(goods)} />
		</Grid>
	);
};

export default observer(GoodsInfo);
