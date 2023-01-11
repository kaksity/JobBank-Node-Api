import { NULL_OBJECT } from 'App/Helpers/GeneralPurpose/CustomMessages/GenericMessages'
import Skill from 'App/Models/Skill'

export default class SkillService {
    /**
     * @description
     * @author Dauda Pona
     * @param {number} id
     * @returns {*}  {(Promise<Skill | null>)}
     * @memberof SkillService
     */
    public async getSkillById(id: number): Promise<Skill | null> {
        const skill = await Skill.query().where('is_deleted', false).where('id', id).first()
        if(skill === NULL_OBJECT) {
            return NULL_OBJECT
        }
        return skill
    }

    /**
     * @description
     * @author Dauda Pona
     * @param {string} identifier
     * @returns {*}  {(Promise<Skill | null>)}
     * @memberof SkillService
     */
    public async getSkillByIdentifier(identifier: string): Promise<Skill | null> {
        const skill = await Skill.query().where('is_deleted', false).where('identifier', identifier).first()
        
        if(skill === NULL_OBJECT) {
            return NULL_OBJECT
        }

        return skill
    }
    /**
     * @description
     * @author Dauda Pona
     * @returns {*}  {Promise<Skill[] >}
     * @memberof SkillService
     */
    public async getSkills(): Promise<Skill[] > {
        return await Skill.query().where('is_deleted', false).orderBy('name', 'asc')
    }
}
