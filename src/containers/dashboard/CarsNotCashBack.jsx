import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import uuid from 'uuid/v4';

const CarsNotCashBack = () => {
	const store = useContext(StoreContext);
	const { carsNotCashBack } = store;
	return (
		<div>
			notcashback
			{toJS(carsNotCashBack).map(item => (
				<div key={uuid()}>{item.carType}</div>
			))}
		</div>
	);
};

export default observer(CarsNotCashBack);
