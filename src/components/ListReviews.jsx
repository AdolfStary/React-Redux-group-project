import React from 'react';
import { connect } from 'react-redux';
import MovieCard from './MovieCard';
import { removeReview } from '../actions/aReviews';


const ListReviews = (props) => {




    // If Movie id is passed, list reviews for given movie
    if (props.movieId !== undefined) {

        let sortedReviews = [];

        for (const review of props.reviews) {
            if (review.movieId === props.movieId) {

                if (review.username === props.activeUser.username) {
                    sortedReviews.splice(0, 0, review)
                }
                else sortedReviews.push(review);
            }
        }

        return (

            <>
                <h2>Reviews</h2>
                <ul id="review-list">
                    {sortedReviews.map(review => {

                        // If the Movie ID passed from props matches in review, it will Pull the info

                        return (
                            <li key={review.id}>
                                <strong>
                                    {review.username} ({review.rating}/10):
                                    </strong>
                                {review.review}
                            </li>
                        );

                    })}
                </ul>
            </>

        );
    }

    // If username is passed, list reviews for given user
    else if (props.username !== undefined) {



        return (

            <>
                <ul id="review-list">
                    {props.reviews.map(review => {

                        // If the Movie ID passed from props matches in review, it will Pull the info
                        if (review.username === props.username) {
                            return (
                                <li key={review.id}>

                                    <MovieCard movieId={review.movieId} />

                                    <div className="p-review-info">
                                        <strong>{review.rating}</strong>
                                        <p>{review.review}</p>
                                        <input type="checkbox" onClick={

                                            e => {

                                                // Had to addEventListener when checkbox is checked, because buttons disabled by default are not allowed to have active event listeners
                                                // For example enabled button  onClick would work, disabled button onClick wouldn't work even after enabling the button.

                                                const deleteReview = () => {
                                                    props.dispatch(removeReview(review.id))
                                                }

                                                console.log(e.target);
                                                e.target.nextSibling.disabled = !e.target.nextSibling.disabled;
                                                e.target.nextSibling.addEventListener("click", deleteReview);
                                            }

                                        } />

                                        <div className="del-button"><button type="button" className="delete-review-button" disabled={true}>Delete</button>
                                        </div>
                                    </div>


                                </li>
                            );
                        }
                        else
                            return "";

                    })}
                </ul>
            </>

        );
    }

}
export default connect(state => ({ reviews: state.reviews, activeUser: state.activeUser }))(ListReviews);