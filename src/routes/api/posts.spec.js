const { describe } = require("mocha")
const { assert, expect } = require("chai")
const { StatusCodes } = require("http-status-codes")
const { TestFactory } = require("../../test/factory")
const jsonUtils = require("../../utilities/json.utils")
const postsServicesApi = require("../../services/api/posts.services")

describe("Testing post api", () => {
  const factory = new TestFactory()

  before(async () => {
    await factory.init()
  })

  after(async () => {
    await factory.close()
  })

  let created_id_post = ""
  let user_token = ""
  it("responds with all posts", async () => {
    const test = await factory.app
      .get("/api/posts")
      .set("Accept", "application/json")
      .expect(StatusCodes.OK)
    const data = jsonUtils.strthenparse(test.body.data)
    assert.isArray(data, "posts is not array")
    const list_post = jsonUtils.strthenparse(
      await postsServicesApi.getAllPosts(),
    )
    expect(data).to.eql(list_post, "posts is not deep equal")
  }).timeout(5000)

  it("should error authorization", async () => {
    await factory.app
      .post("/api/posts/create")
      .set("Accept", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it("should error validation register", async () => {
    await factory.app
      .post("/api/auth/register")
      .set("Accept", "application/json")
      .expect(StatusCodes.BAD_REQUEST)
  })

  it("should success register", async () => {
    const test = await factory.app
      .post("/api/auth/register")
      .send({
        email: "dummyfakeemail1908237491872364@gmail.com",
        password: "stupiddummypasswordhere",
        name: "I am dummy person",
      })
      .set("Accept", "application/json")
      .expect(StatusCodes.OK)
    expect(test.body.data.token)
    user_token = test.body.data.token
  }).timeout(5000)

  it("should error validation new post", async () => {
    await factory.app
      .post("/api/posts/create")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(StatusCodes.BAD_REQUEST)
  })

  it("should create new post", async () => {
    const test = await factory.app
      .post("/api/posts/create")
      .send({
        title_post: "test new post",
        description_post: "test description new post",
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(StatusCodes.CREATED)
    expect(test.body.data.identifiers[0].id_post, "id not created")
    created_id_post = test.body.data.identifiers[0].id_post
  }).timeout(5000)

  it("should get the created post", async () => {
    const test = await factory.app
      .get(`/api/posts?id_post=${created_id_post}`)
      .set("Accept", "application/json")
      .expect(StatusCodes.OK)
    const data = jsonUtils.strthenparse(test.body.data)
    assert.isObject(data, "post is not object")
    const target_post = jsonUtils.strthenparse(
      await postsServicesApi.getOnePostById(created_id_post),
    )
    expect(data).to.eql(target_post, "post is not deep equal")
  }).timeout(5000)

  it("should fail to delete created post without user token", async () => {
    await factory.app
      .delete(`/api/posts/delete`)
      .set("Accept", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it("should fail delete created post without id_post", async () => {
    await factory.app
      .delete(`/api/posts/delete`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(StatusCodes.BAD_REQUEST)
  })

  it("should delete created post", async () => {
    await factory.app
      .delete(`/api/posts/delete?id_post=${created_id_post}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(StatusCodes.OK)
    created_id_post = ""
  })

  it("should fail delete user forbidden", async () => {
    await factory.app
      .delete(`/api/auth/delete`)
      .set("Accept", "application/json")
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it("should delete user", async () => {
    await factory.app
      .delete(`/api/auth/delete`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${user_token}`)
      .expect(StatusCodes.OK)
    user_token = ""
  })
})
