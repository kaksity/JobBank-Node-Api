import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    first_name: schema.string([rules.trim(), rules.minLength(3)]),
    last_name: schema.string([rules.trim(), rules.minLength(3)]),
    email_address: schema.string([rules.trim(), rules.email()]),
    phone_number: schema.string([rules.trim(), rules.minLength(10)]),
    password: schema.string([rules.trim(), rules.minLength(8), rules.confirmed()]),
    password_confirmation: schema.string([rules.trim()]),
  })
  public messages: CustomMessages = {
    'first_name.required': 'First Name is required',
    'last_name.required': 'Last Name is required',
    'email_address.required': 'Email Address is required',
    'phone_number.required': 'Phone Number is required',
    'password.required': 'Password is required',
    'password_confirmation.required': 'Confirm Password is required',
    'first_name.minLength': 'First Name must be at least 3 characters',
    'last_name.minLength': 'Last Name must be at least 3 characters',
    'email_address.email': 'Email Address is not valid',
    'phone_number.minLength': 'Phone Number must be at least 10 characters',
    'password.minLength': 'Password must be at least 8 characters',
    'password_confirmation.confirmed': 'Confirm password must match password',
  }
}
