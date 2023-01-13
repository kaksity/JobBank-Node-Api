import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import SkillSet from 'App/Models/SkillSet'
import DeleteRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/DeleteRecordPayloadOptions'
import SkillSetObjectInterface from 'App/TypeChecking/ModelManagement/SkillSetObjectInterface'

export default class SkillSetService {
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<SkillSetObjectInterface>} createSkillSetPayloadOptions
   * @returns {*}  {Promise<SkillSet>}
   * @memberof SkillSetService
   */
  public async createSkillSetRecord(
    createSkillSetPayloadOptions: Partial<SkillSetObjectInterface>
  ): Promise<SkillSet> {
    const skillSet = new SkillSet()

    Object.assign(skillSet, createSkillSetPayloadOptions)

    if (createSkillSetPayloadOptions.transaction) {
      skillSet.useTransaction(createSkillSetPayloadOptions.transaction)
      await skillSet.save()
    }

    return skillSet
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} userId
   * @returns {*}  {Promise<SkillSet[]>}
   * @memberof SkillSetService
   */
  public async getSkillSetByUserId(userId: number): Promise<SkillSet[]> {
    return await SkillSet.query()
      .preload('skill')
      .where('is_deleted', false)
      .where('user_id', userId)
      .orderBy('created_at', 'asc')
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<SkillSet | null>)}
   * @memberof SkillSetService
   */
  public async getSkillSetById(id: number): Promise<SkillSet | null> {
    const skill = await SkillSet.query()
      .preload('skill')
      .where('is_deleted', false)
      .where('id', id)
      .first()

    if (skill === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return skill
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<SkillSet | null>)}
   * @memberof SkillSetService
   */
  public async getSkillSetByIdentifier(identifier: string): Promise<SkillSet | null> {
    const skill = await SkillSet.query()
      .preload('skill')
      .where('is_deleted', false)
      .where('identifier', identifier)
      .first()

    if (skill === NULL_OBJECT) {
      return NULL_OBJECT
    }

    return skill
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {DeleteRecordPayloadOptions} deleteSkillSetPayloadOptions
   * @returns {*}  {Promise<void>}
   * @memberof SkillSetService
   */
  public async deleteSkillSetRecord(
    deleteSkillSetPayloadOptions: DeleteRecordPayloadOptions
  ): Promise<void> {
    const { identifierType = 'identifier', entityId, transaction } = deleteSkillSetPayloadOptions

    if (identifierType === 'identifier') {
      const recordByIdentifier = await SkillSet.query()
        .where('is_deleted', false)
        .where('identifier', String(entityId))
        .first()
      recordByIdentifier?.merge({
        isDeleted: true,
      })
      if (transaction) {
        recordByIdentifier?.useTransaction(transaction)
      }

      await recordByIdentifier?.save()
    } else {
      const recordById = await SkillSet.query()
        .where('is_deleted', false)
        .where('id', Number(entityId))
        .first()
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
