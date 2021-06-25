import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import PostCard from '../Posts/PostCard';
import './dashboard.scss';
import { POSTS } from '../../constants/constants';
import { store } from 'react-notifications-component';

import { useFirestore } from '../../firebase/DBcontext';
import { useHistory } from 'react-router';

function Dashboard() {
  const [books, setbooks] = useState([]);
  const { getBooks } = useFirestore();
  const history = useHistory();

  useEffect(() => {
    getBooks()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const details = doc.data();
          const id = doc.id;
          return { ...details, id };
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

    window.addEventListener('popstate', () => {
      history.go(1);
    });
  }, []);

  return (
    <div>
      <div className="book-store">
        <Navbar />
        <Header />
        <div className="main-wrapper">
          <div className="books-of">
            <div className="week">
              <div className="author-title">Author of the week</div>
              <div className="author">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Sebastian Jeremy</div>
              </div>
              <div className="author">
                <img
                  src="https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Jonathan Doe</div>
              </div>
              <div className="author">
                <img
                  src="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Angeline Summer</div>
              </div>
              <div className="author">
                <img
                  src="https://pbs.twimg.com/profile_images/737221709267374081/sdwta9Oh.jpg"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Noah Jones</div>
              </div>
              <div className="author">
                <img
                  src="https://pbs.twimg.com/profile_images/2452384114/noplz47r59v1uxvyg8ku.png"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Tommy Adam</div>
              </div>
              <div className="author">
                <img
                  src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt=""
                  className="author-img"
                />
                <div className="author-name">Ian Cassandra</div>
              </div>
            </div>
            <div className="week year">
              <div className="author-title">Books of the year</div>
              <div className="year-book">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg"
                  alt=""
                  className="year-book-img"
                />
                <div className="year-book-content">
                  <div className="year-book-name">Disappearing Earth</div>
                  <div className="year-book-author">by Julia Phillips</div>
                </div>
              </div>
              <div className="year-book">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg"
                  alt=""
                  className="year-book-img"
                />
                <div className="year-book-content">
                  <div className="year-book-name">Lost Children Archive</div>
                  <div className="year-book-author">by Valeria Luiselli</div>
                </div>
              </div>
              <div className="year-book">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/81OF9eJDA4L.jpg"
                  alt=""
                  className="year-book-img"
                />
                <div className="year-book-content">
                  <div className="year-book-name">Phantoms: A Thriller </div>
                  <div className="year-book-author">by Dean Koontz</div>
                </div>
              </div>
              <div className="year-book">
                <img
                  src="https://m.media-amazon.com/images/I/515FWPyZ-5L.jpg"
                  alt=""
                  className="year-book-img"
                />
                <div className="year-book-content">
                  <div className="year-book-name">Midnight in Chernobyl</div>
                  <div className="year-book-author">by Adam Higginbotham</div>
                </div>
              </div>
              <div className="year-book">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/91dBtgERNUL.jpg"
                  alt=""
                  className="year-book-img"
                />
                <div className="year-book-content">
                  <div className="year-book-name">10 Minutes 38 Seconds</div>
                  <div className="year-book-author">by Elif Shafak</div>
                </div>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
          <div className="popular-books">
            <div className="main-menu">
              <div className="genre">Popular by Genre</div>
              <div className="book-types">
                <a href="#" className="book-type active">
                  All Genres
                </a>
                <a href="#" className="book-type">
                  Business
                </a>
                <a href="#" className="book-type">
                  Science
                </a>
                <a href="#" className="book-type">
                  Fiction
                </a>
                <a href="#" className="book-type">
                  Philosophy
                </a>
                <a href="#" className="book-type">
                  Biography
                </a>
              </div>
            </div>
            <div className="book-cards">
              {books.map((post) => (
                <PostCard
                  title={post.name}
                  description={post.about}
                  author={post.author}
                  imageUrl={post.imageURL}
                  rating={post.rating}
                  bookid={post.id}
                  price={post.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
