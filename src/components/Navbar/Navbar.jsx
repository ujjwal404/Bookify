import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../firebase/AuthContext';
import avatar from './man.png';
import './navbar.scss';
import Cart from '../Cart/cart';
import { store } from 'react-notifications-component';
import SellBook from '../SellBookModal/SellBook';

function Navbar() {
	const { currentUser } = useAuth();
	const { logout } = useAuth();
	const history = useHistory();
	console.log(currentUser);

	useEffect(() => {
		store.addNotification({
			title: 'Our servers are running slow. You might experience a delay in getting notifications.',
			message: 'Please be patient.',
			type: 'info',
			insert: 'top',
			container: 'top-full',
			animationIn: ['animate__animated', 'animate__fadeIn'],
			animationOut: ['animate__animated', 'animate__fadeOut'],
			dismiss: {
				duration: 4000
			}
		});
	}, []);

	async function SignOutClick() {
		try {
			await logout();
			history.push('/auth');
		} catch {
			console.log('failed to logout');
		}
	}

	function trigger() {
		return (
			<div className="checkout-cart">
				<img src="https://img.icons8.com/material-two-tone/64/000000/fast-cart.png" />
			</div>
		);
	}

	function trigger2() {
		return <button className="sell-book-btn">Sell A Book</button>;
	}

	return (
		<nav className="header">
			<div className="browse">
				<div className="browse-category">
					<SellBook trigger={trigger2} />
				</div>
				<div className="search-bar">
					<input type="text" placeholder="Search Book" />
				</div>
			</div>
			<div className="header-title">Bookify</div>
			<div className="profile">
				<div className="user-profile">
					<img src={currentUser.photoURL || avatar} alt="" className="user-img" />
				</div>
				<Cart trigger={trigger} />
				<div className="profile-menu">
					<div onClick={() => SignOutClick()} className="logout-btn">
						LogOut
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
