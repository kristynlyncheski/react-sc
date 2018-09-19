import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'

import './form-file-input.scss'

export default class FormFileInput extends Component {

  static propTypes = {
    field: PT.shape({
      id: PT.string.isRequired,
      name: PT.string,
      isRequired: PT.bool,
      isInline: PT.bool,
      label: PT.string,
      placeholder: PT.string,
    })
  }

  static defaultProps = {
    field: {
      type: 'file',
      isRequired: false,
      isInline: false,
      value: '',
      placeholder: 'Select file'
    }
  }
  
  render () {
    const { 
      id,
      isRequired,
      isInline,
      placeholder,
      buttonText,
      label
    } = this.props.field
    
    return (
        <FormGroup controlId={id}>
          <Col componentClass={ControlLabel} sm={isInline ? 3 : 12} >
              {label}
          </Col>
          <Col sm={isInline ? 9 : 12} >
            <FormControl type='file' name={id} placeholder={placeholder} id={id} className='form-control filestyle' tabIndex='-1' style={{position: 'absolute', clip: 'rect(0px, 0px, 0px, 0px)'}} />
              <div className='bootstrap-filestyle input-group'>
                  <span className='group-span-filestyle input-group-btn' tabIndex='0'>
                      <label htmlFor={id} className='btn btn-default '>
                          <span className='icon-span-filestyle glyphicon glyphicon-folder-open'></span>
                          <span className='buttonText'>{buttonText}</span>
                      </label>
                  </span>
                  <input type='text' className='form-control ' placeholder='' disabled='' />
              </div>
          </Col>
      </FormGroup>
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


// (
//     <FileInput
//       id={id}
//       name={formName}
//       required={isRequired}
//       placeholder='Choose file...'
//       className='file-input'
//       onChange={this.onChangeValue} />
//     {/*<div className='file-upload-button'>Choose file</div>*/}
//     {/*this.renderValidationMessage(validation)*/}
//   </div>
// )
