import React from 'react'
import FormInput from '../FormComponents/form-input'
// import FormFileInput from '../FormComponents/form-file-input'
// import FormTextarea from '../FormComponents/form-textarea'
// import FormSelect from '../FormComponents/form-select'
// import FormCheckbox from '../FormComponents/form-checkbox'
// import FormRadio from '../FormComponents/form-radio'
// import FormParagraph from '../FormComponents/form-paragraph'
import FormHidden from '../FormComponents/form-hidden'

// const getOptions = (field, contentTypes = null) => {

//   const { list_or_options, content_type } = field

//   const list = list_or_options[0]

//   if (list) {
//     return list.list_item.map(item => ({
//       label: item.display_value,
//       value: item.data_value || item.display_value,
//       dependent: item.dependent_fields && item.dependent_fields.form_field_id ? item.dependent_fields : false,
//       disabled: item.category_title
//     }))
//   } else if (content_type && contentTypes) {
//     return contentTypes[content_type].map(item => ({
//       label: item.title,
//       value: item.title
//     }))
//   }
//   return [{
//     label: field.field_label,
//     value: field.form_field_id
//   }]
// }

const getFormControl = (type, field) => {
  if (type.typeof === 'string') {
    type = type.toLowerCase()
  }
  let Component = null
  let additionalProps = {}
  switch (type) {
    case 'text':
    case 'email':
    case 'date':
    case 'tel':
    case 'number':
    case 'link':
      Component = FormInput
      break
    case 'file':
      Component = FormInput
    //   Component = FormFileInput
      break
    case 'text-area':
    Component = FormInput
    //   Component = FormTextarea
      break
    case 'select-list':
    //   Component = FormSelect
    //   additionalProps = {
    //     clearable: false,
    //     searchable: false,
    //     // options: getOptions(field, contentTypes)
    //   }
    Component = FormInput

      break
    case 'select-list-multi':
    //   Component = FormSelect
    //   additionalProps = {
    //     clearable: false,
    //     searchable: true,
    //     multi: true,
    //     // options: getOptions(field, contentTypes)
    //   }
    Component = FormInput

      break
    case 'checkbox':
    //   Component = FormCheckbox
    //   additionalProps = {
    //     name: field.form_field_id,
    //     // options: getOptions(field, contentTypes)
    //   }
    Component = FormInput

      break
    case 'radio':
    //   Component = FormRadio
    //   additionalProps = {
    //     name: field.form_field_id,
    //     // options: getOptions(field, contentTypes)
    //   }
    Component = FormInput

      break
    case 'hidden':
      Component = FormHidden
      additionalProps = {
        name: field.id,
        value: field.value
      }
      break
    case 'none':
    //   Component = FormParagraph
      break

    default:
  }
  return { Component, additionalProps }
}

export default getFormControl
