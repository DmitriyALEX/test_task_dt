import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT

export const RECIPE_INFO = process.env.RECIPE_INFO

export const ALL_CATEGORIES = process.env.ALL_CATEGORIES || ''
export const ALL_AREAS = process.env.ALL_AREAS || ''
export const ALL_INGREDIENTS = process.env.ALL_INGREDIENTS || ''

export const ALL_AVIALABLE_RECIPES = process.env.ALL_AVIALABLE_RECIPES || ''

export const FILTER_BY_CATEGORIES = process.env.FILTER_BY_CATEGORIES || ''
export const FILTER_BY_AREAS = process.env.FILTER_BY_AREAS || ''
export const FILTER_BY_INGREDIENTS = process.env.FILTER_BY_INGREDIENTS || ''
