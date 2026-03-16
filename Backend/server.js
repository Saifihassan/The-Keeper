require('dotenv').config()  
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()
const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})