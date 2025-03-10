import express, { Express } from 'express'
import { PORT } from './secrets'
import cors from 'cors'
//routes
import recipesRoutes from './routes/recipes'
import recipeRoutes from './routes/recipe'

const app: Express = express()
app.use(cors())

app.use('/', recipesRoutes)
app.use('/', recipeRoutes)

app.listen(PORT, () => console.log('listen port 4000'))
