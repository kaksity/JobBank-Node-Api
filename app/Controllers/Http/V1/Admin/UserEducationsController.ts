import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_EDUCATION_FETCHED_SUCCESSFULLY } from 'App/Helpers/GeneralPurpose/CustomMessages/UserEductionMessages'
import UserEducationResource from 'App/Resources/V1/User/UserEducationResource'
import UserEducationService from 'App/Services/UserEducationService'

@inject()
export default class UserEducationsController {
  constructor(private userEducationService: UserEducationService) {}
  public async index({ response, params }: HttpContextContract) {
    const userEducations = await this.userEducationService.getUserEducationByUserIdentifier(
      params.userId
    )

    const userEducationResponsePayload = UserEducationResource.collection(userEducations)

    return response.json({
      success: true,
      status_code: 200,
      message: USER_EDUCATION_FETCHED_SUCCESSFULLY,
      result: userEducationResponsePayload,
    })
  }
}
