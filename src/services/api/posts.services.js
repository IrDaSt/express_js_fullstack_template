const { PostsEntity } = require("../../models/entities/Posts.entity")
const typeormconn = require("../../utilities/typeorm.utils")

const getAllPosts = async () => {
  const result = await typeormconn.connection_one
    .createQueryBuilder(PostsEntity, "posts")
    .leftJoinAndSelect("posts.user_data", "user_data")
    .getMany()
  return result
}

const getOnePostById = async (id_post) => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .findOne({
      where: {
        id_post,
      },
      relations: ["user_data"],
    })
  return result
}

const create = async ({ title_post, description_post, id_user_post }) => {
  const result_insert = await typeormconn.connection_one
    .getRepository(PostsEntity)
    .insert({
      title_post,
      description_post,
      id_user_post,
    })
  return result_insert
}

const update = async ({
  id_post,
  title_post,
  description_post,
  id_user_post,
}) => {
  const edit_item = new PostsEntity()
  if (title_post !== undefined) edit_item.title_post = title_post
  if (description_post !== undefined)
    edit_item.description_post = description_post
  if (id_user_post !== undefined) edit_item.id_user_post = id_user_post
  const result_update = await typeormconn.connection_one
    .getRepository(PostsEntity)
    .update({ id_post }, edit_item)
  return result_update
}

const deleteOneById = async (id_post) => {
  const result_delete = await typeormconn.connection_one
    .getRepository(PostsEntity)
    .delete({ id_post })
  return result_delete
}

const postsServicesApi = {
  getAllPosts,
  getOnePostById,
  create,
  update,
  deleteOneById,
}

module.exports = postsServicesApi
