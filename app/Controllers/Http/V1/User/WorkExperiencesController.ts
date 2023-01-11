import { inject } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  WORK_EXPERIENCE_CANNOT_BE_DELETED,
  WORK_EXPERIENCE_CREATED_SUCCESSFULLY,
  WORK_EXPERIENCE_DELETED_SUCCESSFULLY,
  WORK_EXPERIENCE_DOES_NOT_EXIST,
  WORK_EXPERIENCE_FETCHED_SUCCESSFULLY,
} from 'App/Helpers/GeneralPurpose/CustomMessages/WorkExperienceMessages'
import WorkExperienceResource from 'App/Resources/V1/User/WorkExperienceResource'
import WorkExperienceService from 'App/Services/WorkExperienceService'
import WorkExperienceObjectInterface from 'App/TypeChecking/ModelManagement/WorkExperienceObjectInterface'
import CreateWorkExperienceValidator from 'App/Validators/V1/User/WorkExperience/CreateWorkExperienceValidator'
import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'

@inject()
export default class WorkExperiencesController {
  constructor(private workExperienceService: WorkExperienceService) {}
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const workExperiences = await this.workExperienceService.getWorkExperienceByUserId(user.id)

    const workExperienceResponsePayload = WorkExperienceResource.collection(workExperiences)

    return response.json({
      success: true,
      message: WORK_EXPERIENCE_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: workExperienceResponsePayload,
    })
  }
  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate(CreateWorkExperienceValidator)
    const {
      job_title: jobTitle,
      job_description: description,
      organization,
      is_current_work: isCurrentWork,
      start_date: startDate,
      end_date: endDate,
      additional_info: additionalInfo,
    } = request.body()
    const user = auth.user!
    const createWorkExperienceOptions: Partial<WorkExperienceObjectInterface> = {
      userId: user.id,
      jobTitle,
      description,
      organization,
      isCurrentWork,
      startDate,
      endDate,
      additionalInfo,
    }

    await this.workExperienceService.createWorkExperienceRecord(createWorkExperienceOptions)

    return response.created({
      success: true,
      status_code: 201,
      message: WORK_EXPERIENCE_CREATED_SUCCESSFULLY,
      result: {},
    })
  }
  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = auth.user!

    const workExperience = await this.workExperienceService.getWorkExperienceByIdentifier(params.id)

    if (workExperience === NULL_OBJECT) {
      throw new NotFoundException(WORK_EXPERIENCE_DOES_NOT_EXIST)
    }
    if (workExperience.userId !== user.id) {
      throw new UnAuthorizedException(WORK_EXPERIENCE_CANNOT_BE_DELETED)
    }

    const workExperienceDeleteOptions: DeleteRecordPayloadOptions = {
      identifierType: 'id',
      entityId: workExperience.id,
      transaction: undefined,
    }

    await this.workExperienceService.deleteWorkExperienceRecord(workExperienceDeleteOptions)

    return response.json({
      success: true,
      message: WORK_EXPERIENCE_DELETED_SUCCESSFULLY,
      status_code: 200,
      result: {},
    })
  }
}
