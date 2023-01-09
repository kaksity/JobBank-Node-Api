import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email_address: schema.string([rules.trim(), rules.email()]),
    password: schema.string([rules.trim(), rules.minLength(8)]),
  })
  public messages: CustomMessages = {
    'email_address.required': 'Email Address is required',
    'password.required': 'Password is required',
    'email_address.email': 'Email Address is not valid',
    'password.minLength': 'Password must be at least 8 characters',
  }
}
