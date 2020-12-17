import React, {Component} from 'react'
import ImageUploader from 'react-images-upload'

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
    const { input: { value } } = this.props
    const { 
      input, 
      label, 
      meta,
      default_src,
      ...custom 
    } = this.props
    return(
     <div className="field-wrapper-custom" {...custom}>
       <fieldset aria-hidden="true" class="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"><legend class="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"><span>Name</span></legend></fieldset>
        {label && (<label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled">{label}</label>)}
        <div class="image-field-row">
          <div className="image-field-col">
            <div className="image-wrapper">
              <img
                id="image-preview"
                className=""
                src={default_src}
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