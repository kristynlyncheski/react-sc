import React, { Component, PropTypes as PT } from 'react'

import './form-textarea.scss'

export default class FormTextarea extends Component {

  static propTypes = {
    id: PT.string.isRequired,
    label: PT.string,
    onChange: PT.func,
    placeholder: PT.string,
    isRequired: PT.bool,
    name: PT.string,
    maxLength: PT.number,
    onChange: PT.func,
    value: PT.string
  }

  static defaultProps = {
    maxLength: 500,
    isRequired: false,
    onChange: () => {},
    value: ''
  }

  getName () {
    const { id, name } = this.props
    return name || id
  }

  render () {
    const { id, isRequired, placeholder, text, maxLength, value } = this.props
    const validation = this.getValidation(value)
    return (
      <div className='form-row'>
        {this.renderLabelFor()}
        <textarea
          id={id}
          name={this.getName()}
          required={isRequired}
          placeholder={placeholder}
          onChange={this.onChangeValue.bind(this)}
          value={value}
          maxLength={maxLength}>
          {text}
        </textarea>
        {this.renderValidationMessage(validation)}
      </div>
    )
  }

  renderLabelFor () {
    const { label, id, isRequired } = this.props
    if (label) {
      return (
        <label htmlFor={id}>
          {label}
          {isRequired ? <span className='required'>*</span> : false}
        </label>
      )
    }
    return false
  }

  onChangeValue (e) {
    this.props.onChange({
      name: this.getName(),
      value: e.target.value
    })
  }


  renderValidationMessage(validation) {
    if (this.props.validate && validation.isInvalid) {
      return (
        <p className='error-message'>{validation.message}</p>
      )
    }
  }

  getValidation (value) {
    const { type, isRequired, label, id } = this.props
    const validation = { isInvalid: false, message: '' }

    if (!value && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field. Please enter a value.`
      }
    }

    return validation
  }

}
