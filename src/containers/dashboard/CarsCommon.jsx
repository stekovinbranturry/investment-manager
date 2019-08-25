import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import RecordCard from '../../components/RecordCard.jsx';
import SummaryCard from '../../components/SummaryCard.jsx';

const CarsCommon = ({ summary, carsList }) => {
	return (
		<Fragment>
			<Grid container spacing={1}>
				<SummaryCard summary={summary} />
			</Grid>
			<Grid container spacing={1}>
				<Grid item>
					<Typography variant='subtitle1' component='p'>
						*点击车标更新记录
					</Typography>
				</Grid>
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
