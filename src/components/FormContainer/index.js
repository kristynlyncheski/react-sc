import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import getFormControl from './form-control-map'

import './FormContainer.css'

export default class FormContainer extends Component {

    renderFormGroups(form) {
        return form.fields.map((field, i) => {
            const { type } = field

            const { Component, additionalProps } = getFormControl(type, field)

            if (!Component || !type) { return false }
            
            return (
              <Component
                key={i}
                field={field}
                {...additionalProps} />
            )

            return <div>New Input</div>
        })
    }

    render () {
        return (
            <form className='form-horizontal' method='post' id='uploadForm' action='/ajax/file_upload.json' encType='multipart/form-data'>
                {this.renderFormGroups(this.props.form)}
                <Button 
                    bsStyle='primary' 
                    className='pull-right' 
                    dangerouslySetInnerHTML={{__html: this.props.form.submitText}} 
                    id='uploadButton' 
                    type='submit'
                />
            </form>
        )
    }
}