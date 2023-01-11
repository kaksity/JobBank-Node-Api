import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'

export default class SkillSet extends GenericModel {
  @column()
  public userId: number

  @column()
  public skillId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Skill)
  public skill: BelongsTo<typeof Skill>
}
