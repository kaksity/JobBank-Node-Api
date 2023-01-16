import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  USER_QUALIFICATION_DOCUMENT_FETCHED_SUCCESSFULLY,
} from 'App/Helpers/GeneralPurpose/CustomMessages/UserQualificationDocumentMessages'
import UserQualificationDocumentResource from 'App/Resources/V1/User/UserQualificationDocumentResource'
import UserQualificationDocumentService from 'App/Services/UserQualificationDocumentService'

@inject()
export default class UserQualificationDocumentsController {
  constructor(
    private userQualificationDocumentService: UserQualificationDocumentService  ) {}

  public async index({ response, params }: HttpContextContract) {

    const qualificationDocuments =
      await this.userQualificationDocumentService.getUserQualificationDocumentByUserIdentifier(params.userId)

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
}
