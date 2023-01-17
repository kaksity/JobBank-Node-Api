import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const roles = [
      {
        name: 'Admin',
        slug: 'admin',
      },
      {
        name: 'User',
        slug: 'user',
      },
    ]

    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Role.truncate(true)
    await Role.createMany(roles)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
