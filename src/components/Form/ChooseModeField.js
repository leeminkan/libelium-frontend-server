import React, {Component} from 'react'
import Select from 'react-select';

export default class ChooseModeField  extends Component{

  onChange = (selectedOption) => {
    const { input: { onChange } } = this.props;
    onChange(selectedOption);
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
    } = options

    return (
      <React.Fragment>
        <div className="field-wrapper-custom" {...custom}>
          {label && (<label className="label-type-1">{label}</label>)}
          <div>
              <Select
                    defaultValue={defaultValue}
                    options={samples}
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