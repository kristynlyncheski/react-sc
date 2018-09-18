import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import classNames from 'classnames'

import './form-hidden.scss'

export default class HiddenForm extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    id: PT.string.isRequired,
    name: PT.string,
    type: PT.oneOf(['hidden']),
    label: PT.string,
    value: PT.string,
  }

  static defaultProps = {
    type: 'text',
    value: '',
  }

  getInputName () {
    const { name, id } = this.props
    return name || id
  }

  render () {
    const { id, type, isInline, value } = this.props

    return (
      <input
        id={id}
        name={this.getInputName()}
        type='hidden'
        value={value} />
    )
  }
}
