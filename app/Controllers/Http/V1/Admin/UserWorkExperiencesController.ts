import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  WORK_EXPERIENCE_FETCHED_SUCCESSFULLY,
} from 'App/Helpers/GeneralPurpose/CustomMessages/WorkExperienceMessages'
import WorkExperienceResource from 'App/Resources/V1/User/WorkExperienceResource'
import WorkExperienceService from 'App/Services/WorkExperienceService'

@inject()
export default class UserWorkExperiencesController {
  constructor(private workExperienceService: WorkExperienceService) {}
  public async index({ response, params, }: HttpContextContract) {

    const workExperiences = await this.workExperienceService.getWorkExperienceByUserIdentifier(params.userId)

    const workExperienceResponsePayload = WorkExperienceResource.collection(workExperiences)

    return response.json({
      success: true,
      message: WORK_EXPERIENCE_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: workExperienceResponsePayload,
    })
  }
}
