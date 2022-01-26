# Express Javascript Fullstack Boilerplate

This template is made for you who don't wanna configure lengthy boilerplate for your express project.
It has several features:

1. Full Javascript Coded Server
2. Live Reload with [nodemon](https://www.npmjs.com/package/nodemon)
3. File Upload examples with [multer](https://www.npmjs.com/package/multer)
4. Automatic Swagger UI API Docs with Open API 3.0 with [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
5. Mysql2 with promise examples with [mysql2](https://www.npmjs.com/package/mysql2)
6. Database ORM with [TypeORM](https://typeorm.io/#/) examples for MariaDB MySQL database
7. View engine powered with [EJS (Embedded JavaScript templating)](https://ejs.co)
8. And much more..

# Before Start Using

Before you start using the boilerplate, you need to hava accessable MariaDB database. This is because **TypeORM** implementation needs immediate database connection unlike **mysql/promise**. After that, make a new environment variables file by creating .env file in you root project directory. The examples for .env file can be found at **.env.example**. Make sure you have properly configure the database connection.

# Start Using

Make sure to have the latest Node.js version. You can start use this template by clicking "use this template" button, or fork this repository into your own, or download zipped repository.

After that, open a new terminal inside your project directory.

If you haven't already, install **node-sass**, and **nodemon** globally by typing this line at your terminal.

    npm i -g node-sass nodemon

After finishing installing necessary global modules, you can start install all necessary module automatically by typing this line at your terminal.

    npm i

Create a new **.env** files in your root directory and you can see the examples in **.env.example**. Make sure you have the **database** configured in your localhost. After that you can run you application by typing this line at your terminal.

    npm run dev

# SCSS Watch

For using scss as your main styling, for the best practices the system will only compile the **main.scss** file inside **public/scss/main.scss**. If you need more scss files, you can include it in the **main.scss** file. To make the scss files compiled automatically, you need to run a separate terminal in the same project directory, after that type this line at your terminal.

    npm run dev:scss:watch

After that, the scss files will be compiled every detected change to **public/dist/scss-css/** folder.

# Production Build

To build a production ready project, at first, you just need to run this line at your terminal.

    npm run build

This will built an optimized project without changing the purpose of the code. After that, set the **NODE_ENV** inside the **.env** file to **production**, and then run this line at your terminal.

    npm run start

And your application already deployed!

# Swagger UI Implementation

After running the server, you can access the api documentation built with [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) on route `/api-docs`.

The configuration file can be found at your directory `/swagger/swagger-config.js`. This api documentation built with OpenAPI 3.0 format.

---

© Copyright by IrDaSt 2022.
