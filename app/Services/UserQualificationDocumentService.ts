import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import UserQualificationDocument from 'App/Models/UserQualificationDocument'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import UserQualificationDocumentObjectInterface from 'App/TypeChecking/ModelManagement/UserQualificationDocumentObjectInterface'

export default class UserQualificationDocumentService {
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<UserQualificationDocumentObjectInterface>} createUserQualificationDocumentOptions
   * @returns {*}  {Promise<UserQualificationDocument>}
   * @memberof UserQualificationDocumentService
   */
  public async createUserQualificationDocumentRecord(
    createUserQualificationDocumentOptions: Partial<UserQualificationDocumentObjectInterface>
  ): Promise<UserQualificationDocument> {
    const qualificationDocument = new UserQualificationDocument()

    Object.assign(qualificationDocument, createUserQualificationDocumentOptions)
    await qualificationDocument.save()

    return qualificationDocument
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<UserQualificationDocument | null>)}
   * @memberof UserQualificationDocumentService
   */
  public async getUserQualificationDocumentById(
    id: number
  ): Promise<UserQualificationDocument | null> {
    const qualificationDocument = await UserQualificationDocument.query()
      .where('is_deleted', false)
      .where('id', id)
      .preload('educationLevel')
      .first()

    if (qualificationDocument === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return qualificationDocument
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<UserQualificationDocument | null>)}
   * @memberof UserQualificationDocumentService
   */
  public async getUserQualificationDocumentByIdentifier(
    identifier: string
  ): Promise<UserQualificationDocument | null> {
    const qualificationDocument = await UserQualificationDocument.query()
      .where('is_deleted', false)
      .where('identifier', identifier)
      .preload('educationLevel')
      .first()

    if (qualificationDocument === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return qualificationDocument
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} userId
   * @returns {*}  {Promise<UserQualificationDocument[]>}
   * @memberof UserQualificationDocumentService
   */
  public async getUserQualificationDocumentByUserId(
    userId: number
  ): Promise<UserQualificationDocument[]> {
    return await UserQualificationDocument.query()
      .where('is_deleted', false)
      .where('user_id', userId)
      .preload('educationLevel')
      .orderBy('created_at', 'asc')
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {DeleteRecordPayloadOptions} deleteUserQualificationDocumentPayloadOptions
   * @returns {*}  {Promise<void>}
   * @memberof UserQualificationDocumentService
   */
  public async deleteUserQualificationDocumentRecord(
    deleteUserQualificationDocumentPayloadOptions: DeleteRecordPayloadOptions
  ): Promise<void> {
    const {
      identifierType = 'identifier',
      entityId,
      transaction,
    } = deleteUserQualificationDocumentPayloadOptions

    if (identifierType === 'identifier') {
      const recordByIdentifier = await this.getUserQualificationDocumentByIdentifier(
        String(entityId)
      )

      recordByIdentifier?.merge({
        isDeleted: true,
      })

      if (transaction) {
        recordByIdentifier?.useTransaction(transaction)
      }

      await recordByIdentifier?.save()
    } else {
      const recordById = await this.getUserQualificationDocumentById(Number(entityId))

      recordById?.merge({
        isDeleted: true,
      })

      if (transaction) {
        recordById?.useTransaction(transaction)
      }

      await recordById?.save()
    }
  }
}
