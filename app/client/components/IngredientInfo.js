import React, { PropTypes } from 'react';

const IngredientInfo = ({ data }) => {
    return(<li className="collection-item" value={data.id}>
            {data.name}
            <div className="secondary-content" >
                {data.amount}
            </div>
          </li>);
};

IngredientInfo.propTypes = {
    data: PropTypes.object,
};

export default IngredientInfo;
