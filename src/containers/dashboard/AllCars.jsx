import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import StoreContext from '../../stores';
import uuid from 'uuid/v4';

const AllCars = () => {
	const store = useContext(StoreContext);
	const { ownedCars } = store;
	return (
		<div>
			{toJS(ownedCars).map(item => (
				<div key={uuid()}>{item.carType}</div>
			))}
		</div>
	);
};

export default observer(AllCars);
