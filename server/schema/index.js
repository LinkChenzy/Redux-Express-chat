const fs        = require('fs')
const path      = require('path')
const config    = require('../config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)
sequelize
    .authenticate()
    .then(() => {
        console.log("sequlize连接成功:", 'Connection has been established successfully.');
    })
    .catch(err => {
        console.error("sequlize失败:", 'Unable to connect to the database:', err);
    });

    
let db = {}

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize

module.exports = db