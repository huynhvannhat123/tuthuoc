import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Grid, Typography } from '@mui/material';
import Webcam from 'react-webcam';
import { Box } from '@mui/system';

class MyWebCam extends Component {
  constructor(props)
  {
    super(props);
    this.my_cam = React.createRef();
    this.pos = 0;

    /// Sự kiện nhấn nút
    this.onClick = this.onClick.bind(this);
  }

  onClick()
  {
    let { image_refs } = this.props;
    let imageSrc = this.my_cam.current.getScreenshot();
    image_refs[this.pos].current.src = imageSrc;
    this.pos ++;
    if (this.pos === 4)
      this.pos = 0;
  }

  render() {
    let { image_refs, height } = this.props;

    return (
      <Box height={height} marginTop={1}>
        <Typography 
          component="h4" 
          variant="h4" textAlign="center" 
        >
          Lấy ảnh người lấy thuốc
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{
              "& .MuiTextField-root" : { m: 1 }
            }}>
              <Webcam 
                screenshotFormat="image/png"
                ref={this.my_cam}
                height={height} 
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              { (() => {
                let r = [];
                for (let i = 0; i <= 1; i++ )
                {
                  r.push(
                    <Grid item key={i} xs={6}>
                      <img 
                        ref={image_refs[i]} 
                        height={height / 2} 
                        alt="Không có ảnh" 
                        src="./no-data-available.png"
                      />
                    </Grid>
                  );
                }
                return r;
              })() }
            </Grid>
            <Grid container>
              { (() => {
                let r = [];
                for (let i = 2; i <= 3; i++ )
                {
                  r.push(
                    <Grid item key={i} xs={6}>
                      <img 
                        ref={image_refs[i]} 
                        height={height / 2} 
                        alt="Không có ảnh" 
                        src="./no-data-available.png"
                      />
                    </Grid>
                  );
                }
                return r;
              })() }
            </Grid>
          </Grid>
        </Grid>
        <Button fullWidth 
          variant="contained" 
          onClick={this.onClick}
        >Lấy</Button>
      </Box>
    )
  }
}

MyWebCam.defaultProps = {
  height : 500
}

MyWebCam.propTypes = {
  height : PropTypes.number.isRequired,
  image_refs : PropTypes.array.isRequired
}

export default MyWebCam;