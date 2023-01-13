import { DateTime } from 'luxon'

interface UserEducationObjectInterface {
  id: number

  identifier: string

  userId: number

  educationLevelId: number

  schoolName: string

  courseName: string

  grade: string

  startDate: DateTime

  endDate: DateTime

  isCompleted: string

  additionalInfo: string
}
export default UserEducationObjectInterface
