import { inject } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import AlreadyExistException from 'App/Exceptions/AlreadyExistException'
import {
  USER_ALREADY_EXIST,
  USER_ACCOUNT_CREATED,
  USER_DOES_NOT_EXIST,
  USER_ACCOUNT_NOT_ACTIVE,
  USER_ACCOUNT_LOGGED_IN,
} from 'App/Helpers/GeneralPurpose/CustomMessages/UserMessages'
import UserService from 'App/Services/UserService'
import UserObjectInterface from 'App/TypeChecking/ModelManagement/UserObjectInterface'
import RegisterValidator from 'App/Validators/V1/User/Auth/RegisterValidator'
import { DateTime } from 'luxon'
import Env from '@ioc:Adonis/Core/Env'
import ProfileObjectInterface from 'App/TypeChecking/ModelManagement/ProfileObjectInterface'
import ProfileService from 'App/Services/ProfileService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/V1/User/Auth/LoginValidator'
import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import NotFoundException from 'App/Exceptions/NotFoundException'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Hash from '@ioc:Adonis/Core/Hash'
import RoleService from 'App/Services/RoleService'

@inject()
export default class AuthController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private roleService: RoleService
  ) {}
  public async register({ request, response, auth }: HttpContextContract) {
    await request.validate(RegisterValidator)

    const {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      password,
    } = request.body()

    // Check if a user already exist
    let user = await this.userService.checkIfUserExist({ phoneNumber, emailAddress })

    if (user) {
      throw new AlreadyExistException(USER_ALREADY_EXIST)
    }

    const userRole = await this.roleService.getRoleSystemUser()

    //Create a new user
    const userCreationOptions: Partial<UserObjectInterface> = {
      emailAddress,
      password,
      lastLoginDate: DateTime.now(),
      roleId: userRole?.id,
    }

    await Database.transaction(async (transaction) => {
      userCreationOptions.transaction = transaction
      user = await this.userService.createUserRecord(userCreationOptions)
      const profileCreationOption: Partial<ProfileObjectInterface> = {
        userId: user.id,
        firstName,
        lastName,
        phoneNumber,
        transaction,
      }
      await this.profileService.createProfileRecord(profileCreationOption)
    })

    user = await this.userService.getUserByEmailAddress(emailAddress)

    const accessToken = await auth.use('api').attempt(emailAddress, password, {
      expiresIn: `${Env.get('TOKEN_EXPIRATION_DURATION_IN_MINUTES')} minutes`,
    })

    const createUserResponsePayload = {
      identifier: user!.identifier,
      first_name: user!.profile.firstName,
      last_name: user!.profile.lastName,
      email_address: user!.emailAddress,
      phone_number: user!.profile.phoneNumber,
      access_token: accessToken,
      created_at: user!.createdAt,
    }

    return response.created({
      success: true,
      status_code: 201,
      message: USER_ACCOUNT_CREATED,
      result: createUserResponsePayload,
    })
  }

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
