import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Box, Grid, styled, Typography } from '@mui/material';

const Content = styled(Typography)(
  ({ theme }) => ({
    padding : theme.spacing(1.25)
  })
);

class ItemValue extends Component {
  render()
  {
    let { stack, time, phone, time_ref, phone_ref } = this.props;
    return (
      <Box style={{ border : "1px dashed black", borderRadius : "5px" }} >
        <Content component="h4" variant="h4" >Thông tin ngăn {stack} </Content>
        <Content component="h6" variant="h6" >Thời gian uống: <span ref={time_ref} style={{ color : "red" }} >
          {time}
        </span> giờ </Content>
        <Content component="h6" variant="h6" >Số điện thoại: <span ref={phone_ref} style={{ color : "blue" }} >
          {phone}
        </span> </Content>
      </Box>
    )
  }
}

ItemValue.defaultProps = {
  time : "...",
  phone : "..."
}

ItemValue.propTypes = {
  stack : PropTypes.number.isRequired,
  time : PropTypes.string.isRequired,
  phone : PropTypes.string.isRequired,
  time_ref : PropTypes.any,
  phone_ref : PropTypes.any
}

class RightLayout extends Component {
  render() {
    let { stack_information, height } = this.props;
    return (
      <>
        <Grid container 
          height={parseInt(height / 2)} 
          spacing={1}
        >
          { (() => {
            let r = [];
            for (let i = 0; i <= 1; i++)
            {
              let { stack, time_ref, phone_ref } = stack_information[i];
              r.push(
                <Grid item xs={6} key={i} >
                  <ItemValue 
                    stack={stack} 
                    time_ref={time_ref} 
                    phone_ref={phone_ref} 
                  />
                </Grid>
              );
            }
            return r;
          })() }
        </Grid>
        <Grid container 
          height={parseInt(height / 2)} 
          spacing={1}
        >
        { (() => {
            let r = [];
            for (let i = 2; i <= 3; i++)
            {
              let { stack, time_ref, phone_ref } = stack_information[i];
              r.push(
                <Grid item xs={6} key={i} >
                  <ItemValue
                    stack={stack} 
                    time_ref={time_ref} 
                    phone_ref={phone_ref} 
                  />
                </Grid>
              );
            }
            return r;
          })() }
        </Grid>
      </>
    )
  }
}

RightLayout.defaultProps = {
  stack_information : [],
  height : 500
}

RightLayout.propTypes = {
  stack_information : PropTypes.array.isRequired,
  height : PropTypes.number.isRequired
}

export default RightLayout;