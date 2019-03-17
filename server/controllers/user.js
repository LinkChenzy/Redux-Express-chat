const { user: UserModel, comment: CommentModel, reply: ReplyModel, sequelize } = require('../schema')
// const { encrypt, comparePassword } = require('../lib/bcrypt')
const { createToken, checkAuth } = require('../lib/token')

module.exports = {
    async getUserList(ctx) {
        // console.log('ctx', ctx)
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            let { page = 1, pageSize = 10, username } = ctx.query
            const offset = (page - 1) * pageSize
            pageSize = parseInt(pageSize)

            const params = username ? { username: { $like: `%${username}%` } } : {} 

            const data = await UserModel.findAndCountAll({
                // attributes: ['id', 'username', 'createdAt'],
                // where: { auth: 2, ...params },
                // include: [{ model: CommentModel, attributes: ['id'], include: [{ model: ReplyModel, attributes: ['id'] }] }],
                // offset,
                // limit: pageSize,
                // row: true,
                // distinct: true,
                // order: [['createdAt', 'DESC']],
            })
            ctx.body = { code: 200, ...data }
        }
    },

    async delete(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            let { userId } = ctx.query
            userId = parseInt(userId)
            await sequelize.query(
            `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${userId}`
            )
            await UserModel.destroy({ where: { id: userId } })
            ctx.body = { code: 200, message: '成功删除用户' }
        }
    }
}