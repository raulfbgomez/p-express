const bcrypt = require('bcrypt')
const chalk = require('chalk')
const mongoLib = require('../../lib/mongo')
const { config } = require('../../config')
const MongoLib = require('../../lib/mongo')

function buildAdminUser(password) {
  return {
    password, 
    username: config.authAdminUsername,
    email: config.authAdminEmail
  }
}

async function hasAdminUser(mongoDB) {
  const adminUser = await mongoDB.getAll('users', {
    username: config.authAdminUsername
  })
  return adminUser && adminUser.length
}

async function createAdminUser(mongoDB) {
  const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10)
  const userId = await mongoDB.create('users', buildAdminUser(hashedPassword))
  return userId
}

async function seedAdmin() {
  try {
    const mongoDB = new MongoLib()
    if(await hasAdminUser(mongoDB)) {
      console.log(chalk.yellow('Admin user already exxists'))
      return process.exit(1)
    }
    const adminUserId = await createAdminUser(mongoDB)
    console.log(chalk.green('Admin user created with id: ', adminUserId))
    return process.exit(0)
  } catch(errr) {
    console.log(chalk.red(err))
    process.exit(1)
  }
}

seedAdmin()