import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSkillSetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    skill_identifier: schema.string([rules.trim()]),
  })

  public messages: CustomMessages = {
    'skill_identifier.required': 'Skill is required',
  }
}
