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
import PaymentIcon from './PaymentIcon.jsx';

const RecordCard = ({ cars }) => {
	const classes = TableStyle();
	const {
		itemID,
		carType,
		buyPrice,
		buyMethod,
		buyDate,
		isCashBack,
		sellPrice,
		sellMethod,
		sellDate,
		profit
	} = cars;
	const img = require(`../image/${carType}.svg`);

	return (
		<Grid key={itemID} item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<Table size='small' padding='default'>
					<TableHead>
						<TableRow>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								<img
									style={{ height: '1.5rem', verticalAlign: 'middle' }}
									src={img}
									alt={carType}
								/>
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								{carType}
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								收益:￥{profit}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.sizeSmall}
							>
								{isCashBack === 0 ? (
									<span style={{ color: '#f4511e' }}>未回款</span>
								) : (
									<span style={{ color: '#43a047' }}>已回款</span>
								)}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								买入:
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								<PaymentIcon type={buyMethod} />
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								￥{buyPrice}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.sizeSmall}
							>
								{buyDate}
							</TableCell>
						</TableRow>
					</TableBody>
					<TableBody>
						<TableRow>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								卖出:
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								<PaymentIcon type={sellMethod} />
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.sizeSmall}
							>
								￥{sellPrice}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.sizeSmall}
							>
								{sellDate}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Card>
		</Grid>
	);
};

RecordCard.propTypes = {
	cars: PropTypes.object
};

RecordCard.defaultProps = {
	cars: {
		itemID: '',
		carType: '',
		buyPrice: '',
		buyMethod: '',
		buyDate: '',
		isCashBack: '',
		sellPrice: '',
		sellMethod: '',
		sellDate: '',
		profit: ''
	}
};

export default RecordCard;
