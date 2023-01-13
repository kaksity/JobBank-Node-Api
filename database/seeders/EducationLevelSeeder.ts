import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EducationLevel from 'App/Models/EducationLevel'

export default class extends BaseSeeder {
  public async run() {
    const educationLevels = [
      {
        name: 'Primary School',
      },
      {
        name: 'Senior Secondary School',
      },
      {
        name: 'National Diploma',
      },
      {
        name: 'Degree',
      },
      {
        name: 'Masters',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await EducationLevel.truncate(true)
    await EducationLevel.createMany(educationLevels)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
