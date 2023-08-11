import express, { Express } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv'
import routes from './router';
import User from './Models/User';
import Post from './Models/Post';
dotenv.config()

const app: Express = express(); 

// Tomo las variables de entorno para la configuración de la base de datos
const dbHost = process.env.DBHOST
const dbPassword = process.env.DBPASSWORD
// Hago la conexión con la base de datos
const sequelize: Sequelize = new Sequelize('blog', 'postgres', dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false,
    },
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

// Inicializo los modelos con sequelize
export const Users: any = User(sequelize);
export const Posts: any = Post(sequelize);

// Establezco la relación de uno a muchos entre Usuario y Posts
Users.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(Users, { foreignKey: 'user_id' });

// Sincronizo la base de datos e inicializo el servidor
sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Successful sync with database');
    })
    .catch((error: Error) => {
        console.log('Cannot sync with database:', error);
    }); 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



