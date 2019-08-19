import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

class Store {
	/**
	 * User
	 */
	@observable user = {
		_id: '',
		firstName: '',
		lastName: '',
		username: '',
		cars: []
	};

	@action initUser = () => {
		const { userid } = useCookies(['userid'])[0];
		axios
			.get(`/user/list?_id=${userid}`)
			.then(res => {
				if (res.status === 200 && res.data.code === 1300) {
					this.user = { ...this.user, ...res.data.doc };
				}
			})
			.catch(err => console.log(err));
	};

	/**
	 * Goods
	 */
	@observable goods = [];

	@action initGoods = () => {
		axios
			.get('/goods/list')
			.then(res => {
				if (res.status === 200 && res.data.code === 2000) {
					this.goods = [...this.goods, ...res.data.doc];
				}
			})
			.catch(err => console.log(err));
	};
}

const StoreContext = createContext(new Store());

export default StoreContext;
