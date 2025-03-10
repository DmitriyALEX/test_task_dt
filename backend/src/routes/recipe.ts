import { Router } from 'express'
import { getRecipe } from '../controllers/recipe'

const recipeRoutes: Router = Router()

recipeRoutes.get('/:id', getRecipe)

export default recipeRoutes
