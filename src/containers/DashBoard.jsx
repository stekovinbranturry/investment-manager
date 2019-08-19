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
	Grid,
	ListItem,
	ListItemIcon,
	ListItemText,
	Badge
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
/**
 * Components
 */
import GoodsCard from '../components/GoodsCard.jsx';
import AddNew from '../components/AddNew.jsx';
import DashBoardStyle from '../style/DashBoardStyle';
import StoreContext from '../stores';

const Dashboard = () => {
	const classes = DashBoardStyle();
	// store
	const store = useContext(StoreContext);
	const { user, ownedCars, initUser, goods, initGoods, openAddNew } = store;
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

	const [allCars, carsCashBack, carsNotCashBack, goodsInfo, userInfo] = [
		'allCars',
		'carsCashBack',
		'carsNotCashBack',
		'goodsInfo',
		'userInfo'
	];
	const [openListItem, setOpenListItem] = useState(false);
	const [drawer, setDrawer] = useState(allCars);
	const [
		isAllCars,
		isCarsCashBack,
		isCarsNotCashBack,
		isGoodsInfo,
		isUserInfo
	] = [
		drawer === allCars,
		drawer === carsCashBack,
		drawer === carsNotCashBack,
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
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						{`${lastName} ${firstName}的Dashboard`}
					</Typography>
					<IconButton color='inherit' onClick={() => openAddNew()}>
						<Badge color='secondary'>
							<AddCircleOutlineIcon />
						</Badge>
						<span>添加</span>
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
							<DashboardIcon color={isCarsCashBack ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isCarsCashBack ? classes.selectedDrawer : 'noclass'}
							primary='已回款'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(carsNotCashBack)}>
						<ListItemIcon>
							<DashboardIcon
								color={isCarsNotCashBack ? 'secondary' : 'inherit'}
							/>
						</ListItemIcon>
						<ListItemText
							className={isCarsNotCashBack ? classes.selectedDrawer : 'noclass'}
							primary='未回款'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(goodsInfo)}>
						<ListItemIcon>
							<ShoppingCartIcon color={isGoodsInfo ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isGoodsInfo ? classes.selectedDrawer : 'noclass'}
							primary='车辆信息'
						/>
					</ListItem>
					<ListItem button onClick={() => setDrawer(userInfo)}>
						<ListItemIcon>
							<PeopleIcon color={isUserInfo ? 'secondary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText
							className={isUserInfo ? classes.selectedDrawer : 'noclass'}
							primary='我的'
						/>
					</ListItem>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					{isAllCars && (
						<div>
							{toJS(ownedCars).map(item => (
								<div>{item.carType}</div>
							))}
						</div>
					)}
					{isCarsCashBack && <div>CarsCashBack</div>}
					{isCarsNotCashBack && <div>CarsNotCashBack</div>}
					{isGoodsInfo && (
						<Grid container spacing={2}>
							<GoodsCard goods={toJS(goods)} />
						</Grid>
					)}
					{isUserInfo && <div>My</div>}
				</Container>
			</main>
		</div>
	);
};

export default observer(Dashboard);
