const { EntitySchema } = require("typeorm")

const PostsEntity = new EntitySchema({
  name: "Posts", // Will use table name `post` as default behaviour.
  tableName: "posts", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id_post: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    title_post: {
      type: "varchar",
    },
    description_post: {
      type: "text",
      nullable: true,
    },
    id_user_post: {
      type: "varchar",
    },
    created_at: {
      type: "datetime",
      default: new Date(),
    },
    updated_at: {
      type: "datetime",
      default: new Date(),
    },
  },
  relations: {
    user_data: {
      target: "User",
      type: "many-to-one",
      inverseSide: "list_post",
      joinColumn: {
        name: "id_user_post",
      },
    },
  },
})

module.exports = { PostsEntity }
