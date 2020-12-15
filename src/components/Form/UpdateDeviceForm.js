import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
// Redux
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import ImageUploadField from './ImageUploadField'

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
  if (
    values.name &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.name)
  ) {
    errors.name = 'Invalid name address'
  }
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

const data = {
  name: 'Jane',
  waspmote_id: 'Doe',
  is_displayed: true,
}

class UpdateDeviceForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div class="form-field">
          <Field
            name="name"
            component={renderTextField}
            label="Name"
            style = {{width: 500}}
          />
        </div>
        <div class="form-field">
          <Field
            name="waspmote_id"
            component={renderTextField}
            label="Waspmote ID"
            style = {{width: 500}}
          />
        </div>
        <div class="form-field">
          <Field name="is_displayed" component={renderCheckbox} label="Display" />
        </div>
        <div class="form-field">
          <Field 
            name="image" 
            component={ImageUploadField} 
            label="Image" 
            default_src="https://material-ui.com/static/ads-in-house/tidelift.png"
            style = {{width: 500}}/>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
UpdateDeviceForm = reduxForm({
  form: 'UpdateDeviceForm',
  validate // a unique identifier for this form
})(UpdateDeviceForm)

// You have to connect() to any reducers that you wish to connect to yourself
UpdateDeviceForm = connect(
  state => ({
    initialValues: data // pull initial values from account reducer
  }),
  {  } // bind account loading action creator
)(UpdateDeviceForm)

export default UpdateDeviceForm