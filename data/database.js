const { Sequelize, DataTypes } = require("sequelize");

// require("dotenv").config();
// const DB_HOST = process.env.DB_HOST;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_DATABASE = process.env.DB_DATABASE;
// const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize("users", "root", "208730326", {
  host: "localhost",
  dialect: "mysql",
  // define: { exmp: freezeTableName: true etc. it will be defult in all tables we will create}
});

const Userlogin = sequelize.define(
  "user_logins",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_rule: {
      type: DataTypes.INTEGER,
    },
    user_session: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },

  {
    freezeTableName: true,
    timestamps: true,
  }
);

Userlogin.sync({ alter: true })
  .then((data) => {
    console.log("table and module are synced successfully!");
  })
  .catch((err) => {
    console.log("Error syncing the table and module!");
  });

const connect = async function () {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully to database: users`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// // SELECT * FROM user_login =>

// const main = async function () {
//   let t;
//   try {
//     t = await sequelize.transaction();

// const t1 = await sequelize.transaction();
// const users = await UserLogin.findAll({ transaction: t1 });
// console.log(users.every((user) => user instanceof UserLogin)); // true
// console.log("All users:", JSON.stringify(users, null, 2));
// await t1.commit();

//     /* INSERT INTO user_logins (
//       user_name,
//       user_pwd,
//       user_mail
//     ) VALUES (
//       hodaya,
//       2222,
//       hodayaosdi@gmail.com
//     ) =>
//     */

//     // const t2 = await sequelize.transaction();
//     // const oriel = UserLogin.create({
//     //   user_name: "oriel",
//     //   user_pwd: "3333",
//     //   user_mail: "orielBelz@gmail.com",
//     // });
//     // console.log(`${String(oriel)}'s auto-generated ID:", ${oriel.id}`);
//     // await t2.commit();

// // SELECT user_name, user_mail FROM user_login =>
// const t3 = await sequelize.transaction();
// const users_cred = await UserLogin.findAll({
//   attributes: ["user_name", "user_mail"],
//   transaction: t3,
// });

//     console.log("credentials:", JSON.stringify(users_cred, null, 2));
//     await t3.commit();

//     // choosing all but not the column "user_session:" =>
//     const t4 = await sequelize.transaction();
//     const user_info = await UserLogin.findAll({
//       attributes: {
//         exclude: ["user_session"],
//       },
//       transaction: t4,
//     });
//     console.log(`info:`, JSON.stringify(user_info, null, 2));
//     await t4.commit();

//     // SELECT * FROM UserLogin WHERE id = 2;

//     const t5 = await sequelize.transaction();
//     const users_where_sql = await UserLogin.findAll({
//       where: {
//         id: 3,
//       },
//       transaction: t5,
//     });
//     console.log(
//       `where sql command example:`,
//       JSON.stringify(users_where_sql, null, 2)
//     );
//     await t5.commit();

//     const t6 = await sequelize.transaction();
//     const and_oprator = await UserLogin.findAll({
//       // you can add here "OR" beside "WHERE" if you like:
//       where: {
//         id: 1,
//         user_name: "daniel",
//       },
//       transaction: t6,
//     });
//     console.log("and_where results:", and_oprator, null, 2);
//     await t6.commit();
//   } catch (error) {
//     await t.rollback();
//   }
// };

// /*
// SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM UserLogin =>

// UserLogin.findAll({
//   attributes: {
//     include: [
//       [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
//     ]
//   }

//   all the documentation for the oprators: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
// });

// */

// main();

/* בדיקת כל הבקשות של סקוולייז נבדקו:

sequelize.authenticate().then(() => {
  console.log("connection successful!")
} catch (err) {
  console.log("Eroor connecting to the database!")
}
})

*/

module.exports = { connect, Userlogin };
