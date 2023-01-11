import Skill from 'App/Models/Skill'

export default class SkillResource {
  public static single(skill: Skill) {
    return {
      identifier: skill.identifier,
      name: skill.name,
    }
  }
  public static collection(skills: Skill[]) {
    return skills.map((skill) => {
      return this.single(skill)
    })
  }
}
