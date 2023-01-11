import SkillSet from 'App/Models/SkillSet'
import SkillResource from 'App/Resources/V1/General/SkillResource'

export default class SkillSetResource {
  public static single(skillSet: SkillSet) {
    return {
      identifier: skillSet.identifier,
      skill: SkillResource.single(skillSet.skill),
    }
  }
  public static collection(skillSets: SkillSet[]) {
    return skillSets.map((skillSet) => {
      return this.single(skillSet)
    })
  }
}
