import jwt from 'jsonwebtoken'

// it takes in an id bec. thats what we want to add as the payload in this token.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
