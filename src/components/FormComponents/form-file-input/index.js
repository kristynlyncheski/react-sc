import React, { Component, PropTypes as PT } from 'react'
import classNames from 'classnames'
import { parseResume } from 'actions/app-form'
import './form-file-input.scss'

var FileInput = require('react-file-input')

const { fetch } = require('fetch-ponyfill')()


export default class FormFileInput extends Component {

  constructor (props) {
    super(props)
    this.state = {
      sizeSmallError: false,
      sizeLargeError: false,
      typeError: false,
      fileUploaded: false
    }
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  static propTypes = {
    id: PT.string.isRequired,
    name: PT.string,
    isRequired: PT.bool,
    label: PT.string,
    placeholder: PT.string,
    onChange: PT.func,
    validate: PT.bool
  }

  static defaultProps = {
    isRequired: false,
    onChange: () => {},
    validate: false
  }

  renderLabelFor () {
    const { label, id, isRequired } = this.props
    if (label) {
      return (
        <label htmlFor={id}>
          {label}
          {isRequired ? <span className='required'>*</span> : false}
          <br />
          <span>Accepted files: .pdf, .txt, .doc, .docx, .html, .rtf. Max size 20MB.</span>
        </label>
      )
    }
    return false
  }

  onChangeValue (e) {
    const { onChange, name, type, dispatch } = this.props

    let file = e.target.files[0]
    let reader = new FileReader()

    this.setState({
      fileUploaded: true
    })

    // file can't be larger than 20MB, must be larger than 0 bytes
    if (file && file.size > 20000000) {
      this.setState({
        sizeLargeError: true,
        sizeSmallError: false
      })
    } else if (file && file.size <= 0) {
      this.setState({
        sizeSmallError: true,
        sizeLargeError: false
      })
    } else {
      this.setState({
        sizeSmallError: false,
        sizeLargeError: false
      })
    }

    // check file type
    const validFileTypes = ['text/plain', 'text/html', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf']

    if (file && validFileTypes.indexOf(file.type) === -1) {
      this.setState({
        typeError: true
      })
    } else {
      this.setState({
        typeError: false
      })
    }

    if (!file) {
      this.props.onChange({
        name,
        value: null,
        invalid: this.getValidation(file).isInvalid
      })
    }

    if (file) {
      reader.onloadend = () => {
        this.props.onChange({
          name,
          value: file,
          invalid: this.getValidation(file).isInvalid
        })
      }

      if (name === 'resume') {
        dispatch(parseResume(file))
      }

      reader.readAsDataURL(file)
    }
  }

  render () {
    const { name, id, type, isRequired, isInline, placeholder, validate } = this.props
    const formName = name || id
    const validation = this.getValidation()
    const formRowClass = classNames('form-row', {
      'inline': isInline,
      'error': validate && validation.isInvalid
    })

    return (
      <div className={formRowClass}>
        {this.renderLabelFor()}
        <FileInput
          id={id}
          name={formName}
          required={isRequired}
          placeholder='Choose file...'
          className='file-input'
          onChange={this.onChangeValue} />
        {/*<div className='file-upload-button'>Choose file</div>*/}
        {this.renderValidationMessage(validation)}
      </div>
    )
  }

  renderValidationMessage(validation) {
    if (this.state.fileUploaded && validation.isInvalid) {
      return (
        <p className='error-message'>{validation.message}</p>
      )
    }
  }

  getValidation (value) {
    const { type, isRequired, validate, label } = this.props
    const validation = { isInvalid: false, message: '' }
    const testValue = value ? value : this.props.value

    if (!testValue && isRequired) {
      return {
        isInvalid: true,
        message: `This is a required field. Please select a valid file.`
      }
    }

    if (this.state.sizeLargeError) {
      return {
        isInvalid: true,
        message: `File size should be less than 20MB.`
      }
    }

    if (this.state.sizeSmallError) {
      return {
        isInvalid: true,
        message: `File cannot be zero bytes.`
      }
    }

    if (this.state.typeError) {
      return {
        isInvalid: true,
        message: `Invalid file type. Please upload a .txt, .doc, .pdf, .html, or .rtf file.`
      }
    }

    return validation
  }

}
//
// <input
//   id={id}
//   name={formName}
//   type={type}
//   required={isRequired}
//   placeholder={placeholder}
//   onChange={this.onChangeValue} />
