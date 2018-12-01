import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'

import './Card.css'

export default class Card extends Component {
    static propTypes = {
        header: PT.string,
        formfields: PT.array
    }
    
    static defaultProps = {
        header: 'Placeholder Header',
    }

    constructor(props, context) {
        super(props, context)
    }

    renderHeader() {
        return this.props.renderCardHeading(this.props.data);
    }

    renderBody() {
        return this.props.renderCardBody(this.props.data);
    }

    render () {
        return (
            <div className='item col-xs-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='card panel panel-default'>
                    {this.renderHeader()}
                    {this.renderBody()}
                </div>
            </div>
        )
    }
}