import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RECORDS_FOUND } from '../../../../Helpers/GeneralPurpose/GeneralMessages';
import { inject } from '@adonisjs/core/build/standalone';
import EducationLevelService from 'App/Services/EducationLevelService';
import EducationLevelResource from 'App/Resources/V1/General/EducationLevelResource';

@inject()
export default class EducationLevelsController {

    constructor(private educationLevelService: EducationLevelService){}

    public async index({response}: HttpContextContract) {
        const educationLevels = await this.educationLevelService.getEducationLevels()

        const educationLevelResponsePayload = EducationLevelResource.collection(educationLevels)
        
        return response.json({
            success: true,
            message: RECORDS_FOUND,
            status_code: 200,
            result: educationLevelResponsePayload
        })
    }
}
