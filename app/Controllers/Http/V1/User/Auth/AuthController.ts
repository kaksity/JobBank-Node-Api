import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import AlreadyExistException from 'App/Exceptions/AlreadyExistException'
import UserService from 'App/Services/UserService'
import UserObjectInterface from 'App/TypeChecking/ModelManagement/UserObjectInterface'
import RegisterValidator from 'App/Validators/V1/User/Auth/RegisterValidator'
import { DateTime } from 'luxon'

@inject()
export default class AuthController {
  constructor(private userService: UserService) {}
  public async register({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)

    const {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      password,
    } = request.body()

    // Check if a user already exist
    const user = await this.userService.checkIfUserExist({ phoneNumber, emailAddress })

    if (user) {
      throw new AlreadyExistException('User Account already exist')
    }

    //Create a new user
    const userCreationOptions: Partial<UserObjectInterface> = {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      password,
      lastLoginDate: DateTime.now(),
    }

    await Database.transaction(async (transaction) => {
      userCreationOptions.transaction = transaction
      await this.userService.createUserRecord(userCreationOptions)
    })

    return response.created({
      success: true,
      message: 'User Account was created successfully',
    })
  }
}
