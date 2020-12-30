import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import ImageUploadField from './ImageUploadField'
import ChooseField from './ChooseField'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'waspmote_id'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    variant="outlined"
    fullWidth={true}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
          />
        }
        label={label}
      />
    </div>
  )

class AddDeviceForm extends Component {
  render() {
    const { 
      handleSubmit, 
      loading,
      initialValues: {
        sampleSensors
      }
    } = this.props
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <Field
            name="name"
            component={renderTextField}
            label="Name"
          />
        </div>
        <div className="form-field">
          <Field
            name="waspmote_id"
            component={renderTextField}
            label="Waspmote ID"
          />
        </div>
        <div className="form-field">
          <Field name="is_displayed" component={renderCheckbox} label="Display" />
        </div>
        <div className="form-field">
          <Field 
            name="image" 
            component={ImageUploadField} 
            label="Image" 
          />
        </div>
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
                  defaultValue: [],
              }}
            />
          </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'AddDeviceForm',
  validate // a unique identifier for this form
})(AddDeviceForm)