import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/V1/User/Auth/RegisterValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)
    response.created({
      success: true,
      message: 'User Account was created successfully',
    })
  }
}
