const config = require("./config");

/**
 * For more OpenAPI 3.0 documentation,
 * visit this documentation from swagger.io: https://swagger.io/docs/specification/basic-structure/
 */

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Express API with Swagger",
    version: "0.1.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "IrDaSt",
      url: "https://website.url",
      email: "email@gmail.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`,
    },
  ],
  components: {
    examples: {
      Post: {
        value: {
          id_post: "asdlkjdfd-dfkjhdfkjh",
          title_post: "Sebuah judul post",
          description_post: "Ini deskripsi dari post",
          created_at: "2021-12-21T12:19:16.000Z",
          updated_at: "2021-12-21T12:19:16.000Z",
        },
      },
      Posts: {
        value: [
          {
            id_post: "asdlkjdfd-dfkjhdfkjh",
            title_post: "Sebuah judul post",
            description_post: "Ini deskripsi dari post",
            created_at: "2021-12-21T12:19:16.000Z",
            updated_at: "2021-12-21T12:19:16.000Z",
          },
          {
            id_post: "asdlkjdfd-dfkjhdfkjh",
            title_post: "Sebuah judul post",
            description_post: "Ini deskripsi dari post",
            created_at: "2021-12-21T12:19:16.000Z",
            updated_at: "2021-12-21T12:19:16.000Z",
          },
        ],
      },
    },
    schemas: {
      Post: {
        type: "object",
        properties: {
          id_post: {
            type: "string",
          },
          title_post: {
            type: "string",
          },
          description_post: {
            type: "string",
          },
          created_at: {
            type: "string",
          },
          updated_at: {
            type: "string",
          },
        },
      },
      Posts: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Post",
        },
      },
      InsertPost: {
        type: "object",
        properties: {
          title_post: {
            type: "string",
            required: true,
          },
          description_post: {
            type: "string",
          },
        },
        required: ["title_post"],
      },
    },
  },
  paths: {
    "/posts": {
      get: {
        tags: ["Posts"],
        summary: "Return list of posts",
        description: "Return list of posts in array of objects",
        parameters: [
          {
            in: "query",
            name: "id_post",
            schema: {
              type: "string",
              example: "put-id-post-here",
            },
          },
        ],
        responses: {
          200: {
            description: "JSON array of posts",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Posts",
                },
                examples: {
                  one: {
                    $ref: "#/components/examples/Posts",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/posts/create": {
      post: {
        tags: ["Posts"],
        summary: "Create new post",
        description: "Create new post item",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/InsertPost",
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/InsertPost",
              },
            },
            "multipart/formdata": {
              schema: {
                $ref: "#/components/schemas/InsertPost",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerConfig;
