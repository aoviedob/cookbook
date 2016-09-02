import React, { PropTypes } from 'react';

const RemoveRecipe = ({onRecipeRemove}) =>
  	<div>
  		<div className="row">
		  	<div className="col s12">
		    	Are you sure yo want to remove this recipe?
		    </div>
	    </div>
        <div className="row">
            <div className="input-field col s12 right-align">
                <button className="btn waves-effect modal-close" type="button">No</button>
                <button className="btn waves-effect modal-close normal-margin" type="button" onClick={() => onRecipeRemove()}>Yes</button>
            </div>
        </div>
  	</div>;


RemoveRecipe.propTypes = {
    onRecipeRemove: PropTypes.func
};

export default RemoveRecipe;
