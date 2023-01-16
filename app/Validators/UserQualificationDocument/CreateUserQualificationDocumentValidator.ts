import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserQualificationDocumentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    'education_level_identifier': schema.string([ rules.trim() ]),
    'file': schema.file()
  })

  public messages: CustomMessages = {
    'education_level_identifier.required': 'Education Level is required',
    'file.required': 'Qualification Document file is required',
    'file.file': 'Qualification Document file is not valid'
  }
}
