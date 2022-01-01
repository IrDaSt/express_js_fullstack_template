const Posts = require("../entities/Posts.entity");
const helper = require("../../helper");
const typeormconn = require("../typeorm");

const getAllPosts = async () => {
  const result = await typeormconn.connection1.getRepository(Posts).find();
  return result;
};

const getOnePostById = async (id_post) => {
  const result = await typeormconn.connection1
    .getRepository(Posts)
    .findOne({ id_post });
  return result;
};

const create = async ({ title_post, description_post }) => {
  const id_post = helper.generateUUIDV4();
  const result_insert = await typeormconn.connection1
    .getRepository(Posts)
    .insert({
      id_post: id_post,
      title_post,
      description_post,
    });
  return result_insert;
};

const update = async ({ id_post, title_post, description_post }) => {
  const result_update = await typeormconn.connection1
    .getRepository(Posts)
    .update(
      { id_post },
      {
        title_post,
        description_post,
        updated_at: new Date(),
      }
    );
  return {
    update_data: await getOnePostById(id_post),
    result: result_update,
  };
};

const deleteOneById = async (id_post) => {
  const target = await getOnePostById(id_post);
  const result_delete = await typeormconn.connection1
    .getRepository(Posts)
    .delete({ id_post });
  return {
    delete_data: target,
    result: result_delete,
  };
};

const postsServices = {
  getAllPosts,
  getOnePostById,
  create,
  update,
  deleteOneById,
};

module.exports = postsServices;
