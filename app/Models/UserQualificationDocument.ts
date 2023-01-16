import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import EducationLevel from 'App/Models/EducationLevel'
import User from 'App/Models/User'

export default class UserQualificationDocument extends GenericModel {
  @column()
  public userId: number

  @column()
  public educationLevelId: number

  @column()
  public filePath: string

  @belongsTo(() => EducationLevel)
  public educationLevel: BelongsTo<typeof EducationLevel>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
