import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import './ModalContainer.css'

export default class ModalContainer extends Component {
    static propTypes = {
        header: PT.string,
        formfields: PT.array
    }
    
    static defaultProps = {
        header: 'Placeholder Header',
    }

    constructor(props, context) {
        super(props, context)
    
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    
        this.state = {
            show: false
        }
    }
    
    handleClose() {
        this.setState({ show: false })
    }

    handleShow() {
        this.setState({ show: true })
    }
    

    renderHeader() {
        const { header } = this.props

        return (
            <Modal.Header>
                <button className='close' onClick={this.handleClose} data-dismiss='modal' type='button'>
                    <span aria-hidden='true'>&times</span>
                    <span className='sr-only'>Close</span>
                </button>
                <Modal.Title>
                    {header}
                </Modal.Title>
            </Modal.Header>
        )
    }

    renderBody() {
        const { children } = this.props

        return (
            <Modal.Body>
                {children}
            </Modal.Body>
        )
    }

    render () {
        return (
            <div className='static-modal'>
                <Button bsStyle='primary' bsSize='large' onClick={this.handleShow}>
                    Launch modal
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    {this.renderHeader()}
                    {this.renderBody()}
                    {/*<Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>*/}
                </Modal>
            </div>
        )
    }
}