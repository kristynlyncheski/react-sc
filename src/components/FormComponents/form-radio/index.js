import React, { Component, PropTypes as PT } from 'react'
import classNames from 'classnames'

import './form-radio.scss'

export default class FormRadio extends Component {

  static propTypes = {
    name: PT.string.isRequired,
    options: PT.array.isRequired,
    isRequired: PT.bool,
    onChange: PT.func,
    label: PT.string
  }

  static defaultProps = {
    options: [],
    isRequired: false,
    onChange: () => {}
  }

  constructor (props) {
    super(props)
    this.state = { radios: props.options }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.updateComponentStateValue(nextProps.value)
  }

  updateComponentStateValue (value, cb) {
    this.setState({
      radios: this.state.radios.map(opt => {
        if (opt.value === value) {
          opt.isChecked = true
        } else {
          opt.isChecked = false
        }
        return opt
      })
    }, () => {
      if (cb && typeof cb === 'function') {
        cb()
      }
    })
  }

  handleInputChange (event) {
    const { target } = event
    const value = (() => {
      if (target.checked) {
        if (target.value.indexOf('True') > -1) {
          return true
        }
        if (target.value.indexOf('False') > -1) {
          return false
        }
        return target.value
      }
      return false
    })()

    const data = {
      name: target.name,
      value
    }

    this.updateComponentStateValue(value, () => {
      this.props.onChange(data)
    })
  }

  renderLabelFor () {
    const { label, isRequired } = this.props
    if (label) {
      return (
        <div className='form-label'>
          {label}
          {isRequired ? <span className='required'>*</span> : false}
        </div>
      )
    }
    return false
  }

  renderRadioButtons () {
    const { name } = this.props

    return this.state.radios.map((option, i) => {
      const optionId = `${name}-${i}`

      // ischecked need to be a boolean always; otherwise,
      // we get controlled vs uncontrolled react comp warning
      const isChecked = option.isChecked === undefined ? false : option.isChecked

      return (
        <div className='form-radio' key={i}>
          <input
            type='radio'
            id={optionId}
            name={name}
            value={option.value}
            checked={isChecked}
            onChange={this.handleInputChange} />
          <label htmlFor={optionId}>{option.label}</label>
        </div>
      )
    })
  }

  render () {
    const { isInline } = this.props
    const validation = this.getValidation()
    const formRowClass = classNames('form-row', {
      'inline': isInline,
      'error': validation.isInvalid
    })
    return (
      <div className={formRowClass}>
        {this.renderLabelFor()}
        {this.renderRadioButtons()}
        {this.renderValidationMessage(validation)}
      </div>
    )
  }

  renderValidationMessage (validation) {
    if (validation.isInvalid) {
      return (
        <p className='error-message'>{validation.message}</p>
      )
    }
  }

  getValidation (value) {
    const { isRequired, validate, label } = this.props
    const validation = { isInvalid: false, message: '' }
    const containsChecked = this.state.radios.find(radio => radio.isChecked)

    if (validate && !containsChecked && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field. Please select a value.`
      }
    }
    return validation
  }

}
