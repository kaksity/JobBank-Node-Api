import { DateTime } from 'luxon'
import { belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import User from 'App/Models/User'
import EducationLevel from 'App/Models/EducationLevel'

export default class UserEducation extends GenericModel {
  @column()
  public userId: number

  @column()
  public educationLevelId: number

  @column()
  public schoolName: string

  @column()
  public courseName: string

  @column()
  public grade: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public isCompleted: string

  @column()
  public additionalInfo: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => EducationLevel)
  public educationLevel: BelongsTo<typeof EducationLevel>
}
