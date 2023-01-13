import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserEducationValidator {
  public refs = schema.refs({
    isCompleted: ['Yes', 'No']
  })
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    school_name: schema.string([ rules.trim(), rules.minLength(3), rules.maxLength(200) ]),
    course_name: schema.string([ rules.trim(), rules.minLength(3), rules.maxLength(200) ]),
    grade: schema.string([ rules.trim(), rules.minLength(3), rules.maxLength(200) ]),
    education_level_identifier: schema.string([ rules.trim() ]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }),
    end_date: schema.date.nullable({ format: 'yyyy-MM-dd' }),
    is_completed: schema.enum(this.refs.isCompleted),
    additional_info: schema.string.nullable([rules.trim(), rules.minLength(3), rules.maxLength(200)])
  })
  public messages: CustomMessages = {
    'school_name.required': 'School Name is required',
    'school_name.minLength': 'School Name must be at least 3 characters',
    'school_name.maxLength': 'School Name must be less than 200 characters',
    'course_name.required': 'Course Name is required',
    'course_name.minLength': 'Course Name must be at least 3 characters',
    'course_name.maxLength': 'Course Name must be less than 200 characters',
    'grade.required': 'Grade is required',
    'grade.minLength': 'Grade must be at least 3 characters',
    'grade.maxLength': 'Grade must be less than 200 characters',
    'start_date.required': 'Start Date is required',
    'start_date.format': 'Start Date format is not valid',
    'end_date.required': 'End Date is required',
    'end_date.format': 'End Date format is not valid',
    'is_completed.required': 'Completion status is required',
    'is_completed.enum': 'Completion status is not valid',
    'additional_info.required': 'Additional Information is required',
    'additional_info.minLength': 'Additional Information must be at least 3 characters',
    'additional_info.maxLength': 'Additional Information must be less than 200 characters',
    'education_level_identifier.required': 'Education Level is required'
  }
}
