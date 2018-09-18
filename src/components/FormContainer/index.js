import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Col, Button, HelpBlock } from 'react-bootstrap'
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


        //     if (type === 'hidden') {
        //         return (
        //             <FormGroup key={i}>
        //                 <input type='hidden' name={id} value={value} />
        //             </FormGroup>
        //         )
        //     }

        //     if (type === 'file') {
        //         return (
        //             <FormGroup key={i} controlId={id}>
        //                 <Col componentClass={ControlLabel} sm={inline ? 3 : 12} >
        //                     {label}
        //                 </Col>
        //                 <Col sm={inline ? 9 : 12} >
        //                     <FormControl type='file' name={id} placeholder='Select File' id={id} className='form-control filestyle' tabIndex='-1' style={{position: 'absolute', clip: 'rect(0px, 0px, 0px, 0px)'}} />
        //                     <div className='bootstrap-filestyle input-group'>
        //                         <span className='group-span-filestyle input-group-btn' tabIndex='0'>
        //                             <label htmlFor={id} className='btn btn-default '>
        //                                 <span className='icon-span-filestyle glyphicon glyphicon-folder-open'></span>
        //                                 <span className='buttonText'>{buttonText}</span>
        //                             </label>
        //                         </span>
        //                         <input type='text' className='form-control ' placeholder='' disabled='' />
        //                     </div>
        //                 </Col>
        //             </FormGroup>
        //         )
        //     }

        //     if (type === 'text') {
        //         return (
        //             <FormGroup key={i} controlId={id}>
        //                 <Col sm={inline ? 3 : 12} componentClass={ControlLabel}>
        //                     {label}
        //                 </Col>
        //                 <Col sm={inline ? 9 : 12}>
        //                     <FormControl type='text' name={id} placeholder={placeholder} id={id} />
        //                 </Col>
        //                 {help && <HelpBlock>{help}</HelpBlock>}
        //             </FormGroup>
        //         )
        //     }

        //     return <div>New Input</div>
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