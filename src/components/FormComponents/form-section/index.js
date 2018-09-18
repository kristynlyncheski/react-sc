import React, { Component, PropTypes as PT } from 'react'
import { Icon } from 'components'

import './form-section.scss'

export default class FormSection extends Component {

  static propTypes = {
    heading: PT.string,
    collapsible: PT.bool,
    isCollapsed: PT.bool,
    collapseClass: PT.string
  }

  static defaultProps = {
    collapsible: false,
    collapseClass: 'collapsed'
  }

  constructor (props) {
    super(props)
    if (props.collapsible) {
      this.state = { collapsed: false }
    }
    this.onClickLegend = this.onClickLegend.bind(this)
  }

  renderLegendCollapsible () {
    const { collapsible } = this.props

    if (collapsible) {
      if (this.state.collapsed) {
        return (
          <Icon name='large-plus' />
        )
      }
      return (
        <Icon name='large-minus' />
      )
    }
    return false
  }

  getCollapsedClass () {
    const { collapsible, collapseClass } = this.props
    const baseCollapsibleClass = 'collapsible'

    if (collapsible && this.state.collapsed) {
      return ` ${baseCollapsibleClass} ${collapseClass}`
    } else if (collapsible) {
      return ` ${baseCollapsibleClass}`
    }
    return ''
  }

  onClickLegend (e) {
    if (this.props.collapsible) {
      this.setState({ collapsed: !this.state.collapsed })
    }
  }

  render () {
    const { sectionId, address } = this.props
    //TODO: clean up this code
    if (sectionId === 'eeo') {
      if (address && address.countryID === 1){

      } else {
        return <div></div>
      }
    }
    return (
      <div className={'app-form-section ' + sectionId + this.getCollapsedClass()}>
        <fieldset>
          <legend className='form-heading' onClick={this.onClickLegend}>
            <h3>{ this.props.heading }</h3>
            {this.renderLegendCollapsible()}
          </legend>
          { this.props.children }
        </fieldset>
      </div>
    )
  }
}
