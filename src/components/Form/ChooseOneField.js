import React, {Component} from 'react'
import Select from 'react-select';

export default class ChooseOneField  extends Component{

  onChange = (selectedOption) => {
    const { input: { onChange } } = this.props;
    onChange(selectedOption.waspmote_id);
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

    mDefaultValue = samples.filter(option => {
      return defaultValue === option[fields.value]
    })
    
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
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
          </div>
        </div>
        </React.Fragment>
    );
  }
}