import { column } from '@ioc:Adonis/Lucid/Orm'
import GenericModel from 'App/Models/GenericModel'

export default class EducationLevel extends GenericModel {
  @column()
  public name: string
}
