import { inject } from '@adonisjs/core/build/standalone'
import {
  USER_DOES_NOT_EXIST,
  USER_ACCOUNT_NOT_ACTIVE,
  USER_ACCOUNT_LOGGED_IN,
} from 'App/Helpers/GeneralPurpose/CustomMessages/UserMessages'
import UserService from 'App/Services/UserService'
import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/V1/User/Auth/LoginValidator'
import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import NotFoundException from 'App/Exceptions/NotFoundException'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Hash from '@ioc:Adonis/Core/Hash'

@inject()
export default class AuthController {
  constructor(private userService: UserService) {}

  public async login({ request, response, auth }: HttpContextContract) {
    await request.validate(LoginValidator)

    const { email_address: emailAddress, password } = request.body()

    const user = await this.userService.getUserByEmailAddress(emailAddress)

    if (user === NULL_OBJECT) {
      throw new NotFoundException(USER_DOES_NOT_EXIST)
    }
    if ((await Hash.verify(user.password, password)) === false) {
      throw new NotFoundException(USER_DOES_NOT_EXIST)
    }
    if (user.isActive === false) {
      throw new BadRequestException(USER_ACCOUNT_NOT_ACTIVE)
    }

    const accessToken = await auth.use('api').attempt(emailAddress, password, {
      expiresIn: `${Env.get('TOKEN_EXPIRATION_DURATION_IN_MINUTES')} minutes`,
    })

    const userLoginResponsePayload = {
      identifier: user.identifier,
      first_name: user!.profile.firstName,
      last_name: user!.profile.lastName,
      email_address: user!.emailAddress,
      phone_number: user!.profile.phoneNumber,
      access_token: accessToken,
    }
    return response.json({
      success: true,
      status_code: 200,
      message: USER_ACCOUNT_LOGGED_IN,
      result: userLoginResponsePayload,
    })
  }
}
