import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';

import LeftLayout from './LeftLayout';
import MyWebCam from './MyWebCam';
import RightLayout from './RightLayout';
import axiosClient from './axiosClient';

class App extends Component {
  static n = 4;

  constructor(props)
  {
    super(props);
    this.my_refs = {
      stack_drug : React.createRef(),
      drug_mode : React.createRef(),
      phone : React.createRef(),
      image_refs : []
    }

    for (let i = 0; i < App.n; i++)
    {
      this.my_refs.image_refs.push(
        React.createRef()
      );
    }

    this.detail_information = [
      {
        stack : 1,
        time_ref : React.createRef(),
        phone_ref : React.createRef()
      },
      {
        stack : 2,
        time_ref : React.createRef(),
        phone_ref : React.createRef()
      },
      {
        stack : 3,
        time_ref : React.createRef(),
        phone_ref : React.createRef()
      },
      {
        stack : 4,
        time_ref : React.createRef(),
        phone_ref : React.createRef()
      }
    ];

    this.chooseStackDrug = this.chooseStackDrug.bind(this);
    this.onUpdateInformation = this.onUpdateInformation.bind(this);

    // Dữ liệu dùng để render lại trang
    this.state = {
      use_camera : false,
      loading : true,
      rerender : false
    }
  }

  __getRightValueThroughId(stack_id)
  {
    let detail_information = this.detail_information[stack_id - 1];
    return {
      time : detail_information.time_ref.current.innerText,
      phone : detail_information.phone_ref.current.innerText 
    }
  }

  chooseStackDrug()
  {
    setTimeout(() => {
      let stack_id = this.my_refs.stack_drug.current.value;
      let value = this.__getRightValueThroughId(stack_id);
      this.assignLeftLayout(this.my_refs.drug_mode, parseInt(value.time) - 6);
      this.assignLeftLayout(this.my_refs.phone, value.phone);
      this.my_refs.phone.current.focus();
    }, 500);
  }

  onUpdateInformation()
  {
    /// Khởi tạo dữ liệu
    let res = Object.keys(this.my_refs).map((key) => {
      if (this.my_refs[key].current === null)
        return -1;
      if (key === "image_refs")
        return [];
      return this.my_refs[key].current.value;
    });

    /// Thao tác xử lí dữ liệu
    /// Trường hợp không chọn ngăn thuốc nhưng muốn cập nhật
    if (res[0] === 0)
    {
      alert("Vui lòng chọn ngăn thuốc");
      return;
    }

    /// Xử lí cho trường hợp giờ uống thuốc
    if (res[1] === 15)
      res[1] = 0;

    /// ----------------------------------------------------
    /// Xử lí số điện thoại
    if (res[2] === '')
    {
      alert("Không để trống số điện thoại");
      return;
    }

    /// -----------------------------------------------------
    /// Xử lí ảnh
    for (let i = 0; i < App.n; i++)
    {
      if (this.my_refs.image_refs[i].current === null)
      {
        alert("Vui lòng lấy đầy đủ ảnh người lấy thuốc");
        return;
      }
    }

    /// -----------------------------------------------------
    let json_data = {
      stack_id : res[0],
      drink : res[1] + 6,
      phone : res[2],
      n : App.n
    }

    let form = new FormData();
    for (let i = 0; i < App.n; i++)
    {
      form.append(`image-${i + 1}`, this.my_refs.image_refs[i].current.src);
    }
    form.append("private-information", JSON.stringify(json_data));
    // form.append("test", 20);

    /// Tiến hành gọi request gửi dữ liệu
    axiosClient.put("/information", form, {
      headers : { 'content-type' : "multipart/form-data" }
    })
    .then(() => {
      /// ---------------------------
      /// Lấy ảnh xong thì tắt camera
      this.setState({
        use_camera : false
      });

      /// Tiến hành cập nhật dữ liệu
      this.assignRightLayout(this.detail_information[res[0] - 1].time_ref, json_data.drink);
      this.assignRightLayout(this.detail_information[res[0] - 1].phone_ref, json_data.phone);
    }).catch((err) => {
      console.log(err);
    });
  }

  assignRightLayout(ref, value)
  {
    ref.current.innerText = value;
  }

  assignLeftLayout(ref, value)
  {
    ref.current.value = value;
  }

  componentDidMount()
  {
    // this.assignRightLayout(this.detail_information[0].time_ref, 12);
    axiosClient.get("/information")
    .then((resp) => {
      resp.forEach((stack_data, pos) => {
        let detail_information = this.detail_information[pos];
        this.assignRightLayout(detail_information.time_ref, stack_data.drink);
        this.assignRightLayout(detail_information.phone_ref, "0" + stack_data.phone);
      });
      this.setState({
        loading : false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    let { height } = this.props;
    return (
      <>
        <Typography component="h4" variant="h4" 
          textAlign={"center"} 
          style={{ backgroundColor : "blue", color : "white", padding : 10 }}
        >
          TỦ THUỐC THÔNG MINH
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} marginTop={2}>
            <LeftLayout 
              refs={this.my_refs} 
              chooseStackDrug={this.chooseStackDrug} 
              height={height} 
            />
          </Grid>
          <Grid item xs={6} marginTop={2}>
            <RightLayout height={height} 
              stack_information={this.detail_information} />
          </Grid>
        </Grid> 
        <Button 
          fullWidth 
          variant="contained"
          color="error"
          style={{ marginBottom : 5 }}
          onClick={() => {
            this.setState({
              use_camera : true
            });
          }}
        >Lấy ảnh</Button>
        <Button 
          fullWidth 
          variant="contained"
          color="primary"
          onClick={this.onUpdateInformation}
        >Cập nhật thông tin</Button>
        { this.state.use_camera && <MyWebCam image_refs={this.my_refs.image_refs} /> }
      </>
    )
  }
}

App.defaultProps = {
  height : 400
}

App.propTypes = {
  height : PropTypes.number.isRequired
}

export default App;