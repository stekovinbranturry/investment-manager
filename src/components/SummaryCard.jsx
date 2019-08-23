import React from 'react';
import PropTypes from 'prop-types';
/**
 * Material-UI
 */
import {
	Grid,
	Table,
	TableCell,
	TableHead,
	TableRow,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableStyle from '../style/TableStyle';
import DashBoardStyle from '../style/DashBoardStyle';

const SummaryCard = ({ summary }) => {
	const tableClasses = TableStyle();
	const dashBoardClasses = DashBoardStyle();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography className={dashBoardClasses.expansionPanelSummary}>
						汇总
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Table size='small'>
						<TableHead>
							{summary.map(({ id, name, value }) => (
								<TableRow key={id}>
									<TableCell
										size='small'
										align='right'
										className={tableClasses.sizeSmall}
									>
										{name}
									</TableCell>
									<TableCell
										size='small'
										align='right'
										className={tableClasses.sizeSmall}
									>
										{value}
									</TableCell>
								</TableRow>
							))}
						</TableHead>
					</Table>
				</ExpansionPanelDetails>
			</ExpansionPanel>
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
