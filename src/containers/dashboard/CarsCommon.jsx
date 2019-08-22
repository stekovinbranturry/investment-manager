import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';
import SummaryCard from '../../components/SummaryCard.jsx';

const CarsCommon = ({ summary, carsList }) => {
	return (
		<Fragment>
			<Grid container spacing={1}>
				<SummaryCard summary={summary} />
			</Grid>
			<Grid container spacing={1}>
				{carsList.map(item => (
					<RecordCard key={item.itemID} cars={item} />
				))}
			</Grid>
		</Fragment>
	);
};

export default CarsCommon;
