import express, {Request, Response, Application} from 'express'
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import pool from './db/database'


const app :  Application = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())


app.get('/', (req : Request, res : Response ) : any => {
    return res.send(`Welcome to our node and postgres API`)
    
})

const startServer = async() => {
    try{
        // Test the connection to the database
        const client = await pool.connect();
        console.log("✅ Database connected successfully");

        client.release(); // Release the client back to the pool

        // userRouter used after the connection succeed
        app.use('/api', userRouter)
        // we start the http server
        app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`))
    }
    catch(err){
        console.error("❌ Failed to connect to the database", err);
    }
}

startServer()