/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

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
      user.password = await bcrypt.hash(user.password, salt)
    },
  },
})

// Custom Methods
User.prototype.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default User
