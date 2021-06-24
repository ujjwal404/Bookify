import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import './cart.scss';
import { POSTS } from '../../constants/constants';
import { useFirestore } from '../../firebase/DBcontext';
import { useAuth } from '../../firebase/AuthContext';

function Cart({ trigger }) {
  const [items, setItems] = useState();

  const { db } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    let present_books = [];
    db.collection('Users')
      .doc(`${currentUser.uid}`)
      .get()
      .then((doc) => {
        if (!doc.data().cart) setItems([]);
        else present_books = doc.data().cart;
      });
    const arr = [];

    db.collection('Books')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const details = doc.data();
          const id = doc.id;
          if (present_books.includes(id)) arr.push({ ...details, id });
        });
        setItems(arr);
      });
  }, []);

  return (
    <Popup trigger={trigger} position={'bottom'}>
      <div className="cart-dropdown">
        <div className="dropdown-items">
          {items.map((post) => (
            <div className="dropdown-item">{post.name}</div>
          ))}
        </div>
        <div className="checkout-btn">
          <span>Checkout</span>
        </div>
      </div>
    </Popup>
  );
}

export default Cart;
