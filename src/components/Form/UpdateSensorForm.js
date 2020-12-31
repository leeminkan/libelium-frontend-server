import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values['chart_options']) {
    try {
      JSON.parse(values['chart_options']);
    } catch (e) {
      errors['chart_options'] = 'Invalid format! JSON required.'
    }
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

class UpdateSensorForm extends Component {
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
            style = {{width: 500}}
          />
        </div>
        <div className="form-field">
          <Field
            name="key"
            component={renderTextField}
            label="Key"
            style = {{width: 500}}
            disabled
          />
        </div>
        <div className="form-field">
          <Field
            name="unit"
            component={renderTextField}
            label="Unit"
            style = {{width: 500}}
          />
        </div>
        <div className="form-field">
          <Field
            name="description"
            component={renderTextField}
            label="Description"
            style = {{width: 500}}
          />
        </div>
        <div className="form-field">
          <Field
            name="chart_options"
            component={renderTextField}
            label="Chart Options"
            style = {{width: 500}}
            multiline
            rows={2}
            rowsMax={10}
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
  form: 'UpdateSensorForm',
  validate // a unique identifier for this form
})(UpdateSensorForm)