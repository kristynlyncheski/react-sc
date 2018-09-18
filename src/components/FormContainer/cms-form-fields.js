import React, { Component, PropTypes as PT } from 'react'
import getFormControl from './cms-form-control-map'
import formSectionDecorator from './cms-section-admin'

import { Button, FormSelect } from 'components'

class FormFields extends Component {

  static propTypes = {
    fieldConfig: PT.object.isRequired,
    updateAction: PT.func,
    contentTypes: PT.oneOfType([PT.array, PT.object]),
    sectionState: PT.oneOfType([PT.array, PT.object]),
    value: PT.any
  }

  static defaultProps = {
    updateAction: () => {},
    sectionState: {}
  }

  constructor (props) {
    super(props)
    // this.state = {
    //   renderDependent: false
    // }

    this.onChange = this.onChange.bind(this)
  }

  render () {
    const { fieldConfig, contentTypes } = this.props

    const {form_fields} = fieldConfig

    return (
      <div className='form-column'>
        { fieldConfig.form_fields.map((field, i) => {
          const {
            form_field_id,
            field_label,
            field_contents,
            is_required,
            is_inline,
            max_characters
          } = field
          const typeFieldDefined = Array.isArray(field.field_type) && field.field_type.length
          const type = typeFieldDefined ? field.field_type[0].title : false
          const { Component, additionalProps } = getFormControl(type, field, contentTypes)
          const componentValue = this.extractComponentState(form_field_id)

          if (!Component || !type) { return false }
          return (
            <Component
              key={i}
              type={type}
              id={form_field_id}
              name={form_field_id}
              label={field_label}
              value={componentValue}
              placeholder={field_contents}
              onChange={this.onChange}
              isRequired={is_required}
              isInline={is_inline}
              maxLength={max_characters}
              {...additionalProps}
              {...this.props} />
          )
        }).filter(component => component) }
        {/*this.renderDependent()*/}
      </div>
    )
  }

  // renderDependent() {
  //   const { contentTypes } = this.props
  //   const field = this.state.renderDependent
  //
  //   if (field) {
  //     const { field_content, field_label, form_field_id, list_or_options } = field
  //     const componentValue = this.extractComponentState(form_field_id)
  //     const type = 'select-list'
  //     const { additionalProps } = getFormControl(type, field, contentTypes)
  //
  //     return (
  //       <FormSelect
  //         type={type}
  //         id={form_field_id}
  //         name={form_field_id}
  //         label={field_label}
  //         value={componentValue}
  //         placeholder={field_content}
  //         onChange={this.onChange}
  //         dependentField
  //         {...additionalProps}
  //         {...this.props} />
  //     )
  //   }
  // }

  extractComponentState (form_field_id) {
    const { sectionState } = this.props
    if (!sectionState) { return '' }

    return sectionState[form_field_id]
  }

  onChange(inputState) {
    this.props.updateAction(inputState)

    // if (!inputState.hasDependent) {
    //   this.setState({
    //     renderDependent: inputState.dependentFields
    //   })
    // }
  }

}

export default formSectionDecorator(FormFields)
