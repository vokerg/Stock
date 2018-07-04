import React from 'react';
import { addProductPicture } from '../../api/metadataApi';

class ImageManagement extends React.Component {
  constructor() {
    super();
    this.state
  }
  onFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    addProductPicture(1, file)(res => console.log(res));
  }

  render() {
    return (
      <div>
        <form >
          <input type="file"
               id="image" name="image"
               accept="image/png, image/jpeg" onChange={this.onFileUpload}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default ImageManagement;
