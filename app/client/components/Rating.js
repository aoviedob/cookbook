import React, { PropTypes } from 'react';

const Rating = ({ stars, maxStars, rating, ratingAverage, color, ratingClass, ratingInput, clickable, onSetRatingStars}) => {
    const setRatingStars = (key) =>{
        if(ratingInput) {
            ratingInput.stars = key;
            onSetRatingStars(rating, String(ratingInput.stars));
        }
    };
    let index = 0;
    const ratingStars = [];
    const buildRating = () => {
        if(index < maxStars) {
            index++;
            const key = Number(index);
            if(index <= stars) {
                ratingStars.push(<div className={color} key={key} onClick={() => setRatingStars(key)}><span className="material-icons rating-star">grade</span></div>);
            }else {
                ratingStars.push(<div key={key} onClick={() => setRatingStars(key)}><span className="material-icons rating-star empty-rating-star">grade</span></div>);
            }
            buildRating();
        }
        return ratingStars;
    };
    return( <div className="inline">
				<div className={ratingClass}>{ratingAverage}</div><div className={clickable}><div className="valign-wrapper">{buildRating()}</div></div>
			</div>);
};

Rating.propTypes = {
    stars: PropTypes.string,
    maxStars: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string,
    rating: PropTypes.object,
    color: PropTypes.string.isRequired,
    ratingClass: PropTypes.string.isRequired,
    ratingInput: PropTypes.object,
    clickable: PropTypes.string,
    onSetRatingStars: PropTypes.func
};

export default Rating;
