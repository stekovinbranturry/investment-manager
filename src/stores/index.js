import { observable, action, computed, toJS } from 'mobx';
import { createContext } from 'react';
import axios from 'axios';
import { dateFormat, getYesterday } from '../utils/date';
import { sortGoodsArray } from '../utils/sortGoodsArray';
class Store {
	/**
	 * User
	 */
	@observable user = {
		_id: '',
		firstName: '',
		lastName: '',
		username: '',
		weifen: 0
	};

	@observable ownedCars = [];

	// 已回款的车辆列表
	@computed get carsCashBack() {
		return toJS(this.ownedCars).filter(item => item.isCashBack === 1);
	}
	// 未回款的车辆列表
	@computed get carsNotCashBack() {
		return toJS(this.ownedCars).filter(item => item.isCashBack === 0);
	}
	// 今日购买列表
	@computed get todayBuy() {
		return toJS(this.ownedCars).filter(
			item => dateFormat(item.buyDate) === dateFormat(new Date())
		);
	}
	// 今日出售列表
	@computed get todaySell() {
		return toJS(this.ownedCars).filter(
			item => dateFormat(item.sellDate) === dateFormat(new Date())
		);
	}
	// 过期未回款
	@computed get expiredCars() {
		return toJS(this.carsNotCashBack).filter(
			item => new Date(item.sellDate) < getYesterday()
		);
	}
	// 购买车辆数量
	@computed get totalNumber() {
		return this.ownedCars.length;
	}
	// 已回款车辆数量
	@computed get totalNumberCashBack() {
		return this.ownedCars.filter(item => item.isCashBack === 1).length;
	}
	// 未回款车辆数量
	@computed get totalNumberNotCashBack() {
		return this.ownedCars.filter(item => item.isCashBack === 0).length;
	}
	// 总投入
	@computed get totalBuyMoney() {
		return this.ownedCars
			.reduce((total, item) => total + item.buyPrice, 0)
			.toFixed(2);
	}
	// 总投入（已回款部分）
	@computed get totalBuyMoneyCashBack() {
		return this.carsCashBack
			.reduce((total, item) => total + item.buyPrice, 0)
			.toFixed(2);
	}
	// 总投入（未回款部分）
	@computed get totalBuyMoneyNotCashBack() {
		return this.carsNotCashBack
			.reduce((total, item) => total + item.buyPrice, 0)
			.toFixed(2);
	}
	// 预计总回款金额
	@computed get totalSellMoney() {
		return this.ownedCars
			.reduce((total, item) => total + item.sellPrice, 0)
			.toFixed(2);
	}
	// 已回款金额
	@computed get totalSellMoneyCashBack() {
		return this.carsCashBack
			.reduce((total, item) => total + item.sellPrice, 0)
			.toFixed(2);
	}
	// 未回款金额
	@computed get totalSellMoneyNotCashBack() {
		return this.carsNotCashBack
			.reduce((total, item) => total + item.sellPrice, 0)
			.toFixed(2);
	}
	// 预计总收益
	@computed get totalProfit() {
		return this.ownedCars
			.reduce((total, item) => total + item.profit, 0)
			.toFixed(2);
	}
	// 已回款收益
	@computed get totalProfitCashBack() {
		return this.carsCashBack
			.reduce((total, item) => total + item.profit, 0)
			.toFixed(2);
	}
	// 未回款收益
	@computed get totalProfitNotCashBack() {
		return this.carsNotCashBack
			.reduce((total, item) => total + item.profit, 0)
			.toFixed(2);
	}

	@action initUser = () => {
		axios
			.post('/user/auth')
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					const {
						_id,
						firstName,
						lastName,
						username,
						weifen,
						cars
					} = res.data.doc;
					this.user = {
						...this.user,
						...{ _id, firstName, lastName, username, weifen }
					};
					this.ownedCars = sortGoodsArray([...this.ownedCars, ...cars]);
				}
				if (res.status === 200 && res.data.code === 1) {
					console.log(res.data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	@action updateUser = payload => {
		axios
			.post('user/update-user', payload)
			.then(res => {
				if (res.status === 200 && res.data.code === 1500) {
					this.user = {
						...this.user,
						...payload
					};
				}
				if (res.status === 200 && res.data.code === 1501) {
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
					this.ownedCars = sortGoodsArray([...this.ownedCars, payload]);
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

	/**
	 * UpdateRecord dialog
	 */
	@observable isUpdateRecordDialogOpen = 0;
	@observable recordToUpdate = {};

	@action openUpdateRecordDialog = () => {
		this.isUpdateRecordDialogOpen = 1;
	};
	@action closeUpdateRecordDialog = () => {
		this.isUpdateRecordDialogOpen = 0;
	};
	@action updateRecord = payload => {
		axios
			.post('/user/update-car', payload)
			.then(res => {
				if ((res.status === 200) & (res.data.code === 1600)) {
					console.log(res.data.msg);
					let tmp = [];
					this.ownedCars.forEach(item => {
						if (item.itemID === payload.itemID) {
							tmp = [...tmp, { ...item, ...payload }];
						} else {
							tmp = [...tmp, item];
						}
					});
					this.ownedCars = [...tmp];
				}
				if ((res.status === 200) & (res.data.code === 1601)) {
					console.log(res.data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	@action updateRecordToUpdate = payload => {
		this.recordToUpdate = { ...this.recordToUpdate, ...payload };
	};
}

const StoreContext = createContext(new Store());

export default StoreContext;
