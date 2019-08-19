import React, { useState, useContext, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
/**
 * Material-UI
 */
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
/**
 * Components
 */
import { ListItems } from '../components/ListItems.jsx';
import GoodsCard from '../components/GoodsCard.jsx';
import DashBoardStyle from '../style/DashBoardStyle';
import StoreContext from '../stores';

const Dashboard = () => {
	const classes = DashBoardStyle();
	// store
	const store = useContext(StoreContext);
	const { user, initUser, goods, initGoods } = store;
	useEffect(() => {
		if (goods.length === 0) {
			initGoods();
		}
		// eslint-disable-next-line
	}, []);
	console.log(toJS(goods));

	const [open, setOpen] = useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
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
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{ListItems}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={2}>
						<GoodsCard goods={toJS(goods)} />
					</Grid>
				</Container>
			</main>
		</div>
	);
};

export default observer(Dashboard);
