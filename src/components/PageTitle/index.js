import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'

import './PageTitle.css'

export default class PageTitle extends Component {
    static propTypes = {
        category: PT.string,
        subcategory: PT.string,
        icon: PT.string
    }
    
    static defaultProps = {
        category: 'Assets',
        subategory: 'Pools',
        icon: 'apple'
    }

    render () {
        return (
            <h4 id='pageTitle' className='page-title txt-color-blueDark'>
                {/* TODO: This icon will not be a fontawesome icon */}
                <i className={`fa fa-${this.props.icon}`}></i> {this.props.category} <i className='fa fa-angle-right'></i> {this.props.subcategory}
            </h4>
        )
    }
}