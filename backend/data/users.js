import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Charmaine',
    email: 'admin@friends.com',
    password: bcrypt.hashSync('123456', 10), //hash sync method. this will hash the password synchronously
    isAdmin: true,
  },
  {
    name: 'Phoebe Buffay',
    email: 'phoebe@friends.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Chandler Bing',
    email: 'chandler@friends.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
