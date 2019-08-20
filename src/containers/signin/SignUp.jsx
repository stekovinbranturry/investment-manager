import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, Redirect } from 'react-router-dom';
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

const SignUp = () => {
	const classes = SignUpStyle();

	/**
	 * Input hooks
	 */
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [cfmPassword, setCfmPassword] = useState('');
	/**
	 * Error hooks
	 */
	const [errorCheck, setErrorCheck] = useState(false);
	const [pwdErr, setPwdErr] = useState(false);
	const [usernameErr, setUsernameErr] = useState(false);
	/**
	 * Redirect hook
	 */
	const [redirectPath, setRedirectPath] = useState('');

	useEffect(() => {
		if (password !== cfmPassword) {
			setErrorCheck(true);
			setPwdErr(true);
		}
		if (password === cfmPassword) {
			setErrorCheck(false);
			setPwdErr(false);
		}
		// eslint-disable-next-line
	}, [cfmPassword]);

	useEffect(() => {
		axios
			.post('/user/username', {
				username
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 1101) {
					setErrorCheck(true);
					setUsernameErr(true);
				} else {
					setErrorCheck(false);
					setUsernameErr(false);
				}
			})
			.catch(err => console.log(err));
	}, [username]);

	const handleSignUp = e => {
		e.preventDefault();
		if (!firstName || !lastName || !username || !password || !cfmPassword) {
			setErrorCheck(true);
			return;
		}
		if (password !== cfmPassword) {
			setErrorCheck(true);
			setPwdErr(true);
			return;
		}

		const registerInfo = { firstName, lastName, username, password };

		axios
			.post('/user/signup', registerInfo)
			.then(res => {
				if (res.status === 200 && res.data.code === 1001) {
					setUsernameErr(true);
				}
				if (res.status === 200 && res.data.code === 1000) {
					console.log('注册成功');
					console.log(res.data.doc);
					setRedirectPath('/dashboard');
				}
			})
			.catch(err => console.log(err));
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
					注册
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='姓'
								name='lastName'
								autoComplete='lname'
								autoFocus
								error={errorCheck && !lastName}
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='名'
								error={errorCheck && !firstName}
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</Grid>
						{usernameErr ? (
							<Grid item xs={12}>
								<FormHelperText className={classes.error}>
									用户名已存在
								</FormHelperText>
							</Grid>
						) : null}
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='username'
								label='用户名'
								name='username'
								autoComplete='username'
								type='username'
								error={errorCheck && (!username || usernameErr)}
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='密码'
								type='password'
								id='password'
								autoComplete='current-password'
								error={errorCheck && !password}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Grid>
						{pwdErr ? (
							<Grid item xs={12}>
								<FormHelperText className={classes.error}>
									密码不一致
								</FormHelperText>
							</Grid>
						) : null}
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='cfmpassword'
								label='确认密码'
								type='password'
								id='cfmpassword'
								autoComplete='current-password'
								error={errorCheck && (!cfmPassword || pwdErr)}
								value={cfmPassword}
								onChange={e => setCfmPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant='contained'
						color='primary'
						size='large'
						className={classes.submit}
						onClick={handleSignUp}
					>
						注册
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link variant='body2' component={RouterLink} to='/signin'>
								已经有账号了？请登录
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignUp;
