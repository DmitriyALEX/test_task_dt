import { Request, Response } from 'express'
import { RECIPE_INFO } from '../secrets'

export const getRecipe = async (req: Request, res: Response) => {
    const { id } = req.params

    const fetchRecipe = async (id: string) => {
        let url = RECIPE_INFO

        try {
            const response = await fetch(`${url}${id}`)
            const data = await response.json()

            if (data.meals && data.meals.length > 0) {
                return data
            } else {
                throw new Error('Recipe not found')
            }
        } catch (e) {
            console.error(e)
            return []
        }
    }

    try {
        const recipe = await fetchRecipe(id)
        res.json(recipe)
    } catch (e) {
        res.status(500).json({ e })
    }
}
