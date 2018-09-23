import React, { Component } from 'react'
import { Panel, PanelGroup } from 'react-bootstrap'
import ModalContainer from '../../components/ModalContainer'
import FormContainer from '../../components/FormContainer'

import './TaskModal.css'

export default class TaskModal extends Component {

    renderFormPanels(form, i) {
        return (
            <Panel key={i} eventKey={i}>
                <Panel.Heading>
                    <Panel.Title toggle className='panel-title-toggle'>
                        <h4>{form.title}</h4>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse id='fileUpload'>
                    <Panel.Body>
                        <FormContainer form={form} />
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        )
    }

    render () {
        const forms = [{
            title: 'Upload New File 2',
            submitText: '<i class="fa fa-upload"></i> Upload',
            collapsed: false,
            fields: [{
                type: 'hidden',
                id: 'rec',
                value: "<?=$_GET['id']?>"
            },{
                type: 'file',
                id: 'uploadfile',
                label: 'Select File',
                placeholder: 'Optional',
                buttonText: 'Choose file',
                isInline: true,
                isRequired: true
            }, {
                type: 'text',
                id: 'fname',
                label: 'Friendly Name',
                placeholder: 'Optional',
                isInline: true
            }, {
                type: 'text',
                id: 'descrip',
                label: 'File Description',
                placeholder: 'Optional',
                isInline: true
            }]
        }, {
            title: 'Recent Uploads',
            submitText: '<i class="fa fa-link"></i> Attach',
            collapsed: true,
            fields: [{
                type: 'file',
                id: 'uploadFileField',
                label: 'Select File',
                placeholder: 'Optional',
                buttonText: 'Choose file',
                isInline: true
            }, {
                type: 'text',
                id: 'fname',
                label: 'Friendly Name',
                placeholder: 'Optional',
                isInline: true
            }, {
                type: 'text',
                id: 'descrip',
                label: 'File Description',
                placeholder: 'Optional',
                isInline: true
            }]
        }]

        return (
            <ModalContainer header='Create Task' forms={forms}>
                <PanelGroup 
                    accordion={true} 
                    defaultActiveKey={0} 
                    id='fileChoices'>
                    {forms.map((form, i) => {
                        return this.renderFormPanels(form, i)
                    })}
                </PanelGroup>
            </ModalContainer>
        )
    }
}