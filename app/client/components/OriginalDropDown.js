import React, { PropTypes } from 'react';

const DropDown = ({ id, classN, state, value, options, valueField, labelField, onChange}) => {
    let mappedOptions = options.map(function iterate(opt) {
        return (<option
                    key={opt[valueField]}
					value={opt[valueField]}>
					{opt[labelField]}
                </option>);
    });
    function handleChange(e) {
        state.value = e.target.value;
        if (onChange) {
            onChange();
        }
    }
    return (<select
            id={id}
            className={classN}
    		value={value}
    		onChange={handleChange}>
    		{mappedOptions}
    		</select>);
};

DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    classN: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    state: PropTypes.object,
    value: PropTypes.string,
    valueField: PropTypes.string,
    labelField: PropTypes.string,
    onChange: PropTypes.func
};

export default DropDown;
