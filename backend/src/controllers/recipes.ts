import { Request, Response } from 'express'
import {
    ALL_CATEGORIES,
    ALL_AREAS,
    ALL_INGREDIENTS,
    ALL_AVIALABLE_RECIPES,
    FILTER_BY_CATEGORIES,
    FILTER_BY_AREAS,
    FILTER_BY_INGREDIENTS,
} from '../secrets'

const fetchMealDBData = async (url: string) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.meals || []
    } catch (e) {
        console.error(e)
        return []
    }
}

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const categories = await fetchMealDBData(ALL_CATEGORIES)
        const countries = await fetchMealDBData(ALL_AREAS)
        const ingredients = await fetchMealDBData(ALL_INGREDIENTS)

        const { category, country, ingredient } = req.query
        let recipeUrl = ALL_AVIALABLE_RECIPES

        if (category) {
            recipeUrl = `${FILTER_BY_CATEGORIES}${category}`
        } else if (country) {
            recipeUrl = `${FILTER_BY_AREAS}${country}`
        } else if (ingredient) {
            recipeUrl = `${FILTER_BY_INGREDIENTS}${ingredient}`
        }

        const recipes = await fetchMealDBData(recipeUrl)

        res.json({
            categories,
            countries,
            ingredients,
            recipes,
        })
    } catch (e) {
        console.error(e)
    }
}
