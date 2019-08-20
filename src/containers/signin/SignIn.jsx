import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import axios from 'axios';
/**
 * Material-UI
 */

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
	FormHelperText
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import SignUpStyle from '../../style/SignUpStyle';

const SignIn = () => {
	const classes = SignUpStyle();

	/**
	 * Input hooks
	 */
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	/**
	 * Error hook
	 */
	const [signInErr, setSignInErr] = useState(false);
	/**
	 * Redirect hook
	 */
	const [redirectPath, setRedirectPath] = useState('');

	const handleSignIn = e => {
		e.preventDefault();
		axios.post('/user/signin', { username, password }).then(res => {
			if (res.status === 200 && res.data.code === 1200) {
				setRedirectPath('/dashboard');
			}
			if (res.status === 200 && res.data.code === 1201) {
				setSignInErr(true);
			}
		});
	};

	return (
		<Container component='main' maxWidth='xs'>
			{redirectPath ? <Redirect to={redirectPath} /> : null}
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					{signInErr ? (
						<Grid item xs={12}>
							<FormHelperText className={classes.error}>
								用户名或密码错误
							</FormHelperText>
						</Grid>
					) : null}
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='username'
						label='用户名'
						name='username'
						autoComplete='username'
						autoFocus
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='密码'
						type='password'
						id='password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Button
						fullWidth
						variant='contained'
						color='primary'
						size='large'
						className={classes.submit}
						onClick={handleSignIn}
					>
						登录
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link variant='body2' component={RouterLink} to='/signup'>
								新用户？请注册
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignIn;
