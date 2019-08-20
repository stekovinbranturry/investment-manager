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
import DashBoardStyle from '../style/DashBoardStyle';
import PaymentIcon from './PaymentIcon.jsx';

const RecordCard = ({ cars }) => {
	const classes = DashBoardStyle();
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
	const img = require(`../image/${carType}.jpg`);

	return (
		<Grid key={itemID} item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								<img style={{ height: '1.5rem' }} src={img} alt={carType} />
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								{carType}
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								收益:￥{profit}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.tableCell}
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
								className={classes.tableCell}
							>
								买入:
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								<PaymentIcon type={buyMethod} />
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								￥{buyPrice}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.tableCell}
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
								className={classes.tableCell}
							>
								卖出:
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								<PaymentIcon type={sellMethod} />
							</TableCell>
							<TableCell
								size='small'
								align='center'
								className={classes.tableCell}
							>
								￥{sellPrice}
							</TableCell>
							<TableCell
								size='small'
								align='right'
								className={classes.tableCell}
							>
								{sellDate}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				{/* <CardActionArea>
					<CardContent>
						<Typography gutterBottom variant='subtitle1' component='h5'>
							<img style={{ height: '1.5rem' }} src={img} alt={carType} />
							{carType}
							{seperator()}
							净赚：{profit}
							{seperator()}
							{isCashBack === 0 ? '未回款' : '已回款'}
						</Typography>
						<Typography gutterBottom variant='body2' component='h5'>
							买入：{buyPrice}
							{seperator()}
							{buyDate}
							{seperator()}
							<PaymentIcon type={buyMethod} />
						</Typography>

						<Typography gutterBottom variant='body2' component='h5'>
							卖出：{sellPrice}
							{seperator()}
							{sellDate}
							{seperator()}
							<PaymentIcon type={sellMethod} />
						</Typography>
					</CardContent>
				</CardActionArea> */}
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
