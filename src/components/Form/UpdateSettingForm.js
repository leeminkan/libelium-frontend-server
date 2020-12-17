import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from '@material-ui/core/Button'
import ChooseField from './ChooseField'


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
            waspmote_ids
        }
    } = this.props
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <Field
            name="sensors"
            component={ChooseField}
            label="Sensors"
            options={{
                fields: {
                    value: 'id',
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
        <div className="wrapper-item-center">
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'UpdateSettingForm',
  validate // a unique identifier for this form
})(UpdateSettingForm)