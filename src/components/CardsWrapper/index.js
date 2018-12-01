import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import Card from '../Card'

import './CardsWrapper.css'

export default class CardsWrapper extends Component {

    render () {
        const classNames = this.props.hidden ? 'hide' : '';

        return (
            <div id='card-wrapper' className={classNames}>
                {this.props.data.map((item, i) => {
                    return (
                        <Card
                            {...this.props}
                            key={i}
                            data={item} />
                    )
                })}
            </div>
        )
    }
}