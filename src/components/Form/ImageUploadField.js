import React, {Component} from 'react'
import ImageUploader from 'react-images-upload'
import * as util from '../../helpers/util';
// import images
import waspmote from "../../assets/images/libelium/waspmote.png";

export default class ImageUploadField  extends Component{

  onChange = (file) => {
    const { input: { onChange } } = this.props;
    if (file.length === 1) {
      onChange(file[0]);
    } else {
      onChange(null);
    }
  }

  render(){
    const { 
      input, 
      label, 
      meta,
      default_src,
      ...custom 
    } = this.props
    return(
     <div className="field-wrapper-custom" {...custom}>
        <div className="field-border">

        </div>
        {label && (<label className="label-type-2">{label}</label>)}
          
        <div className="image-field-row">
          <div className="image-field-col">
            <div className="image-wrapper">
              <img
                id="image-preview"
                className=""
                src={default_src ? util.parseUrlImage(default_src) : waspmote}
                alt="device"
              />
            </div>
          </div>
          <div className="image-field-col">
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onChange}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
            />
          </div>
        </div>
     </div>
    )
}
}