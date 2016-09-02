import React, { PropTypes } from 'react';

const Modal = ({ id, className, children, modalType }) =>
  	<div className={className}>
      <div id={id} className={modalType}>
      	<div className="modal-content">
          {children}
      	</div>
  	 	</div>
    </div>;

Modal.propTypes = {
    children: PropTypes.object,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    modalType: PropTypes.string
};

export default Modal;
