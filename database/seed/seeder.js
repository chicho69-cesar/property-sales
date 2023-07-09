import { exit } from 'node:process'

import db from '../../config/db.js'
import Category from '../../models/category.js'
import Price from '../../models/price.js'

import categories from './categories.js'
import prices from './prices.js'

const importData = async () => {
  try {
    // Authenticate with db
    await db.authenticate()

    // Generate columns
    /* With force on value true, the tables are dropped */
    await db.sync({ force: true })

    // Delete the data if exists
    /* await Promise.all([
      Price.destroy({ where: {}, truncate: true }),
      Category.destroy({ where: {}, truncate: true }),
    ]) */

    // Insert the data
    await Promise.all([
      Price.bulkCreate(prices),
      Category.bulkCreate(categories),
    ])

    console.log('Data imported successfully')
    exit()
  } catch (error) {
    console.log(error)
    exit(1)
  }
}

/* Insert the data with a command with arg -i */
if (process.argv[2] === '-i') {
  importData()
}
