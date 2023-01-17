import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import { USER_ACCOUNT_NOT_ADMIN } from 'App/Helpers/GeneralPurpose/CustomMessages/UserMessages'
import RoleService from 'App/Services/RoleService'

@inject()
export default class VerifyAdminRoleMiddleware {
  constructor(private roleService: RoleService) {}
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const adminRole = await this.roleService.getRoleSystemAdministrator()
    const user = auth.user

    if (user!.roleId !== adminRole!.id) {
      throw new UnAuthorizedException(USER_ACCOUNT_NOT_ADMIN)
    }

    await next()
  }
}
