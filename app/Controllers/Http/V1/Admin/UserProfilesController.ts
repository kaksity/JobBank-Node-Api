import { inject } from '@adonisjs/core/build/standalone'
import { RECORDS_FOUND } from 'App/Helpers/GeneralPurpose/CustomMessages/GeneralMessages'
import ProfileService from 'App/Services/ProfileService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import {
  NULL_OBJECT,
} from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import {
  PROFILE_NOT_FOUND,
} from 'App/Helpers/GeneralPurpose/CustomMessages/ProfileMessages'
import ProfileResource from 'App/Resources/V1/User/ProfileResource'

@inject()
export default class UserProfilesController {
  constructor(private profileService: ProfileService) {}
  public async index({ response, params }: HttpContextContract) {
    

    const profile = await this.profileService.getProfileByUserIdentifier(params.userId)
    
    if(profile === NULL_OBJECT ) {
      throw new NotFoundException(PROFILE_NOT_FOUND)
    }

    const userResponsePayload = ProfileResource.single(profile)

    return response.json({
      success: true,
      status_code: 200,
      message: RECORDS_FOUND,
      result: userResponsePayload,
    })
  }
}
