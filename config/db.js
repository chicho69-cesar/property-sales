import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbPort = +(process.env.DB_PORT) || 3306

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  port: dbPort,
  define: {
    timestamps: true,
  },
  pool: {
    max: 5, // máximo de conexiones vivas
    min: 0, // mínimo de conexiones vivas
    acquire: 30000, // tiempo que va a esperar si no conecta
    idle: 10000, // tiempo que va a esperar para cerrar conexión si no se usa
  },
  // operatorsAliases: false,
})

export default db
