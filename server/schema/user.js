const moment = require('moment')

module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        'user', {
            // id sequelize 默认创建...
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            user: {
                type: dataTypes.STRING(50),
                // primaryKey: true,
                allowNull: false,
                unique: true
            },
            password: {
                type: dataTypes.STRING,
                allowNull: false,
                comment: '通过 bcrypt 加密后的密码'
            },
            type: {
                type: dataTypes.STRING,
                allowNull: false,
                comment: '用户类型'
            },
            avatar: {
                type: dataTypes.STRING,
                allowNull: true,
                comment: '头像'
            },
            desc: {
                type: dataTypes.STRING,
                allowNull: true,
                comment: '个人简介或者职位简介'
            },
            title: {
                type: dataTypes.STRING,
                allowNull: true,
                comment: '职位名'
            },
            // 只有boss拥有的字段
            company: {
                type: dataTypes.STRING,
                allowNull: true,
                comment: '公司的名称'
            },
            money: {
                type: dataTypes.STRING,
                allowNull: true,
                comment: '薪资'
            },
            // auth: {
            //     type: dataTypes.TINYINT,
            //     defaultValue: 2,
            //     comment: '用户权限：1 - admin, 2 - 普通用户'
            // },
            createdAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            updatedAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }, {
            timestamps: true
        }
    )

    // User.associate = models => {
    //     User.hasMany(models.comment)
    //     User.hasMany(models.reply)
    // }

    return User
}