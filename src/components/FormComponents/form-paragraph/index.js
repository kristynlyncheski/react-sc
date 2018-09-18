import React, { Component, PropTypes as PT } from 'react'
import classNames from 'classnames'
import { inlineLexer } from 'marked'

import './form-paragraph.scss'

export default class Paragraph extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    id: PT.string.isRequired,
    name: PT.string,
    isRequired: PT.bool,
    value: PT.string
  }

  static defaultProps = {
    type: 'none',
    value: '',
  }

  renderParagraph () {
    const { label, id } = this.props
    if (label) {
      return (
        <div className='form-paragraph' dangerouslySetInnerHTML={{__html: inlineLexer(label, [])}} />
      )
    }
    return false
  }

  render () {
    const { id, type, isInline, placeholder, value } = this.props
    const formRowClass = classNames('form-row', {
      'inline': isInline
    })

    return (
      <div className={formRowClass}>
        {this.renderParagraph()}
      </div>
    )
  }
}
