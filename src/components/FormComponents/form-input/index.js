import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Col, HelpBlock } from 'react-bootstrap'

import './form-input.scss'

export default class TextInput extends Component {
  static propTypes = {
    field: PT.shape({
      id: PT.string.isRequired,
      name: PT.string,
      type: PT.oneOf(['text', 'number', 'email', 'password', 'date', 'tel', 'link']),
      isRequired: PT.bool,
      label: PT.string,
      placeholder: PT.string,
      value: PT.string,
      validate: PT.bool
    })
  }

  static defaultProps = {
    field: {
      type: 'text',
      isRequired: false,
      value: '',
      validate: false
    }
  }
  
  render () {
    const {
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
        </FormGroup>
    )
  }
}
