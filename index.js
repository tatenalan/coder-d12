const express = require("express");
const mongoose = require('mongoose');
const ServiceException = require("./exceptions/ServiceException");

// rutas
const productRouterApi = require('./routes/api/productRouter');
const productRouter = require('./routes/web/productRouter');
const messageRouterApi = require('./routes/api/messageRouter');
const messageRouter = require('./routes/web/messageRouter');

// plantillas
const handlebars = require('express-handlebars');

// para usar sesiones
const session = require('express-session')

// para guardar los datos de sesion en un file dentro de la carpeta sessions
const sessionFile = require('session-file-store');
const FileStore = sessionFile(session)

// para guardar los datos de sesion en Mongo Atlas
const MongoStore = require('connect-mongo')

// modelos
const Message = require("./models/Message");
const User = require("./models/User");

// para utilizar websockets
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io')





//------------------------------------------------------------------------
// configuro la DB

// Mongo DB local
// const URL = "mongodb://localhost:27017/desafio11";
// mongoose.connect(URL, () => console.log(`MongoDB connected`))

// Mongo Atlas
const URL = "mongodb+srv://coder12:coder12@cluster0.obxgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},err => {
    if(err) console.log(`Error connecting Mongo Atlas ${err}`)
    console.log(`Mongo Atlas connected`)
})




//------------------------------------------------------------------------
// instancias

const app = express();

// chat
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// session. 
// Usamos FileStore para persistir la sesión en desarrollo. (por los reinicios del server)
// o bien Mongostore.Create para persistir en la DB de la nube
// para mantener la sesion viva si el usuario esta activo, colocar rolling: true y resave: true
app.use(session({
    // store: new FileStore(),
    store: MongoStore.create({mongoUrl: URL}),
    secret: 'secreto',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 60 segundos
}))






//------------------------------------------------------------------------
// configuro el servidor

//PORT - Server
const PORT = process.env.PORT || 8080;
// Arrancamos el servidor con http.listen() en lugar de app.listen()
const server = httpServer.listen(PORT, () => console.log(`Running on ${PORT}`))
server.on('error', error => console.log(`Error on server ${error}`))




// middlewares

function auth(req, res, next) {
    if(req.session.username) {
        return next();
    }
    return res.status(401).send('error de autorización')
}

//------------------------------------------------------------------------
// Llamo a las rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configura nuestro directorio estático
app.use(express.static(__dirname + '/public'));

// defino el motor de plantillas (habdlebars)
app.engine('handlebars', handlebars.engine())
// especifica la carpeta de plantillas (handlebars)
app.set('views', './public')
app.set('view engine', 'handlebars')


app.use('/api/products', productRouterApi)
app.use('/products', productRouter)
app.use('/api/messages', messageRouterApi)
app.use('/messages', messageRouter)

//------------------------------------------------------------------------
// rutas de autenticacion

// LOGIN
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({username:username})
  
    if(!user || user.password != password) {
        return res.send('login-error')
    }

    req.session.username = username
    req.session.contador = 0

    res.redirect('/products')
})

// LOGOUT
app.post('/logout', (req, res) => {
    res.render('bye', {username: req.session.username})
    req.session.destroy()
})

// auth only
app.get('/private', auth, (req, res) => {
    res.send('you are logged in!')
})



// ruta 404
app.get('*', (req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `The route ${req.originalUrl} with method ${req.method} does not exist`))
})








// 'connection' se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {
    console.log("usuario conectado");

    // recibimos un mensaje del front
    socket.on("newMessage", message => {
        //  lo guardamos en nuestro array de mensajes para mostrarselo a los nuevos usuarios que ingresen a través del socket "messages"
        Message.create(message)
        console.log('mensaje guardado');
        // Emitimos a todos los clientes
        io.sockets.emit("messages", message)   
    })
})