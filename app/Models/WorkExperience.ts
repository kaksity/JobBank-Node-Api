import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import User from 'App/Models/User'

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

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
