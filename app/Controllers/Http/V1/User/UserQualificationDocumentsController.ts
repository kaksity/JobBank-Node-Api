import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import {
  EDUCATION_LEVEL_DOES_NOT_EXIST,
  NULL_OBJECT,
} from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import {
  USER_QUALIFICATION_DOCUMENT_CREATED_SUCCESSFULLY,
  USER_QUALIFICATION_DOCUMENT_FETCHED_SUCCESSFULLY,
  USER_QUALIFICATION_DOCUMENT_DELETED_SUCCESSFULLY,
  USER_QUALIFICATION_DOCUMENT_DOES_NOT_EXIST,
  USER_QUALIFICATION_DOCUMENT_CANNOT_BE_DELETED,
} from 'App/Helpers/GeneralPurpose/CustomMessages/UserQualificationDocumentMessages'
import UserQualificationDocumentResource from 'App/Resources/V1/User/UserQualificationDocumentResource'
import EducationLevelService from 'App/Services/EducationLevelService'
import FileManagerService from 'App/Services/FileManagerService'
import UserQualificationDocumentService from 'App/Services/UserQualificationDocumentService'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import UserQualificationDocumentObjectInterface from 'App/TypeChecking/ModelManagement/UserQualificationDocumentObjectInterface'
import CreateUserQualificationDocumentValidator from 'App/Validators/UserQualificationDocument/CreateUserQualificationDocumentValidator'

@inject()
export default class UserQualificationDocumentsController {
  constructor(
    private userQualificationDocumentService: UserQualificationDocumentService,
    private educationLevelService: EducationLevelService,
    private fileManagerService: FileManagerService
  ) {}

  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const qualificationDocuments =
      await this.userQualificationDocumentService.getUserQualificationDocumentByUserId(user.id)

    const qualificationDocumentResponsePayload = await UserQualificationDocumentResource.collection(
      qualificationDocuments
    )
    return response.json({
      success: true,
      message: USER_QUALIFICATION_DOCUMENT_FETCHED_SUCCESSFULLY,
      status_code: 200,
      result: qualificationDocumentResponsePayload,
    })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(CreateUserQualificationDocumentValidator)
    const { education_level_identifier: educationLevelIdentifier } = request.body()

    const educationLevel = await this.educationLevelService.getEducationLevelByIdentifier(
      educationLevelIdentifier
    )

    if (educationLevel === NULL_OBJECT) {
      throw new NotFoundException(EDUCATION_LEVEL_DOES_NOT_EXIST)
    }

    const user = auth.user!

    const filePath = await this.fileManagerService.save(request.file('file'))

    const createQualificationDocumentOptions: Partial<UserQualificationDocumentObjectInterface> = {
      userId: user.id,
      educationLevelId: educationLevel.id,
      filePath,
    }

    await this.userQualificationDocumentService.createUserQualificationDocumentRecord(
      createQualificationDocumentOptions
    )

    return response.created({
      success: true,
      message: USER_QUALIFICATION_DOCUMENT_CREATED_SUCCESSFULLY,
      status_code: 201,
      result: {},
    })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = auth.user!

    const qualificationDocument =
      await this.userQualificationDocumentService.getUserQualificationDocumentByIdentifier(
        params.id
      )

    if (qualificationDocument === NULL_OBJECT) {
      throw new NotFoundException(USER_QUALIFICATION_DOCUMENT_DOES_NOT_EXIST)
    }

    if (qualificationDocument.userId !== user.id) {
      throw new UnAuthorizedException(USER_QUALIFICATION_DOCUMENT_CANNOT_BE_DELETED)
    }

    const deleteQualificationDocumentPayloadOptions: DeleteRecordPayloadOptions = {
      identifierType: 'identifier',
      entityId: params.id,
      transaction: undefined,
    }

    await this.userQualificationDocumentService.deleteUserQualificationDocumentRecord(
      deleteQualificationDocumentPayloadOptions
    )

    return response.json({
      success: true,
      message: USER_QUALIFICATION_DOCUMENT_DELETED_SUCCESSFULLY,
      status_code: 200,
      result: {},
    })
  }
}
