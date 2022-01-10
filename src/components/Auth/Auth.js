import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';
import './auth.scss';
import image from './auth.svg';
import { store } from 'react-notifications-component';

function Auth() {
	const [show, setShow] = useState('login');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const { googleLogin, login, signup, githubLogin } = useAuth();
	const history = useHistory();

	async function onGoogleClick(e) {
		e.preventDefault();
		try {
			await googleLogin();
			history.push('/dashboard');
		} catch {
			store.addNotification({
				title: 'Login Failed',
				message: 'Unable to login with Google',
				type: 'danger',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000
				}
			});
		}
	}

	async function onGithubClick(e) {
		e.preventDefault();
		try {
			await githubLogin();
			history.push('/dashboard');
		} catch {
			store.addNotification({
				title: 'Login Failed',
				message: 'Unable to login with Google',
				type: 'danger',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000
				}
			});
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (email === '' || password === '') {
			store.addNotification({
				title: "Email or Password can't be blank",
				message: 'Please try again',
				type: 'warning',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000
				}
			});
			return;
		}
		try {
			if (show === 'login') {
				await login(email, password);
				history.push('/dashboard');
			} else {
				if (password != confirm) {
					store.addNotification({
						title: "Passwords don't match",
						message: 'Please make sure your passwords match',
						type: 'warning',
						insert: 'top',
						container: 'top-right',
						animationIn: ['animate__animated', 'animate__fadeIn'],
						animationOut: ['animate__animated', 'animate__fadeOut'],
						dismiss: {
							duration: 3000
						}
					});
					return;
				}
				await signup(email, password);
				history.push('/dashboard');
			}
		} catch {
			store.addNotification({
				title: 'No user found',
				message: 'Please check your email or password',
				type: 'info',
				insert: 'top',
				container: 'top-right',
				animationIn: ['animate__animated', 'animate__fadeIn'],
				animationOut: ['animate__animated', 'animate__fadeOut'],
				dismiss: {
					duration: 3000
				}
			});
		}
	}
	return (
		<>
			<div className="auth-container">
				<div className="auth-left">
					<h1 className="website-head">Bookify</h1>
					<div className="img-holder">
						<img src={image} alt="auth-svg" />
					</div>
				</div>
				<div className="auth-right">
					<img
						src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
						className="firebase-logo"
					/>
					<div className="form-content">
						<div className="form-heading">
							<h1>Welcome to Bookify</h1>
							<h1>Your online bookstore.</h1>
						</div>
						<div className="line">
							<p>Buying and Selling books made easy.</p>
						</div>

						<div className="auth-btn-row">
							<button className="login-auth auth-tab" onClick={() => setShow('login')}>
								Login
							</button>
							<button className="register-auth auth-tab" onClick={() => setShow('register')}>
								Register
							</button>
						</div>

						<div className="form-inputs">
							{show === 'login' ? (
								<>
									<input
										type="text"
										placeholder="E-mail Address"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</>
							) : (
								<form>
									<input
										type="text"
										placeholder="E-mail Address"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<input
										type="password"
										placeholder="Confirm Password"
										value={confirm}
										onChange={(e) => setConfirm(e.target.value)}
									/>
								</form>
							)}
						</div>
						<div className="submit-btn">
							<button onClick={(e) => handleSubmit(e)}>{show}</button>
						</div>
						<div className="extra-options">
							or {show} with
							<div onClick={(e) => onGoogleClick(e)} className="google">
								<img
									src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
									className="img-google"
								/>
							</div>
							<div onClick={(e) => onGithubClick(e)} className="google">
								<img
									src="https://img.icons8.com/ios-glyphs/240/000000/github.png"
									className="img-github"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Auth;
