import { observable, action, computed, toJS } from 'mobx';
import { createContext } from 'react';
import axios from 'axios';
import { dateFormat } from '../utils/date';
class Store {
	/**
	 * User
	 */
	@observable user = {
		_id: '',
		firstName: '',
		lastName: '',
		username: ''
	};

	@observable ownedCars = [];

	@computed get carsCashBack() {
		return toJS(this.ownedCars).filter(item => item.isCashBack === 1);
	}
	@computed get carsNotCashBack() {
		return toJS(this.ownedCars).filter(item => item.isCashBack === 0);
	}
	@computed get todayBuy() {
		return toJS(this.ownedCars).filter(
			item => dateFormat(item.buyDate) === dateFormat(new Date())
		);
	}
	@computed get todaySell() {
		return toJS(this.ownedCars).filter(
			item => dateFormat(item.sellDate) === dateFormat(new Date())
		);
	}
	@action initUser = () => {
		axios
			.post('/user/auth')
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					const { _id, firstName, lastName, username, cars } = res.data.doc;
					this.user = {
						...this.user,
						...{ _id, firstName, lastName, username }
					};
					this.ownedCars = [...this.ownedCars, ...cars];
				}
				if (res.status === 200 && res.data.code === 1) {
					console.log(res.data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	@action addNewItem = payload => {
		axios
			.post('/user/add', payload)
			.then(res => {
				if (res.status === 200 && res.data.code === 1400) {
					this.ownedCars = [...this.ownedCars, payload];
				}
			})
			.catch(err => console.log(err));
	};

	/**
	 * Goods
	 */
	@observable goods = [];
	@computed get goodsNameList() {
		let list = [];
		toJS(this.goods).forEach(item => (list = [...list, item.name]));
		return list;
	}

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

	/**
	 * AddNew dialog
	 */
	@observable isAddNewOpen = 0;
	@action openAddNew = () => {
		this.isAddNewOpen = 1;
	};
	@action closeAddNew = () => {
		this.isAddNewOpen = 0;
	};
}

const StoreContext = createContext(new Store());

export default StoreContext;
