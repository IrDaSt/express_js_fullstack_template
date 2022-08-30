const { EntitySchema } = require("typeorm")

const UserEntity = new EntitySchema({
  name: "User", // Will use table name `user` as default behaviour.
  tableName: "user", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    id_user: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    link_foto: {
      type: "varchar",
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
  relations: {
    list_post: {
      target: "Posts",
      type: "one-to-many",
      inverseSide: "user_data",
      joinColumn: {
        name: "id_user",
      },
    },
  },
})

module.exports = { UserEntity }
