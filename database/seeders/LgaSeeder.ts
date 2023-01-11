import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Lga from 'App/Models/Lga'

export default class extends BaseSeeder {
  public async run() {
    const lgas = [
      {
        name: 'Abadam',
      },
      {
        name: 'Askira/Uba',
      },
      {
        name: 'Bama',
      },
      {
        name: 'Bayo',
      },
      {
        name: 'Biu',
      },
      {
        name: 'Chibok',
      },
      {
        name: 'Damboa',
      },
      {
        name: 'Dikwa',
      },
      {
        name: 'Gubio',
      },
      {
        name: 'Guzamala',
      },
      {
        name: 'Gwoza',
      },
      {
        name: 'Hawul',
      },
      {
        name: 'Jere',
      },
      {
        name: 'Kaga',
      },
      {
        name: 'Kala/Balge',
      },
      {
        name: 'Konduga',
      },
      {
        name: 'Kukawa',
      },
      {
        name: 'Kwaya Kusar',
      },
      {
        name: 'Mafa',
      },
      {
        name: 'Magumeri',
      },
      {
        name: 'Maiduguri',
      },
      {
        name: 'Marte',
      },
      {
        name: 'Mobbar',
      },
      {
        name: 'Monguno',
      },
      {
        name: 'Ngala',
      },
      {
        name: 'Nganzai',
      },
      {
        name: 'Shani',
      },
    ]
    // Write your database queries inside the run method
    Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Lga.truncate(true)
    await Lga.createMany(lgas)

    Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}
