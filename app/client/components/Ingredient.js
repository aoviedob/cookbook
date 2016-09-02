import React, { PropTypes } from 'react';

const Ingredient = ({ data, onRemove }) => {
    return(<li className="collection-item normal-padding" value={data.id}> {data.name} - {data.amount}
              <div className="secondary-content" >
                  <a href="#!" onClick={onRemove}><i className="material-icons">delete</i></a>
              </div>
          </li>);
};

Ingredient.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func
};

export default Ingredient;
