import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { MenuItem, Box, styled, Typography } from '@mui/material';
import MyTextField from './MyTextField';

const drug_modes = [];
for (let i = 6; i <= 20; i++)
{
  drug_modes.push({
    label : i,
    value : i - 6
  });
}

drug_modes.push({
  label : "Vui lòng chọn giờ (mặc định là 6 giờ)",
  value : 15
});

const Title = styled(Typography)(
  ({ theme }) => ({
    textAlign : "left",
    marginLeft : theme.spacing(1),
    paddingBottom : theme.spacing(1)
  })
);

class LeftLayout extends Component {
  static stack_drugs = [
    {
      label : 'Ngăn thuốc',
      value : 0
    },
    {
      label : "Ngăn thuốc 1",
      value : 1
    },
    {
      label : "Ngăn thuốc 2",
      value : 2
    },
    {
      label : "Ngăn thuốc 3",
      value : 3
    },
    {
      label : "Ngăn thuốc 4",
      value : 4
    }
  ]

  render() {
    let { refs, chooseStackDrug, height } = this.props;
    return (
      <Box sx={{
        "& .MuiTextField-root" : { m: 1 }
      }} height={height} >
        <Title variant="h4">Ngăn thuốc</Title>
        <MyTextField 
          label="Ngăn thuốc"
          data_ref={refs.stack_drug}
          another={{
            select : true,
            defaultValue : 0,
            onChange : (() => chooseStackDrug())
          }}
        >
          { LeftLayout.stack_drugs.map((stack_drug) => {
            return (
              <MenuItem key={stack_drug.label} value={stack_drug.value} >
                {stack_drug.label}
              </MenuItem>
            )
          }) }
        </MyTextField>   
        <Title variant="h4">Thời gian uống thuốc</Title>
        <MyTextField
          label="Thời gian"
          data_ref={refs.drug_mode}
          another={{
            select : true,
            defaultValue : 15
          }}
        >
          { drug_modes.map((drug_mode) => {
            return (
              <MenuItem key={drug_mode.label} value={drug_mode.value} >
                { drug_mode.label }
              </MenuItem>
            )
          }) }
        </MyTextField>
        <Title variant="h4">Số điện thoại thông báo</Title>
        <MyTextField
          label="Số điện thoại"
          data_ref={refs.phone}
          another={{
            defaultValue : ''
          }}
        >
        </MyTextField>     
      </Box>
    );
  }
}

LeftLayout.defaultProps = {
  height : 400
}

LeftLayout.propTypes = {
  refs : PropTypes.object.isRequired,
  height : PropTypes.number.isRequired
}

export default LeftLayout;