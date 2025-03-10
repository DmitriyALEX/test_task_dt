'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'

import { useFetchRecepies } from '../../../hooks/useFetchRecepies'

const RecipeList = () => {
    const router = useRouter()

    const {
        allRecipes,
        categories,
        countries,
        ingredients,
        selectedCategory,
        selectedCountry,
        selectedIngredient,
        selectedFilter,
        handleFilterChange,
    } = useFetchRecepies()

    const handleFilterChangeRouting = (type: string, value: string) => {
        const params = new URLSearchParams()
        if (type === 'category') params.set('category', value)
        if (type === 'country') params.set('country', value)
        if (type === 'ingredient') params.set('ingredient', value)

        router.push(`/recipes?${params.toString()}`)

        handleFilterChange(type, value)
    }

    return (
        <section>
            {/* FILTERS SECTION */}
            <div className={styles.filter_container}>
                <select
                    value={selectedCategory}
                    onChange={e => {
                        handleFilterChangeRouting('category', e.target.value)
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCountry}
                    onChange={e => {
                        handleFilterChangeRouting('country', e.target.value)
                    }}
                >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedIngredient}
                    onChange={e => {
                        handleFilterChangeRouting('ingredient', e.target.value)
                    }}
                >
                    <option value="">All Ingredients</option>
                    {ingredients.map(ing => (
                        <option key={ing} value={ing}>
                            {ing}
                        </option>
                    ))}
                </select>
            </div>

            {/* SELECTED FILTER */}
            <section className={styles.title_container}>
                <h2>
                    <>
                        {selectedFilter.title || selectedFilter.select ? (
                            <>
                                <span>{selectedFilter.title}</span>&nbsp;<span>{selectedFilter.select}</span>
                            </>
                        ) : allRecipes.length === 0 ? (
                            <>No items</>
                        ) : (
                            <>All Recipes</>
                        )}
                    </>
                </h2>
            </section>

            {/* MAIN CONTENT */}
            <main className={styles.meal_container}>
                {allRecipes.map(recipe => (
                    <div key={recipe.idMeal} className={styles.meal_item}>
                        <Link href={`/${recipe.idMeal}`} className={styles.link_container}>
                            <h1 className={styles.meal_title}>{recipe.strMeal}</h1>
                            <Image src={recipe.strMealThumb} alt={recipe.strMeal} width={100} height={100} />
                            <p className={styles.meal_category_area}>
                                {recipe.strCategory} - {recipe.strArea}
                            </p>
                            <p>{recipe.strInstructions}</p>
                        </Link>
                    </div>
                ))}
            </main>
        </section>
    )
}

export default RecipeList
