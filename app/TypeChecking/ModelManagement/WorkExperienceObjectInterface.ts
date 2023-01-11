import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

interface WorkExperienceObjectInterface {
  id: number

  identifier: string

  userId: number

  additionalInfo: string

  isCurrentWork: string

  description: string

  startDate: DateTime

  endDate: DateTime

  jobTitle: string

  organization: string

  transaction: TransactionClientContract | undefined
}

export default WorkExperienceObjectInterface
