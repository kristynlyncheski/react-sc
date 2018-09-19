import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { FormGroup } from 'react-bootstrap'

import './form-hidden.scss'

export default class HiddenForm extends Component {
  static propTypes = {
    field: PT.shape({
      id: PT.string.isRequired,
      type: PT.oneOf(['hidden'])
    })
  }
  
  static defaultProps = {
    field: {
      type: 'hidden',
      value: '',
    }
  }

  render () {
    const { id, value } = this.props.field

    return (
      <FormGroup>
          <input type='hidden' name={id} value={value} />
      </FormGroup>
    )
  }
}
