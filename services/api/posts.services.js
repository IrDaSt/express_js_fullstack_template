const { PostsEntity } = require("../../models/entities/Posts.entity");
const typeormconn = require("../../utilities/typeorm.utils");

const getAllPosts = async () => {
  const result = await typeormconn.connection1
    .createQueryBuilder(PostsEntity, "posts")
    .leftJoinAndSelect("posts.user_post", "user_post")
    .select([
      "posts",
      "user_post.id_user",
      "user_post.name",
      "user_post.email",
      "user_post.link_foto",
      "user_post.created_at",
      "user_post.updated_at",
    ])
    .getMany();
  return result;
};

const getOnePostById = async (id_post) => {
  const result = await typeormconn.connection1
    .createQueryBuilder(PostsEntity, "posts")
    .leftJoinAndSelect("posts.user_post", "user_post")
    .select([
      "posts",
      "user_post.id_user",
      "user_post.name",
      "user_post.email",
      "user_post.link_foto",
      "user_post.created_at",
      "user_post.updated_at",
    ])
    .where("posts.id_post = :id_post", { id_post })
    .getOne();
  return result;
};

const create = async ({ title_post, description_post }) => {
  const result_insert = await typeormconn.connection1
    .getRepository(PostsEntity)
    .insert({
      title_post,
      description_post,
    });
  return result_insert;
};

const update = async ({ id_post, title_post, description_post }) => {
  const result_update = await typeormconn.connection1
    .getRepository(PostsEntity)
    .update(
      { id_post },
      {
        title_post,
        description_post,
        updated_at: new Date(),
      }
    );
  return result_update;
};

const deleteOneById = async (id_post) => {
  const result_delete = await typeormconn.connection1
    .getRepository(PostsEntity)
    .delete({ id_post });
  return result_delete;
};

const postsServicesApi = {
  getAllPosts,
  getOnePostById,
  create,
  update,
  deleteOneById,
};

module.exports = postsServicesApi;
