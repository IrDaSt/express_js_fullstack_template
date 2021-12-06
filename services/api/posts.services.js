const { knex1 } = require("../knex");

const getAllPosts = async () => {
  const result = await knex1("posts").select();
  return result;
};

const getOnePostById = async (id_post) => {
  const result = await knex1("posts")
    .select()
    .where({
      id_post,
    })
    .first();
  return result;
};

const create = async ({ id_post, title_post, description_post }) => {
  const result_insert = await knex1("posts").insert({
    id_post,
    title_post,
    description_post,
  });
  return {
    insert_data: await getOnePostById(id_post),
    result: result_insert,
  };
};

const update = async ({ id_post, title_post, description_post }) => {
  const result_update = await knex1("posts")
    .update({
      title_post,
      description_post,
      updated_at: new Date(),
    })
    .where("id_post", "=", id_post);
  return {
    update_data: await getOnePostById(id_post),
    result: result_update,
  };
};

const deleteOneById = async (id_post) => {
  const target = await getOnePostById(id_post);
  const result_delete = await knex1("posts")
    .delete()
    .where("id_post", "=", id_post);
  return {
    delete_data: target,
    result: result_delete,
  };
};

module.exports = {
  getAllPosts,
  getOnePostById,
  create,
  update,
  deleteOneById,
};
