import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';

export const ListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='全部车辆' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='已回款' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='未回款' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary='车辆信息' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='我的' />
		</ListItem>
	</div>
);
