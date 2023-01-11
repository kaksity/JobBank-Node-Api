import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWorkExperienceValidator {
  constructor(protected ctx: HttpContextContract) {}
  public refs = schema.refs({
    isCurrentWork: ['Yes', 'No'],
  })
  public schema = schema.create({
    job_title: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
    organization: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }),
    end_date: schema.date.nullable({ format: 'yyyy-MM-dd' }),
    is_current_work: schema.enum(this.refs.isCurrentWork),
    additional_info: schema.string.nullable([
      rules.trim(),
      rules.minLength(3),
      rules.maxLength(200),
    ]),
    job_description: schema.string([rules.trim(), rules.minLength(3), rules.maxLength(200)]),
  })

  public messages: CustomMessages = {
    'job_title.required': 'Job Title is required',
    'job_title.minLength': 'Job Title must be at least 3 characters',
    'job_title.maxLength': 'Job Title must be less than 200 characters',
    'organization.required': 'Organization is required',
    'organization.minLength': 'Organization must be at least 3 characters',
    'organization.maxLength': 'Organization must be less than 200 characters',
    'start_date.required': 'Start Date is required',
    'start_date.format': 'Start Date format is not valid',
    'end_date.required': 'End Date is required',
    'end_date.nullable': 'End Date should be set to null if not required',
    'end_date.format': 'Start Date format is not valid',
    'is_current_work.required': 'Is Current Work is required',
    'is_current_work.enum': 'Is Current Work option is not valid',
    'additional_info.required': 'Additional Information is required',
    'additional_info.nullable': 'Additional Information should be set to null if not required',
    'additional_info.minLength': 'Additional Information must be at least 3 characters',
    'additional_info.maxLength': 'Additional Information must be less than 200 characters',
    'job_description.required': 'Job Description is required',
    'job_description.minLength': 'Job Description must be at least 3 characters',
    'job_description.maxLength': 'Job Description must be less than 200 characters',
  }
}
