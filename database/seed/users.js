import bcrypt from 'bcrypt'

const users = [
  {
    name: 'Cesar Villalobos',
    email: 'cesarvillalobosolmos.01@gmail.com',
    confirmed: 1,
    password: bcrypt.hashSync('password', 10),
  },
]

export default users
