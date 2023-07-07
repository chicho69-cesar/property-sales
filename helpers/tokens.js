import jwt from 'jsonwebtoken'

export const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString(32)

export const generateJWT = (data) => {
  const { id, name } = data
  const token = jwt.sign({ id, name }, process.env.SECRET_KEY, { expiresIn: '31d' })
  return token
}
