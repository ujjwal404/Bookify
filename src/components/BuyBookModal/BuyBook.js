import React from 'react';
import Popup from 'reactjs-popup';
import './popup.scss';
import { useFirestore } from '../../firebase/DBcontext';
import { useAuth } from '../../firebase/AuthContext';

import { store } from 'react-notifications-component';

export default function BuyBook({ trigger, details }) {
  const { db } = useFirestore();
  const { currentUser } = useAuth();

  async function addtoCart() {
    let present_books = [];

    // if there's no cart then create a cart
    var UserRef = db.collection('Users').doc(`${currentUser.uid}`);
    await UserRef.get().then((doc) => {
      if (!doc.data()) UserRef.set({ cart: [] });
      else present_books = doc.data().cart;
    });

    const book_id = details.bookid;
    // check if book is already bought or exceeds buying quantity
    if (present_books.includes(String(book_id))) {
      store.addNotification({
        title: 'Book already present in the cart.',
        message: 'Go to cart to checkout',
        type: 'info',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 4000
        }
      });
      return;
    }
    present_books.push(book_id);
    // get the book
    await UserRef.set({ cart: present_books })
      .then((e) =>
        store.addNotification({
          title: 'Book added to cart',
          message: 'Go to cart to checkout',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 4000
          }
        })
      )
      .catch((error) => {
        store.addNotification({
          title: 'Server error.',
          message: 'Please try later.',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 4000
          }
        });
        console.log(error);
      });
  }

  return (
    <Popup trigger={trigger}>
      <div className="popup-modal">
        <div className="image-card">
          <div>
            <img src={details.imageUrl} alt="book-image" className="book-image-modal" />
          </div>
        </div>
        <div className="details-card">
          <div className="modal-book-title">
            <span>{details.title || details.name} </span>
          </div>
          <div className="modal-book-author">
            <span> by {details.author}</span>
          </div>
          <div className="modal-book-price">
            <span>Price : Rs {details.price} </span>
          </div>
          <div className="add-to-cart" onClick={(e) => addtoCart(e)}>
            <span className="btn-text">Add to cart</span>
            <img src="https://img.icons8.com/nolan/48/fast-cart.png" />
          </div>
        </div>
      </div>
    </Popup>
  );
}
