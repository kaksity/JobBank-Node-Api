import EducationLevel from 'App/Models/EducationLevel'

export default class EducationLevelResource {
  public static single(educationLevel: EducationLevel) {
    return {
      identifier: educationLevel.identifier,
      name: educationLevel.name,
    }
  }
  public static collection(educationLevels: EducationLevel[]) {
    return educationLevels.map((educationLevel) => {
      return this.single(educationLevel)
    })
  }
}
