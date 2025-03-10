'use client'
import { useEffect, useState } from 'react'
import { Meal } from '../types/allRecipes.interface'
import { useSearchParams } from 'next/navigation'

type Params = {
    category?: string
    country?: string
    ingredient?: string
}

type Filter = {
    title?: string
    select?: string
}

export const useFetchRecepies = () => {
    const searchParams = useSearchParams()
    const [allRecipes, setAllRecipes] = useState<Meal[]>([])
    //values for dropdowns items from backend
    const [categories, setCategories] = useState<string[]>([])
    const [countries, setCountries] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<string[]>([])

    //title based on the applied filter
    const [selectedFilter, setSelectedFilter] = useState<Filter>({})

    const selectedCategory = searchParams.get('category') || ''
    const selectedCountry = searchParams.get('country') || ''
    const selectedIngredient = searchParams.get('ingredient') || ''

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL

        if (url) {
            fetch(`${url}/recipes`)
                .then((res) => res.json())
                .then((data) => {
                    setCategories(data.categories.map((item: { strCategory: string }) => item.strCategory))
                    setCountries(data.countries.map((item: { strArea: string }) => item.strArea))
                    setIngredients(data.ingredients.map((item: { strIngredient: string }) => item.strIngredient))
                })
        }
    }, [])

    useEffect(() => {
        let url = process.env.NEXT_PUBLIC_BASE_URL || ''
        const params: Params = {}
        if (selectedCategory) params.category = selectedCategory
        if (selectedCountry) params.country = selectedCountry
        if (selectedIngredient) params.ingredient = selectedIngredient

        const queryString = new URLSearchParams(params).toString()

        if (queryString) {
            url = `${`${url}/recipes`}?${queryString}`
        }

        if (url) {
            fetch(`${url}`)
                .then((res) => res.json())
                .then((data) => setAllRecipes(data.recipes))
        }
    }, [selectedCategory, selectedCountry, selectedIngredient])

    const handleFilterChange = (type: string, value: string) => {
        //title based on the applied filter
        setSelectedFilter({
            title: type,
            select: value,
        })
    }

    return {
        allRecipes,
        categories,
        countries,
        ingredients,
        selectedCategory,
        selectedCountry,
        selectedIngredient,
        selectedFilter,
        handleFilterChange,
    }
}
