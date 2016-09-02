import React, { PropTypes } from 'react';
import Rating from './Rating';
import { connect } from 'react-redux';
import { setRatingStars, sendRating, closeModal } from '../../actions';
import jQuery from 'jquery';

const RatingForm = ({modalId, recipe, rating, onSetRatingStars, onSendRating, onCloseModal}) => {
    const input = { comment: '', stars: ''};
    let formRating = jQuery.extend({}, rating);
    const setRating = () => {
        rating.recipeid = recipe.id;
        formRating.stars = input.stars;
        rating.comment = input.comment.value;
        onSendRating(rating);
        onCloseModal(modalId, recipe);
    };
    return( <div className="row">
            <div className="col s8 offset-s2">
              <div className="row">
                <div className="input-field col s12 center-align">
                  <Rating maxStars="5" stars={formRating.stars} rating={formRating} ratingInput={input} color="white-text" ratingClass="hide" clickable="clickable" onSetRatingStars={onSetRatingStars}/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea placeholder="Enter a comment (optional)" id="comment" className="materialize-textarea"
                   ref={node => {input.comment = node;}}/>
                  <label htmlFor="comment">Comment</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 center-align">
                  <button type="button" className="btn" onClick={() => setRating()} >Send</button>
                </div>
              </div>
            </div>
          </div>);
};

RatingForm.propTypes = {
    recipe: PropTypes.object,
    rating: PropTypes.object,
    onSetRatingStars: PropTypes.func,
    onSendRating: PropTypes.func,
    modalId: PropTypes.string,
    onCloseModal: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        rating: state.rating
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetRatingStars: (rating, stars) => dispatch(setRatingStars(rating, stars)),
        onSendRating: (rating) => dispatch(sendRating(rating)),
        onCloseModal: (modalId, object) => dispatch(closeModal(modalId, object))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RatingForm);
