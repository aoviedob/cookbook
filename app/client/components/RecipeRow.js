import React, { PropTypes } from 'react';

const RecipeRow = ({ data, onOpenRemoveModal, onOpenEditModal, onOpenInfoModal }) => {
    let rowIconStyle = {backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)};
    let firstLetter = data.name.charAt(0).toUpperCase();
    return(<li className="collection-item avatar table-item">
      	<div className="clickable table-row" href="#!" onClick={() => onOpenInfoModal(data)}>
          <div className="circle-icon row-icon center-align" style={rowIconStyle}><div className="v-align">{firstLetter}</div></div>
        	<div className="table-item">
            <span className="title">{data.name} - {data.categoryname}</span>
        	   <p>{data.chef}</p>
          </div>
        </div>
      	<div className="secondary-content">
      		<a onClick={() => onOpenEditModal(data)} href="#!"><i className="material-icons">edit</i></a>
      		<a onClick={() => onOpenRemoveModal(data)} href="#!"><i className="material-icons">delete</i></a>
      	</div>
    </li>);
};

RecipeRow.propTypes = {
    data: PropTypes.object,
    onOpenRemoveModal: PropTypes.func,
    onOpenEditModal: PropTypes.func,
    onOpenInfoModal: PropTypes.func
};

export default RecipeRow;
