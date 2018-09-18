import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap'

// import classNames from 'classnames'

import './form-input.scss'

export default class TextInput extends Component {

  constructor (props) {
    super(props)
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  static propTypes = {
    id: PT.string.isRequired,
    name: PT.string,
    type: PT.oneOf(['text', 'number', 'email', 'password', 'date', 'tel', 'link']),
    isRequired: PT.bool,
    label: PT.string,
    placeholder: PT.string,
    onChange: PT.func,
    value: PT.string,
    validate: PT.bool
  }

  static defaultProps = {
    type: 'text',
    isRequired: false,
    onChange: () => {},
    value: '',
    validate: false
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
    const { onChange, name, type, maxLength } = this.props
    let value = e.target.value

    // only allow numbers in number fields
    if (type === 'number') {
      value = value.replace(/[^0-9.]/g, '')
    }

    // disable typing at max length on fields
    if (maxLength) {
      if (value.length === maxLength) {
        e.preventDefault()
      } else if (value.length > maxLength) {
        value = value.substring(0, maxLength)
      }
    }

    return this.props.onChange({
      name,
      value,
      invalid: this.getValidation(value).isInvalid
    })
  }

  getInputName () {
    const { name, id } = this.props
    return name || id
  }

  render () {
    const {
        buttonText, 
        help,
        id, 
        isInline, 
        isRequired,
        label,
        placeholder, 
        type, 
        value,
        validate
    } = this.props.field

    const validation = this.getValidation(value)
    // const formRowClass = classNames('form-row', {
    //   'inline': isInline,
    //   'error': validate && validation.isInvalid
    // })

    if (type === 'number'){
      const overrideNumber = 'text'
    }

    const fieldType = type === 'number' ? 'text' : type

    return (
        <FormGroup controlId={id}>
            <Col sm={isInline ? 3 : 12} componentClass={ControlLabel}>
                {label}
            </Col>
            <Col sm={isInline ? 9 : 12}>
                <FormControl type={fieldType} name={id} placeholder={placeholder} id={id} />
            </Col>
            {help && <HelpBlock>{help}</HelpBlock>}
            {/*this.renderValidationMessage(validation)*/}
        </FormGroup>
    )
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

    const patterns = {
      text: {
        // pattern: /^[a-z ,.'-]+$/i,
        // message: `Value should be letters only`
        pattern: /.*/,
        message: `Please enter a valid value.`
      },
      number: {
        // pattern: /^-?\d+(\.\d+)?$/,
        pattern: /^-?\d+(\.\d+)?$/,
        message: `Value should be numbers only`
      },
      email: {
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
        message: `"${value}" is not a valid email address`
      },
      date: {
        pattern: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,
        message: `"${value}" is invalid format (MM/DD/YYYY)`
      },
      tel: {
        pattern: /^\+?[0-9x \(\)\.\-]+$/,
        message: `"${value}" is not a recognized telephone format`
      },
      link: {
        // pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
        // message: `"${value}" is an invalid link format`
        pattern: /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/,
        message: `"${value}" is an invalid LinkedIn URL`
      }
    }

    // console.log('type',id, type)
    if (type === 'link' && value) {
      let invalid = !patterns[type].pattern.test(value)
      if (invalid) {
        return {
          isInvalid: true,
          message: patterns[type].message
        }
      }
    }

    if (!isRequired) { return validation }

    // checking if year of legal experience is empty, a valid number, or zero if n/a
    if (id === 'customInt1') {
      const yearPattern = /^\d{4}$/
      const yearTest = yearPattern.test(value)
      let numberValidate = false

      const currentYear = new Date().getFullYear()

      const maxYear = Math.ceil((currentYear + 3) / 10) * 10

      // valid if between 1940 and current year
      if (yearTest && (value < 1940 || value > maxYear )) {
        numberValidate = true
      }

      // valid if zero
      if (!yearTest) {
        numberValidate = (value == 0 ? false : true)
      }

      let invalid = (!value && isRequired) || numberValidate

      if (invalid) {
        return {
          isInvalid: true,
          message: `Please enter a valid year between 1940 and ${maxYear}. If not applicable, enter 0.`
        }
      }
      return validation
    }

    if (!value && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field. Please enter a value.`
      }
    }

    const field = patterns[type]

    return {
      isInvalid: !field.pattern.test(value),
      message: field.message
    }

  }

}
