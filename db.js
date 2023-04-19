const sql = require('mssql');

// TODO Change this so credentials information is taken from the environment variables
const config = {
  user: 'your-username',
  password: 'your-password',
  server: 'your-server',
  database: 'your-database',
  options: {
    encrypt: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql,
  poolPromise,
};
