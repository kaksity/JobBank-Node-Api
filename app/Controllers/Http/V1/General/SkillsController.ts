import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RECORDS_FOUND } from 'App/Helpers/GeneralPurpose/CustomMessages/GeneralMessages'
import SkillResource from 'App/Resources/V1/General/SkillResource'
import SkillService from 'App/Services/SkillService'

@inject()
export default class SkillsController {
  constructor(private skillService: SkillService) {}
  public async index({ response }: HttpContextContract) {
    const skills = await this.skillService.getSkills()

    const skillResponsePayload = SkillResource.collection(skills)

    return response.json({
      success: true,
      message: RECORDS_FOUND,
      status_code: 200,
      result: skillResponsePayload,
    })
  }
}
