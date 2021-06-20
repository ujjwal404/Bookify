import React from 'react';
import './PostCard.scss';

function PostCard({ title, description, imageUrl, author }) {
  return (
    <>
      <div className="book-card">
        <div className="content-wrapper">
          <img src={imageUrl} alt="" className="book-card-img" />
          <div className="card-content">
            <div className="book-name">{title}</div>
            <div className="book-by">by {author}</div>
            <div className="rate">
              <fieldset className="rating book-rate">
                <input type="checkbox" id="star-c1" name="rating" value="5" />
                <label className="full" for="star-c1"></label>
                <input type="checkbox" id="star-c2" name="rating" value="4" />
                <label className="full" for="star-c2"></label>
                <input type="checkbox" id="star-c3" name="rating" value="3" />
                <label className="full" for="star-c3"></label>
                <input type="checkbox" id="star-c4" name="rating" value="2" />
                <label className="full" for="star-c4"></label>
                <input type="checkbox" id="star-c5" name="rating" value="1" />
                <label className="full" for="star-c5"></label>
              </fieldset>
              <span className="book-voters card-vote">1.987 voters</span>
            </div>
            <div className="book-sum card-sum">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
