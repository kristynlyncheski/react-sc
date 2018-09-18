import React, { Component, PropTypes as PT } from 'react'

// TODO: unclear why webpack alias 'constants' will not resolve this path
import { formTypes } from '../../../constants'
import FormFields from './cms-form-fields'
import FormSectionAdmin from './cms-section-admin'
import { hyphenate } from 'utils/strings'

import {
  Form,
  FormSection,
  Icon,
  Button
} from 'components'

const { SINGLE_LINE_FORM, MULTI_LINE_FORM } = formTypes
// component that takes a form configuration object and
// generates form fields as necessary
//
export default class CMSFormGenerator extends Component {

  static propTypes = {
    config: PT.shape({
      sections: PT.array.isRequired,
      submit_button_label: PT.string
    }).isRequired,
    id: PT.string.isRequired,
    heading: PT.string,
    noGutter: PT.bool,
    hideSubmit: PT.bool,
    hideRequired: PT.bool,
    onSubmit: PT.func,
    submitText: PT.string,
    formType: PT.oneOf([SINGLE_LINE_FORM, MULTI_LINE_FORM]),
    className: PT.string,
    updateAction: PT.func,
    addSectionAction: PT.func,
    removeSectionAction: PT.func,
    collapsible: PT.bool // allows for collapsible form sections
  }

  static defaultProps = {
    formType: MULTI_LINE_FORM,
    noGutter: false,
    hideSubmit: false,
    hideRequired: false,
    submitText: 'Submit',
    collapsible: false,
    updateAction: () => {},
    addSectionAction: () => {},
    removeSectionAction: () => {},
    className: '' // prevents 'undefined from being added as a class'
  }

  constructor (props) {
    super(props)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.state = { additionalFields: [] }
  }

  handleOnSubmit (form) {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(form)
    }
  }

  getFormType () {
    // todo: may need better type checking here.
    if (this.props.config.sections[0].fields[0].form_fields.length < 2) {
      return SINGLE_LINE_FORM
    }
    return MULTI_LINE_FORM
  }

  render () {
    const {
      address, id, config, noGutter, hideSubmit, gtmName,
      hideRequired, className, actionNameSpace, formState,
      dispatch, updateAction, addSectionAction, removeSectionAction
    } = this.props

    return (
      <Form
        id={id}
        className={className}
        formType={this.getFormType()}
        onSubmit={this.handleOnSubmit}
        submitText={config.submit_button_label || this.props.submitText}
        hideRequired={hideRequired}
        hideSubmit={hideSubmit}
        noGutter={noGutter}
        formState={formState}
        generated
        gtmName={gtmName}>
        {config.sections.map((section, i) => {
          const { heading, allow_multiple, section_id, fields } = section
          return (
            <FormSection
              key={i}
              heading={heading}
              submitText={config.submit_button_label}
              sectionId={section_id}
              address={address}
              {...this.props}>
              <FormFields
                updateAction={data => dispatch(updateAction(data))}
                addAction={data => dispatch(addSectionAction(data))}
                removeAction={data => dispatch(removeSectionAction(data))}
                validate={this.shouldValidate()}
                heading={heading}
                sectionId={section_id}
                fieldConfig={fields[0]}
                allowMultiple={allow_multiple}
                sectionState={this.getSectionState(section_id)}
                dispatch={dispatch} />
            </FormSection>
          )
        })}
        {this.props.children}
        {this.renderAdditional()}
      </Form>
    )
  }

  shouldValidate () {
    const { formState } = this.props
    if (formState) {
      return (formState.submitting || formState.containsErrors)
    }
    return false
  }

  renderAdditional () {
    // todo: add additional/supplimentary form rendering here
    const { config, updateAction, dispatch } = this.props
    if (config.additional) {
      return config.additional.map((item, i) => {
        const { section_id, fields } = item
        return (
          <FormFields
            key={i}
            updateAction={data => dispatch(updateAction(data))}
            sectionId={section_id}
            fieldConfig={fields[0]}
            sectionState={this.getSectionState(section_id)}
            validate={this.shouldValidate()} />
        )
      })
    }
    return false
  }

  getSectionState (section_id = '') {
    const { formState } = this.props
    if (section_id) {
      const sectionState = formState.data[section_id]
      if (sectionState && typeof sectionState === 'object') {
        return sectionState
      }
    }
    return formState ? formState.data : null
  }
}
