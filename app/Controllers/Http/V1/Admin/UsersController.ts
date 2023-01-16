import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_ACCOUNT_FETCHED_SUCCESSFULLY } from 'App/Helpers/GeneralPurpose/CustomMessages/UserMessages'
import UserResource from 'App/Resources/V1/Admin/UserResource'
import UserService from 'App/Services/UserService'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
  public async index({ request, response }: HttpContextContract) {
    const limit = request.param('per_page', 100)
    const page = request.param('page', 1)

    const { data: users, meta } = await this.userService.getUsers(page, limit)

    const usersResponsePayload = UserResource.collection(users)

    return response.json({
      success: true,
      message: USER_ACCOUNT_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: { data: usersResponsePayload, meta },
    })
  }

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
