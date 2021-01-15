const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return;
  }
  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  // console.log("salt value: ", salt)
  const hashedP = bcrypt.hashSync(user.password, salt, null)
  // console.log("hashedpasword: ", hashedP)
  user.setDataValue('password', hashedP)
  return;
  // return bcrypt
  //   .genSaltAsync(SALT_FACTOR)
  //   .then(salt => bcrypt.hashAsync(user.password, salt, null))
  //   .then(hash => {
  //     user.setDataValue('password', hash)
  //   })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
      //beforeSave: hashPassword
     }
  })

  User.prototype.comparePassword = function (password) {
    // console.log("comparePassword func: ", password)
    // console.log("comparePassword func: ", this.password)

    return bcrypt.compareSync(password, this.password)
  }


  return User
}