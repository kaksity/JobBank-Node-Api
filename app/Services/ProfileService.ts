import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import Profile from 'App/Models/Profile'
import ProfileObjectInterface from 'App/TypeChecking/ModelManagement/ProfileObjectInterface'

export default class ProfileService {
    /**
     * @description
     * @author Dauda Pona
     * @param {Partial<ProfileObjectInterface>} profileCreationOptions
     * @returns {*}  {Promise<Profile>}
     * @memberof ProfileService
     */
    public async createProfileRecord(profileCreationOptions: Partial<ProfileObjectInterface>): Promise<Profile> {
        const profile = new Profile()
        Object.assign(profile, profileCreationOptions)
        if(profileCreationOptions.transaction) {
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
        if(profile) {
            return profile
        }
        return NULL_OBJECT
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
        if(profile) {
            return profile
        }
        return NULL_OBJECT
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
        if(profile) {
            return profile
        }
        return NULL_OBJECT
    }
}
