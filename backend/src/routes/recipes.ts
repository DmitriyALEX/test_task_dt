import { Router } from 'express'
import { getAllRecipes } from '../controllers/recipes'

const recipesRoutes: Router = Router()

recipesRoutes.get('/recipes', getAllRecipes)

export default recipesRoutes
