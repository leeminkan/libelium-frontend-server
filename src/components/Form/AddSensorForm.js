import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'key',
    'unit',
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

class AddSensorForm extends Component {
  render() {
    const { 
      handleSubmit, 
      loading,
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
            name="key"
            component={renderTextField}
            label="Key"
          />
        </div>
        <div className="form-field">
          <Field
            name="unit"
            component={renderTextField}
            label="Unit"
          />
        </div>
        <div className="form-field">
          <Field
            name="description"
            component={renderTextField}
            label="Description"
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
  form: 'AddSensorForm',
  validate // a unique identifier for this form
})(AddSensorForm)