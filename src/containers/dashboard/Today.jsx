import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import uuid from 'uuid/v4';

const Today = () => {
	const store = useContext(StoreContext);
	const { todayBuy, todaySell } = store;
	return (
		<div>
			<div>
				<h1>todayBuy:</h1>
				{toJS(todayBuy).map(item => (
					<div key={uuid()}>{item.carType}</div>
				))}
			</div>
			<div>
				<h1>todaySell</h1>
				{toJS(todaySell).map(item => (
					<div key={uuid()}>{item.carType}</div>
				))}
			</div>
		</div>
	);
};

export default observer(Today);
