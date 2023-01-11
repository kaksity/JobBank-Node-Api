import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Skill from 'App/Models/Skill'

export default class extends BaseSeeder {
  public async run() {
    const skills = [
      {
        name: 'Carpentry',
      },
      {
        name: 'Mobile Repair',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Skill.truncate(true)
    await Skill.createMany(skills)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
