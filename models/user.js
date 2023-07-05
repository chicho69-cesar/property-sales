import bcrypt from 'bcrypt'
import { DataTypes } from 'sequelize'

import db from '../config/db.js'

const User = db.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: DataTypes.STRING,
  confirmed: DataTypes.BOOLEAN,
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10)
      // eslint-disable-next-line no-param-reassign
      user.password = await bcrypt.hash(user.password, salt)
    },
  },
})

export default User
