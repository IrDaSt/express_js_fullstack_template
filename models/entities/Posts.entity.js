const { EntitySchema } = require("typeorm");

const PostsEntity = new EntitySchema({
  name: "Posts", // Will use table name `post` as default behaviour.
  // tableName: "posts", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id_post: {
      primary: true,
      type: "varchar",
    },
    title_post: {
      type: "varchar",
    },
    description_post: {
      type: "text",
      nullable: true,
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
});

module.exports = { PostsEntity };
