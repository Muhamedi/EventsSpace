import React from 'react';
import PropTypes from 'prop-types';

const Select = props => (
  <select
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    name={props.name}
    className='form-control'
  >
    <option disabled value=''>
      Select
    </option>
    {props.items.map(item => (
      <option key={item[props.valueField]} value={item[props.valueField]}>
        {item[props.textField]}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  valueField: PropTypes.string.isRequired,
  textField: PropTypes.string.isRequired,
};

export default Select;
