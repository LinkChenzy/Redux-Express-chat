const moment = require('moment')

module.exports = (sequelize, dataTypes) => {
    const Chat = sequelize.define(
        'chat', {
            id: {
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            chatid: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            from: {
                type: dataTypes.STRING,
                allowNull: false,
                comment: '发送方'
            },
            to: {
                type: dataTypes.STRING,
                allowNull: false,
                comment: '接受方'
            },
            read: {
                type: dataTypes.BOOLEAN,
                allowNull: true,
                default:false,
                comment: '是否已可读'
            },
            content: {
                type: dataTypes.STRING,
                allowNull: true,
                default:'',
                comment: '发送的内容'
            },
            createdAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }, {
            timestamps: true,
            updatedAt:false,
            paranoid:true
        }
    )

    return Chat
}