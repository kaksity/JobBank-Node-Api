import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import { EDUCATION_LEVEL_DOES_NOT_EXIST, NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import { USER_EDUCATION_CANNOT_BE_DELETED, USER_EDUCATION_CREATED_SUCCESSFULLY, USER_EDUCATION_DELETED_SUCCESSFULLY, USER_EDUCATION_DOES_NOT_EXIST, USER_EDUCATION_FETCHED_SUCCESSFULLY } from 'App/Helpers/GeneralPurpose/CustomMessages/UserEductionMessages'
import UserEducationResource from 'App/Resources/V1/User/UserEducationResource'
import EducationLevelService from 'App/Services/EducationLevelService'
import UserEducationService from 'App/Services/UserEducationService'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import UserEducationObjectInterface from 'App/TypeChecking/ModelManagement/UserEducationObjectInterface'
import CreateUserEducationValidator from 'App/Validators/V1/User/UserEducation/CreateUserEducationValidator'

@inject()
export default class UserEducationsController {
  constructor(private userEducationService: UserEducationService, private educationLevelService: EducationLevelService) {
  }
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const userEducations = await this.userEducationService.getUserEducationByUserId(user.id)

    const userEducationResponsePayload = UserEducationResource.collection(userEducations)

    return response.json({
      success: true,
      status_code: 200,
      message: USER_EDUCATION_FETCHED_SUCCESSFULLY,
      result: userEducationResponsePayload
    })
  }

  public async store({request, response, auth}: HttpContextContract) {
    await request.validate(CreateUserEducationValidator)

    const { education_level_identifier: educationLevelIdentifier } = request.body()

    const educationLevel = await this.educationLevelService.getEducationLevelByIdentifier(educationLevelIdentifier)
    
    if(educationLevel === NULL_OBJECT) {
      
      throw new NotFoundException(EDUCATION_LEVEL_DOES_NOT_EXIST)

    }
    
    const user = auth.user!
    
    const { school_name: schoolName, course_name: courseName, grade, start_date: startDate, end_date: endDate, is_completed: isCompleted, additional_info: additionalInfo } = request.body()

    const userEducationCreateOptions: Partial<UserEducationObjectInterface> = {
      userId: user.id,
      educationLevelId: educationLevel.id,
      schoolName,
      courseName,
      grade,
      startDate,
      endDate,
      isCompleted,
      additionalInfo,
    }
    await this.userEducationService.createUserEducationServiceRecord(userEducationCreateOptions)

    return response.created({
      success: true,
      status_code: 201,
      message: USER_EDUCATION_CREATED_SUCCESSFULLY,
      result: {}
    })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {

    const user = auth.user!

    const userEducation = await this.userEducationService.getUserEducationByIdentifier(params.id)
    
    if (userEducation === NULL_OBJECT) {
      throw new NotFoundException(USER_EDUCATION_DOES_NOT_EXIST)
    }

    if(userEducation.userId !== user.id) {
      throw new UnAuthorizedException(USER_EDUCATION_CANNOT_BE_DELETED)
    }

    const userEducationDeletePayloadOptions: DeleteRecordPayloadOptions = {
      identifierType: 'identifier',
      entityId: params.id,
      transaction: undefined
    }

    await this.userEducationService.deleteUserEducationRecord(userEducationDeletePayloadOptions)

    return response.json({
      success: true,
      status_code: 200,
      message: USER_EDUCATION_DELETED_SUCCESSFULLY,
      result: {}
    })
  }
}
