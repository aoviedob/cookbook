import React, { PropTypes } from 'react';

const DropDown = ({ id, className, state, options, valueField, labelField, onChange, selectedText}) => {
    const handleChange = (opt) => {
        state[valueField] = opt[valueField];
        state[labelField] = opt[labelField];
        if (onChange) {
            onChange();
        }
    };
    let valueText;
    if(selectedText) {
        valueText = selectedText;
    }else {
        valueText = state[labelField];
    }
    let mappedOptions = options.map(function iterate(opt) {
        return (<li key={opt[valueField]} onClick={() => handleChange(opt)} ><a>{opt[labelField]}</a></li>);
    });
    return (
        <div>
            <a className="dropdown-button btn white grey-text full-width" data-beloworigin="true" href="#" data-activates={id}>{valueText}</a>
            <ul id={id}
                className={className}>
        		{mappedOptions}
        	</ul>
        </div>);
};

DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    state: PropTypes.object,
    valueField: React.PropTypes.string,
    labelField: React.PropTypes.string,
    onChange: React.PropTypes.func,
    selectedText: React.PropTypes.string
};

export default DropDown;
