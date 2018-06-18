module.exports = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = ctx.request.user.id

    const where = {
      isPublished: false,
      author: {
        id,
      },
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  getSelf(parent, args, ctx, info) {
    const { token, ...user } = ctx.request.user
    return user
  },

  getUser(parent, { id }, ctx, info) {
    return ctx.db.query.user({ where: { id } }, info)
  },

  getUserContent(parent, { id }, ctx, info) {
    const where = {
      isPublished: true,
      author: {
        id,
      },
    }

    return ctx.db.query.posts({ where }, info)
  },

  getRecentPosts(parent, args, ctx, info) {
    return ctx.db.query.posts(
      { first: 10, orderBy: 'updatedAt_DESC', where: { isPublished: true } },
      info
    )
  },
}
