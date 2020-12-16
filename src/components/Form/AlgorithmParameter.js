import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'window_size',
    'saving_level',
    'time_base',
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

const AlgorithmParameter = props => {
  const { handleSubmit, loading } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="hide">
        <Field
          name="waspmote_id"
          component={renderTextField}
          label="Waspmote id"
        />
      </div>
      <div>
        <Field
          name="window_size"
          component={renderTextField}
          label="Window size"
          type="number"
          step="any"
        />
      </div>
      <div>
        <Field
          name="saving_level"
          component={renderTextField}
          label="Saving level"
          type="number"
          step="any"
        />
      </div>
      <div>
        <Field
          name="time_base"
          component={renderTextField}
          label="Time base"
          type="number"
          step="any"
        />
      </div>
      <div>
        <Field name="is_disabled" component={renderCheckbox} label="Disable" />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'AlgorithmParameter', // a unique identifier for this form
  validate
})(AlgorithmParameter)