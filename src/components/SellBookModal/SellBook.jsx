import React from 'react';
import Popup from 'reactjs-popup';
import { useFirestore } from '../../firebase/DBcontext';
import { useAuth } from '../../firebase/AuthContext';
import './sellbook.scss';

function SellBook({ trigger }) {
	const { db } = useFirestore();
	const { currentUser } = useAuth();

	function sellBook(e) {
		e.preventDefault();
		let book = {
			name: e.target.title.value,
			about: e.target.description.value,
			imageURL: e.target.imageUrl.value,
			author: e.target.author.value,
			price: e.target.price.value,
			contact: e.target.contact.value,
			location: e.target.location.value,
			user: currentUser.uid
		};
		db.collection('Old-books')
			.add(book)
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
		//	console.log(book);
	}

	return (
		<Popup trigger={trigger}>
			<div className="popup-modal-sell">
				<form className="sell-form" onSubmit={(e) => sellBook(e)}>
					<div className="sell-form-title">
						<h1>Sell Book📒</h1>
					</div>
					<input type="text" placeholder="Title" name="title" />
					<input type="text" placeholder="Author" name="author" />
					<input type="text" placeholder="Description" name="description" />
					<input type="text" placeholder="Price" name="price" />
					<input type="text" placeholder="Image URL" name="imageUrl" />
					<input type="text" placeholder="Email or Phone" name="contact" />
					<input type="text" placeholder="Location" name="location" />
					<button className="sell--btn" type="submit">
						Sell
					</button>
				</form>
			</div>
		</Popup>
	);
}

export default SellBook;
