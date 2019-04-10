const mysql = require("mysql");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: "3306",
  database: "owl-mysql"
});

const query = function(sql: string, value?: any) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err: string, conn: any) => {
      if (err) {
        reject(err);
      } else {
        if (value) {
          conn.query(sql, value, (err: any, rel: any, fields: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(rel);
            }
          });
        } else {
          conn.query(sql, (err: any, rel: any, fields: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(rel);
            }
          });
        }
      }
      conn.release();
    });
  });
};

function createUserTable(con: any) {
  const sql = `CREATE TABLE IF NOT EXISTS user (
    userid VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (userid)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
  con.query(sql, (err: string, rel: any) => {
    if (err) throw err;
  });
}

export default query;
