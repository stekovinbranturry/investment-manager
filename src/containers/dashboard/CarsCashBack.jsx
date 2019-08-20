import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import uuid from 'uuid/v4';

const CarsCashBack = () => {
	const store = useContext(StoreContext);
	const { carsCashBack } = store;
	return (
		<div>
			cashback
			{toJS(carsCashBack).map(item => (
				<div key={uuid()}>{item.carType}</div>
			))}
		</div>
	);
};

export default observer(CarsCashBack);
