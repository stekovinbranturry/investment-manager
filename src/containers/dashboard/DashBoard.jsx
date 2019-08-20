import React, { useState, useContext, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
/**
 * Material-UI
 */
import {
	CssBaseline,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Container,
	ListItem,
	ListItemIcon,
	ListItemText,
	Badge
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import TodayIcon from '@material-ui/icons/Today';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
/**
 * Components
 */
import AddNew from './AddNew.jsx';
import AllCars from './AllCars.jsx';
import CarsCashBack from './CarsCashBack.jsx';
import CarsNotCashBack from './CarsNotCashBack.jsx';
import Today from './Today.jsx';
import GoodsInfo from './GoodsInfo.jsx';
import UserInfo from './UserInfo.jsx';
import DashBoardStyle from '../../style/DashBoardStyle';
import StoreContext from '../../stores';

const Dashboard = () => {
	const classes = DashBoardStyle();
	// store
	const store = useContext(StoreContext);
	const { user, initUser, goods, initGoods, openAddNew } = store;
	const { firstName, lastName } = toJS(user);
	useEffect(() => {
		if (goods.length === 0) {
			initGoods();
		}
		if (!toJS(user)._id) {
			initUser();
		}
		// eslint-disable-next-line
	}, []);

	const [allCars, carsCashBack, carsNotCashBack, today, goodsInfo, userInfo] = [
		'allCars',
		'carsCashBack',
		'carsNotCashBack',
		'today',
		'goodsInfo',
		'userInfo'
	];
	const [openListItem, setOpenListItem] = useState(false);
	const [drawer, setDrawer] = useState(allCars);
	const [
		isAllCars,
		isCarsCashBack,
		isCarsNotCashBack,
		isToday,
		isGoodsInfo,
		isUserInfo
	] = [
		drawer === allCars,
		drawer === carsCashBack,
		drawer === carsNotCashBack,
		drawer === today,
		drawer === goodsInfo,
		drawer === userInfo
	];

	const handleDrawerOpen = () => {
		setOpenListItem(true);
	};
	const handleDrawerClose = () => {
		setOpenListItem(false);
	};

	return (
		<div className={classes.root}>
			<AddNew />
			<CssBaseline />
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, openListItem && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							openListItem && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='body1'
						component='h4'
						color='inherit'
						noWrap
						className={classes.title}
					>
						{`${lastName} ${firstName}`}'s Dashboard
					</Typography>
					<IconButton color='inherit' edge='end' onClick={() => openAddNew()}>
						<Badge color='secondary'>
							<AddCircleOutlineIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!openListItem && classes.drawerPaperClose
					)
				}}
				open={openListItem}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={() => setDrawer(allCars)}>
						<ListItemIcon>
							<DashboardIcon color={isAllCars ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isAllCars ? classes.selectedDrawer : 'noclass'}
							primary='全部车辆'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(carsCashBack)}>
						<ListItemIcon>
							<CheckBoxIcon color={isCarsCashBack ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isCarsCashBack ? classes.selectedDrawer : 'noclass'}
							primary='已回款'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(carsNotCashBack)}>
						<ListItemIcon>
							<CheckBoxOutlineBlankIcon
								color={isCarsNotCashBack ? 'secondary' : 'inherit'}
							/>
						</ListItemIcon>
						<ListItemText
							className={isCarsNotCashBack ? classes.selectedDrawer : 'noclass'}
							primary='未回款'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(today)}>
						<ListItemIcon>
							<TodayIcon color={isToday ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isToday ? classes.selectedDrawer : 'noclass'}
							primary='今日'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(goodsInfo)}>
						<ListItemIcon>
							<DirectionsCarIcon
								color={isGoodsInfo ? 'secondary' : 'inherit'}
							/>
						</ListItemIcon>
						<ListItemText
							className={isGoodsInfo ? classes.selectedDrawer : 'noclass'}
							primary='车辆信息'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(userInfo)}>
						<ListItemIcon>
							<AccountBoxIcon color={isUserInfo ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isUserInfo ? classes.selectedDrawer : 'noclass'}
							primary='用户中心'
						/>
					</ListItem>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth={false} className={classes.container}>
					{isAllCars && <AllCars />}
					{isCarsCashBack && <CarsCashBack />}
					{isCarsNotCashBack && <CarsNotCashBack />}
					{isToday && <Today />}
					{isGoodsInfo && <GoodsInfo />}
					{isUserInfo && <UserInfo />}
				</Container>
			</main>
		</div>
	);
};

export default observer(Dashboard);
