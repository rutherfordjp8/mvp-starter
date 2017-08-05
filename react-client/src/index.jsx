import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }

    this.getUpload = getUpload.bind(this);
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
        <input type='file' id='imageUpload'/>
        <input type='button' value='Upload' />
      </div>
      <h1>Item List</h1>
        <span id='displayImg'><img style={{width:'400px',height:'250px'}}/></span>
      <List images={this.state.images}/>
    </div>)
  }
}

{/* ~~getUpload
  * When submit is hit, getUpload runs.
  * It will get the File path that is uploaded.
  * Copy the file and put it into a local directory
  *
  * TODO: --Check if an image file
  *
*/}
var getUpload = function(something) {
  console.log('Getting upload, something: ', something);
  var img = document.getElementById('imageUpload').value;

  if(img === '') {
    console.log(img);
  } else {
    console.log(img);
  //   var sourceImage = document.createElement('img'),
    //  imgContainer = document.getElementById("displayImg");
  //  sourceImage.src = img;
  //  imgContainer.appendChild(sourceImage);
   //
  //  function cloneImg(){
  //      imgContainer.appendChild(sourceImage.cloneNode(true));
  //  }
  //  cloneImg();
  }
};
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#displayImg img').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).on('change','input[type="file"]', function(){
  readURL(this);
});

ReactDOM.render(<App />, document.getElementById('app'));
