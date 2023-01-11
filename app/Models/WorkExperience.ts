import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
export default class WorkExperience extends GenericModel {
  @column()
  public userId: number

  @column()
  public organization: string

  @column()
  public jobTitle: string

  @column()
  public description: string

  @column()
  public isCurrentWork: string

  @column()
  public startDate: string

  @column()
  public endDate: string

  @column()
  public additionalInfo: string
}
