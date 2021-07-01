import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import { useFirestore } from '../../firebase/DBcontext';
import { store } from 'react-notifications-component';
import BuyBook from '../BuyBookModal/BuyBook';

import './flickity.scss';

const flickityOptions = {
  initialIndex: 2,
  wrapAround: true,
  autoPlay: true,
  freeScrollFriction: 1
};
function Header() {
  const { db } = useFirestore();
  const [books, setbooks] = useState([]);

  function trigger() {
    return <div className="book-see-post">See The Book</div>;
  }

  useEffect(() => {
    const unsubscribe = db
      .collection('Showcase')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const details = doc.data();
          const bookid = doc.id;
          return { ...details, bookid };
        });
        setbooks(data);
      })
      .catch((error) =>
        store.addNotification({
          title: 'Unable to Fetch books',
          message: 'FirebaseError : Quota exceeded',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 4000
          }
        })
      );
    console.log(books);

    return unsubscribe;
  }, []);

  return (
    <Flickity className="book-slide" options={flickityOptions}>
      {books.map((book) => (
        <div className="book-cell">
          <div className="book-img">
            <img src={book.imageUrl} alt="" className="book-photo" />
          </div>
          <div className="book-content">
            <div className="book-title">{book.name}</div>
            <div className="book-author">{book.author}</div>
            <div className="rate">
              <fieldset className="rating">
                <input type="checkbox" id="star5" name="rating" value="5" />
                <label className="full" htmlFor="star5"></label>
                <input type="checkbox" id="star4" name="rating" value="4" />
                <label className="full" htmlFor="star4"></label>
                <input type="checkbox" id="star3" name="rating" value="3" />
                <label className="full" htmlFor="star3"></label>
                <input type="checkbox" id="star2" name="rating" value="2" />
                <label className="full" htmlFor="star2"></label>
                <input type="checkbox" id="star1" name="rating" value="1" />
                <label className="full" htmlFor="star1"></label>
              </fieldset>
            </div>
            <div className="book-sum">{book.description}</div>
            <BuyBook trigger={trigger} details={book} />
          </div>
        </div>
      ))}
    </Flickity>
  );
}

export default Header;
