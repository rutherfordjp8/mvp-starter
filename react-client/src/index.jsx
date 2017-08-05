import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
var axios = require('axios');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/rutherfordjp/upload';
const CLOUDINARY_UPLOAD_PRESET = 'rtxtxpz0';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
    this.currentImgFile;
    this.getUpload = getUpload.bind(this);
    this.imgPreview = imgPreview.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          images: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  render () {
    return (
    <div>
      <div className='imgUpload'>
        <input type='file' id='imageUpload' onChange={imgPreview.bind(this)}/>
        <input type='button' value='Upload' onClick={getUpload.bind(this)}/>
      </div>
      <h1>Item List</h1>
        <span id='displayImg'></span>
      <List images={this.state.images}/>
    </div>)
  }
}

{/* ~~getUpload
  * When submit is hit, getUpload runs.
  * It will send the file to cloudinary
  *
  *
  * TODO: --Check if it is an image file
  *
*/}
var getUpload = function() {
  console.log('currentImgFile: ', this.currentImgFile)
  if (!this.currentImgFile) {
    console.error('Error: No image uploaded');
  } else {
    console.log('Sending Image: ', this.currentImgFile.name);

    var formData = new FormData();
    formData.append('file', this.currentImgFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(function(resolve) {
      console.log('Successful Post', resolve);
    }).catch(function(err) {
      console.error('Error: ', err);
    });
    // $.ajax({
    //   url: CLOUDINARY_URL,
    //   method: 'POST',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   data: formData,
    //   success: function(data) {
    //     console.log('Successful post');
    //   },
    //   error: function(err) {
    //     console.error('Failed to post: ', err);
    //   }
    // })

  }
};

{/*
  * Used to render the preview of the image
*/}
function renderImgPreview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#displayImg').empty();
      $('#displayImg').append('<img />');
      $('#displayImg img').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function imgPreview (event) {
    //Get the current image set for upload
    var inputImgNode = $('#imageUpload').get(0);
    //Send current image to render.
    renderImgPreview(inputImgNode);

    console.log('IMGPREVIEW', $('#imageUpload').get(0))

    //Set the current image file.
    //Then use to send to cloudinary on submit
    this.currentImgFile = event.target.files[0];
}
// var test = function() {
//
//   var img = document.getElementById('imageUpload').value;
//   console.log(img)
// }
// test();


ReactDOM.render(<App />, document.getElementById('app'));
