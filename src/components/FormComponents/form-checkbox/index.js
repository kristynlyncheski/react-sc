import React, { Component, PropTypes as PT } from 'react'
import classNames from 'classnames'
import { inlineLexer } from 'marked'

import './form-checkbox.scss'

export default class FormCheckbox extends Component {

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
    this.state = { checkboxes: props.options }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value === undefined) { return }

    const values = nextProps.value.split(',')
    this.setState({
      checkboxes: this.state.checkboxes.map(option => {
        const contains = values.find(v => v === option.value)
        option.isChecked = !!contains
        return option
      })
    })
  }

  handleInputChange (event) {
    const targetChecked = event.target.checked
    const { name, onChange } = this.props
    this.setState({
      checkboxes: this.state.checkboxes.map(option => {
        if (option.value == event.target.value) { // string and numbers are possible; using loose equals for (123 == '123')
          option.isChecked = targetChecked
        }
        return option
      })
    }, () => {
      onChange({
        name,
        value: this.getValues()
      })
    })
  }

  renderRequired () {
    const { isRequired } = this.props

    if (isRequired) {
      return (
        <span className='required'>*</span>
      )
    }
    return false
  }

  renderCheckboxes () {
    const { name } = this.props

    return this.state.checkboxes.map((option, i) => {
      const optionId = `${name}-${i}`

      // ischecked need to be a boolean always; otherwise,
      // we get controlled vs uncontrolled react comp warning
      const isChecked = option.isChecked === undefined ? false : option.isChecked

      return (
        <div className='form-checkbox' key={i}>
          <input
            type='checkbox'
            id={optionId}
            name={name}
            value={option.value}
            checked={isChecked}
            onChange={this.handleInputChange} />
          <label htmlFor={optionId} dangerouslySetInnerHTML={{__html: inlineLexer(option.label, [])}} />
          {this.renderRequired()}
        </div>
      )
    })
  }

  render () {
    const { isInline } = this.props
    const validation = this.getValidation()
    const formRowClass = classNames('form-row', 'form-row-checkbox', {
      'inline': isInline,
      'error': validation.isInvalid
    })
    return (
      <div className={formRowClass}>
        {/* {this.renderLabelFor()} */}
        {this.renderCheckboxes()}
        {this.renderConsentMessage()}
        {this.renderValidationMessage(validation)}
      </div>
    )
  }

  renderConsentMessage () {
    if (this.props.name === 'contact-us-opt-in-products') {
      return (
        <p className='consent-message'>(Please note that if you select Yes to the above you may unsubscribe at any time)</p>
      )
    }
  }

  getValues () {
    return this.state.checkboxes.filter(opt => {
      return opt.isChecked
    }).map(opt => {
      return opt.value
    }).join()
  }

  renderValidationMessage (validation) {
    if (validation.isInvalid) {
      return (
        <p className='error-message'>{validation.message}</p>
      )
    }
  }

  getValidation (value) {
    const { isRequired, validate } = this.props
    const validation = { isInvalid: false, message: '' }
    const containsChecked = this.state.checkboxes.find(checkbox => checkbox.isChecked)

    if (validate && !containsChecked && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field.`
      }
    }
    return validation
  }
}
