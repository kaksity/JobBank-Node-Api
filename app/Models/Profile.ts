import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import User from 'App/Models/User'
import Lga from 'App/Models/Lga'

export default class Profile extends GenericModel {
  
  @column()
  public userId: number

  @column()
  public lgaId: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNumber: string
  
  @column()
  public gender: string

  @column()
  public dob: DateTime

  @column()
  public contactAddress: string

  @column()
  public employmentStatus: string

  @column()
  public additionalInfo: string

  @column()
  public avatarFileName: string

  @column()
  public avatarUrl: string

  @column()
  public isEducated: boolean

  @column()
  public highestEducationLevel: string

  @column()
  public isProfileCompleted: boolean

  @belongsTo(() => User)
  user: BelongsTo<typeof User>

  @belongsTo(() => Lga)
  lga: BelongsTo<typeof Lga>
}
