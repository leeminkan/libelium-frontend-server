import React, { Component } from 'react'
import { Field, reduxForm, getFormValues } from 'redux-form'
// Redux
import { connect } from "react-redux";

import Button from '@material-ui/core/Button'
import ChooseField from './ChooseField'
import ChooseOneField from './ChooseOneField'
import ChooseModeField from './ChooseModeField'


const validate = values => {
  const errors = {}
  const requiredFields = [
    'sensors',
    'devices',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

class UpdateSettingForm extends Component {
  render() {
    const { 
        handleSubmit, 
        submitting,
        initialValues: {
            sampleSensors,
            sensors,
            sampleDevices,
            waspmote_ids,
            waspmote_algorithm,
            mode
        }
    } = this.props

    const selectedDevices = sampleDevices.filter(option => {
      return this.props.values.waspmote_ids.includes(option.waspmote_id)
    });
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-session-header">
          <div className="form-session-header-line"></div>
          <span>Comparision Page Setting</span>
        </div>
        <div className="form-session-body">
          <div className="form-field">
            <Field
              name="sensors"
              component={ChooseField}
              label="Sensors"
              options={{
                  fields: {
                      value: 'key',
                      label: 'name'
                  },
                  samples: sampleSensors,
                  defaultValue: sensors,
              }}
              style = {{width: 500}}
            />
          </div>
          <div className="form-field">
            <Field
              name="waspmote_ids"
              component={ChooseField}
              label="Devices"
              options={{
                  fields: {
                      value: 'waspmote_id',
                      label: 'name'
                  },
                  samples: sampleDevices,
                  defaultValue: waspmote_ids,
              }}
              style = {{width: 500}}
            />
          </div>
          <div className="form-field">
            <Field
              name="waspmote_algorithm"
              component={ChooseOneField}
              label="Device Algorithm"
              options={{
                  fields: {
                      value: 'waspmote_id',
                      label: 'name'
                  },
                  samples: selectedDevices,
                  defaultValue: waspmote_algorithm,
              }}
              style = {{width: 500}}
            />
          </div>
          <div className="form-field">
            <Field
              name="mode"
              component={ChooseModeField}
              label="Mode"
              options={{
                  samples: [
                    { value: 'apex-realtime', label: 'Apex Realtime' },
                    { value: 'chartjs', label: 'Chartjs' },
                  ],
                  defaultValue: mode || { value: 'chartjs', label: 'Chartjs' },
              }}
              style = {{width: 500}}
            />
          </div>
        </div>
        <div className="wrapper-item-center">
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Save
          </Button>
        </div>
      </form>
    )
  }
}

UpdateSettingForm = connect(state => ({
  values: getFormValues('UpdateSettingForm')(state),
}))(UpdateSettingForm)

export default reduxForm({
  form: 'UpdateSettingForm',
  validate // a unique identifier for this form
})(UpdateSettingForm)