import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import Profile from 'App/Models/Profile'
import ProfileObjectInterface from 'App/TypeChecking/ModelManagement/ProfileObjectInterface'
import UpdateRecordPayloadOptions from 'App/TypeChecking/GeneralPurpose/UpdateRecordPayloadOptions'

export default class ProfileService {
  /**
   * @description
   * @author Dauda Pona
   * @param {Partial<ProfileObjectInterface>} profileCreationOptions
   * @returns {*}  {Promise<Profile>}
   * @memberof ProfileService
   */
  public async createProfileRecord(
    profileCreationOptions: Partial<ProfileObjectInterface>
  ): Promise<Profile> {
    const profile = new Profile()
    Object.assign(profile, profileCreationOptions)
    if (profileCreationOptions.transaction) {
      profile.useTransaction(profileCreationOptions.transaction)
      await profile.save()
    }

    return profile
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} id
   * @returns {*}  {(Promise<Profile | null>)}
   * @memberof ProfileService
   */
  public async getProfileById(id: number): Promise<Profile | null> {
    const profile = await Profile.query().where('id', id).first()
    if (profile === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return profile
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {string} identifier
   * @returns {*}  {(Promise<Profile | null>)}
   * @memberof ProfileService
   */
  public async getProfileByIdentifier(identifier: string): Promise<Profile | null> {
    const profile = await Profile.query().where('identifier', identifier).first()
    if (profile === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return profile
  }
  /**
   * @description
   * @author Dauda Pona
   * @param {number} userId
   * @returns {*}  {(Promise<Profile | null>)}
   * @memberof ProfileService
   */
  public async getProfileByUserId(userId: number): Promise<Profile | null> {
    const profile = await Profile.query().where('user_id', userId).first()
    if (profile === NULL_OBJECT) {
      return NULL_OBJECT
    }
    return profile
  }

  public async updateProfileRecord(
    updateRecordPayloadOptions: UpdateRecordPayloadOptions
  ): Promise<void> {
    const {
      identifierType = 'id',
      entityId,
      modifiedData,
      transaction,
    } = updateRecordPayloadOptions
    if (identifierType === 'identifier') {
      const recordByIdentifier = await this.getProfileByIdentifier(String(entityId))

      recordByIdentifier!.merge(modifiedData)

      if (transaction) {
        recordByIdentifier!.useTransaction(transaction)
      }

      await recordByIdentifier!.save()
    } else {
      const recordById = await this.getProfileById(Number(entityId))
      recordById!.merge(modifiedData)
      if (transaction) {
        recordById!.useTransaction(transaction)
      }
      await recordById!.save()
    }
  }
}
