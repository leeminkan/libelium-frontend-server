import React, {Component} from 'react'
import Select from 'react-select';

export default class ChooseField  extends Component{

  onChange = (selectedOption) => {
    const { input: { onChange } } = this.props;
    const { 
      options
    } = this.props
    let selectedValues = [];
    if (Array.isArray(selectedOption) && selectedOption.length > 0) {
      selectedValues = selectedOption.map((item) => item[options.fields.value]);
    }
    onChange(selectedValues);
  }

  render(){
    const { 
      input, 
      label, 
      meta,
      options,
      ...custom 
    } = this.props

    const {
      samples,
      defaultValue,
      fields
    } = options

    let mDefaultValue = [];

    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      mDefaultValue = samples.filter(option => {
        return defaultValue.includes(option[fields.value])
      })
    }
    
    return (
      <React.Fragment>
        <div className="field-wrapper-custom" {...custom}>
          {label && (<label className="label-type-1">{label}</label>)}
          <div>
              <Select
                    defaultValue={mDefaultValue}
                    options={samples}
                    getOptionLabel={ option => option[fields.label]}
                    getOptionValue={ option => option[fields.value]}
                    onChange={this.onChange}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
          </div>
        </div>
        </React.Fragment>
    );
  }
}