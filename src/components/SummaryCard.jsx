import React from 'react';
import PropTypes from 'prop-types';
/**
 * Material-UI
 */
import {
	Card,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';
import TableStyle from '../style/TableStyle';

const SummaryCard = ({ summary }) => {
	const classes = TableStyle();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell
								size='medium'
								align='right'
								className={classes.sizeSmall}
							>
								汇总
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{summary.map(({ id, name, value }) => (
							<TableRow key={id}>
								<TableCell
									size='small'
									align='right'
									className={classes.sizeSmall}
								>
									{name}
								</TableCell>
								<TableCell
									size='small'
									align='right'
									className={classes.sizeSmall}
								>
									{value}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</Grid>
	);
};

SummaryCard.propTypes = {
	summary: PropTypes.array
};

SummaryCard.defaultProps = {
	summary: [{ id: '', name: '', value: '' }]
};

export default SummaryCard;
