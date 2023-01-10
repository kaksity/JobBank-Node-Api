import { inject } from '@adonisjs/core/build/standalone'
import { RECORDS_FOUND } from 'App/Helpers/GeneralPurpose/GeneralMessages'
import ProfileService from 'App/Services/ProfileService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { LGA_RECORD_DOES_NOT_EXIST, NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import BadRequestException from 'App/Exceptions/BadRequestException'
import { PROFILE_NOT_FOUND, PROFILE_CANNOT_BE_UPDATED, PROFILE_UPDATED_SUCCESSFULLY } from 'App/Helpers/GeneralPurpose/CustomMessages/ProfileMessages'
import UpdateRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/UpdateRecordPayloadOptions'
import UpdateProfileValidator from 'App/Validators/V1/User/Profile/UpdateProfileValidator'
import LgaService from 'App/Services/LgaService'

@inject()
export default class ProfilesController {
  constructor(private profileService: ProfileService, private lgaService: LgaService) {}
  public async index({ request, auth, response }: HttpContextContract) {
    
    const profile = await this.profileService.getProfileByUserId(auth.user!.id)

    const userResponsePayload = {
      identifier: profile?.identifier,
      first_name: profile?.firstName ?? 'N/A',
      last_name: profile?.lastName ?? 'N/A',
      phone_number: profile?.phoneNumber,
      gender: profile?.gender ?? 'N/A',
      dob: profile?.dob ?? 'N/A',
      contact_address: profile?.contactAddress ?? 'N/A',
      employment_status: profile?.employmentStatus ?? 'N/A',
      additional_info: profile?.additionalInfo ?? 'N/A',
      avatar_file_name: profile?.avatarFileName ?? 'N/A',
      avatar_url: profile?.avatarUrl ?? 'N/A',
      is_educated: profile?.isEducated ?? 'N/A',
      highest_education_level: profile?.highestEducationLevel ?? 'N/A',
      is_profile_completed: profile?.isProfileCompleted ?? 'N/A',
    }
    return response.json({
      success: true,
      status_code: 200,
      message: RECORDS_FOUND,
      result: userResponsePayload
    })
  }

  public async update({ request, auth, response, params }: HttpContextContract) {
    await request.validate(UpdateProfileValidator)

    const { lga_identifier: lgaIdentifier } = request.body()

    const lga = await this.lgaService.getLgaByIdentifier(lgaIdentifier)
    
    if(lga === NULL_OBJECT) {
      throw new NotFoundException(LGA_RECORD_DOES_NOT_EXIST)
    }
    
    const profile = await this.profileService.getProfileByIdentifier(params.id)
    
    if(profile === NULL_OBJECT) {
      throw new NotFoundException(PROFILE_NOT_FOUND)
    }
    if(profile.userId != auth.user!.id) {
      throw new BadRequestException(PROFILE_CANNOT_BE_UPDATED)
    }
    
    const { 
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      contact_address: contactAddress,
      gender,
      employment_status: employmentStatus,
      dob,
      highest_education_level: highestEducationLevel,
      additional_information: additionalInfo
    } = request.body()

    const profileUpdatePayloadOptions: UpdateRecordPayloadOptions = {
      identifierType: 'identifier',
      entityId: params.id,
      modifiedData : {
        firstName,
        lastName,
        phoneNumber,
        contactAddress,
        gender,
        employmentStatus,
        dob,
        highestEducationLevel,
        lgaId: lga.id,
        additionalInfo
      },
      transaction: undefined
    }
    
    await this.profileService.updateProfileRecord(profileUpdatePayloadOptions)

    return response.json({
      success: true,
      status_code: 200,
      message: PROFILE_UPDATED_SUCCESSFULLY,
      result: {}
    })
  }
}