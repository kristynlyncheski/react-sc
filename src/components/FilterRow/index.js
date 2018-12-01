import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

import './FilterRow.css'

export default class FilterRow extends Component {
    static propTypes = {
        header: PT.string,
        formfields: PT.array
    }
    
    static defaultProps = {
        header: 'Placeholder Header',
    }

    constructor(props, context) {
        super(props, context)

        this.onToggleView = this.onToggleView.bind(this);
    }

    onToggleView (value) {
        this.props.onToggleView(value);
    }

    renderCount() {
        return (
            <h4 id="recordCount"><span>341</span> Records Found</h4>
        )
    }

    renderViewToggle() {
        return (
            <ToggleButtonGroup type='radio' name='view-options' defaultValue='card' onChange={this.onToggleView}>
                <ToggleButton value='card'>Card</ToggleButton>
                <ToggleButton value='list'>List</ToggleButton>
            </ToggleButtonGroup>
        )
    }

    render () {
        return (
            <div id="panelHeading" className="panel-heading clearfix">
                <div className="pull-left">
                    {this.renderViewToggle()}
                    {this.renderCount()}
                </div>
                <div id="actions" className="pull-right hidden-print">
                Filters &amp; Exports
                </div>
            </div>
        )
    }
}