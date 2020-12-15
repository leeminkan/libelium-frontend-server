import React, {Component} from 'react'
import Select from 'react-select';

export default class ChooseSensorField  extends Component{

  onChange = (selectedOption) => {
    const { input: { onChange } } = this.props;
    let selectedSensors = [];
    if (Array.isArray(selectedOption) && selectedOption.length > 0) {
      selectedSensors = selectedOption.map(({ value }) => value);
    }
    onChange(selectedSensors);
  }

  render(){
    const { input: { value } } = this.props
    const { 
      input, 
      label, 
      meta,
      ...custom 
    } = this.props
    
    let options = [];
    let defaultValue = [];

    if (Array.isArray(this.props.sensors) && this.props.sensors.length > 0) {
      options = this.props.sensors.map(obj => {
        return {
          value: obj.id,
          label: obj.name
        };
      })
    }

    if (Array.isArray(this.props.data.sensors) && this.props.data.sensors.length > 0) {
      defaultValue = this.props.data.sensors.map(obj => {
        return {
          value: obj.id,
          label: obj.name
        };
      })
    }

    return (
      <div className="field-wrapper-custom" {...custom}>
        <fieldset aria-hidden="true" class="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"><legend class="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"><span>Name</span></legend></fieldset>
         {label && (<label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled">{label}</label>)}
         <div class="image-field-row">
          <Select
                defaultValue={defaultValue}
                options={options}
                onChange={this.handleChange}
                isMulti
                name="sensors"
                className="basic-multi-select"
                classNamePrefix="select"
              />
         </div>
      </div>
    );
  }
}