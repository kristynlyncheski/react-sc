import React, { Component, PropTypes as PT } from 'react'
import Select from 'react-select'
import classNames from 'classnames'
import getFormControl from '../form/cms-form-control-map'
import { hyphenate } from 'utils/strings'

import './form-select.scss'

export default class FormSelect extends Component {

  static propTypes = {
    id: PT.string.isRequired,
    options: PT.array.isRequired,
    isRequired: PT.bool,
    name: PT.string,
    onChange: PT.func,
    validate: PT.bool
  }

  static defaultProps = {
    multi: false,
    clearable: false,
    searchable: false,
    options: [],
    isRequired: false,
    onChange: () => {},
    validate: false
  }

  constructor (props) {
    super(props)
    const defaultLabel = this.props.placeholder || this.props.options[0].label
    const defaultValue = (!this.props.placeholder) ? this.props.options[0].value : null
    this.state = {
      label: defaultLabel,
      value: defaultValue,
      dependent: false,
      name: this.props.id
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.alphabetize = this.alphabetize.bind(this)
  }

  handleSelect (option) {
    const { multi, onChange, id } = this.props
    const data = {
      name: id
    }

    if (multi) {
      data.value = option.map(opt => opt.value).join()
    } else {
      if (option.value !== option.label) {
        data.label = option.label
      }
      data.value = option.value
      data.dependent = option.dependent
    }

    this.setState(data, () => onChange(data))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      label: nextProps.placeholder
    })
  }

  renderLabelFor () {
    const { label, id, isRequired } = this.props


    const renderLabel = () => {
      switch (id) {
        case 'gender':
        case 'ethnicity':
        case 'veteran':
          return `<span>${label}</span>`
        default:
          return label
      }
    }

    if (id === 'gender' || id === 'ethnicity' || id === 'veteran') {

    }

    if (label) {
      const required = isRequired ? '<span class="required">*</span> ': ''
      return (
        <label
          htmlFor={id}
          dangerouslySetInnerHTML={{__html: renderLabel() + required}} />
      )
    }
    return false
  }

  alphabetize(a, b) {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  }

  sortOptions(options) {
    const doNotAlphabetize = ['select-regulations', 'contact-form-selection', 'select-locations', 'category', 'ethnicity', 'gender', 'veteran', 'select-legal-page', 'select-faq-page', 'select-brand-guidelines-page']

    if (doNotAlphabetize.indexOf(this.props.id) > -1) {
      return options
    }
    return options.sort(this.alphabetize)
  }

  render () {
    const { id, name, options, multi, clearable, searchable, isInline } = this.props
    const validation = this.getValidation()
    const selectName = name || id
    const formRowClass = classNames('form-row', {
      'inline': isInline,
      'error': validation.isInvalid
    })

    return (
      <div className={formRowClass}>
        {this.renderLabelFor()}
        <Select
          className='form-select'
          name={selectName}
          instanceId={id}
          value={this.state.value}
          onChange={this.handleSelect}
          options={this.sortOptions(options)}
          multi={multi}
          clearable={clearable}
          searchable={searchable}
          placeholder={this.state.label} />
          {this.renderValidationMessage(validation)}
        {this.renderDependent()}
      </div>
    )
  }

  renderValidationMessage(validation) {
    if (validation.isInvalid) {
      return (
        <p className='error-message'>{validation.message}</p>
      )
    }
  }

  getValidation (value) {
    const { isRequired, validate, label } = this.props
    const validation = { isInvalid: false, message: '' }
    const testValue = value ? value : this.props.value

    if (validate && !testValue && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field. Please select a value.`
      }
    }
    return validation
  }

  extractComponentState (form_field_id) {
    const { sectionState } = this.props
    if (!sectionState) { return '' }

    return sectionState[form_field_id]
  }

}
