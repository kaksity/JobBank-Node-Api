import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SKILL_SET_FETCHED_SUCCESSFULLY } from 'App/Helpers/GeneralPurpose/CustomMessages/SkillSetMessages'
import SkillSetResource from 'App/Resources/V1/User/SkillSetResource'
import SkillSetService from 'App/Services/SkillSetService'

@inject()
export default class UserSkillSetsController {
  constructor(private skillSetService: SkillSetService) {}
  public async index({ response, params }: HttpContextContract) {
    const skillSets = await this.skillSetService.getSkillSetByUserIdentifier(params.userId)

    const skillSetResponsePayload = SkillSetResource.collection(skillSets)

    return response.json({
      success: true,
      message: SKILL_SET_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: skillSetResponsePayload,
    })
  }
}
