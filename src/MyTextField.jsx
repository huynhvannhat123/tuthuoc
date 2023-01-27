import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

class MyTextField extends Component {
  render() {
    let { data_ref, label, variant, another } = this.props;
    
    return (
      <TextField 
        fullWidth
        variant={variant}
        inputRef={data_ref}
        label={label}
        {...another}
      >
        {this.props.children}
      </TextField>
    )
  }
}

MyTextField.defaultProps = {
  variant : "outlined",
  another : {}
}

MyTextField.propTypes = {
  data_ref : PropTypes.any,
  label : PropTypes.string.isRequired,
  variant : PropTypes.string.isRequired,
  another : PropTypes.object.isRequired
}

export default MyTextField;