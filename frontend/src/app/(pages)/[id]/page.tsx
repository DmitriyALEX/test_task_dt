'use client'
import React, { useEffect, useState, use } from 'react'
import { Meal } from '../../../types/allRecipes.interface'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'

const RecipeInfo = ({ params }: { params: Promise<{ id: string }> }) => {
    const [mealDetails, setMealDetails] = useState<Meal[]>([])
    const [category, setCategory] = useState<Meal[]>([])

    const { id } = use(params)

    //Lookup full meal details by id
    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BASE_URL
        if (url) {
            fetch(`${url}/${id}`)
                .then(res => res.json())
                .then(data => setMealDetails(data.meals || []))
        }
    }, [id])

    const currentCategory = mealDetails.length > 0 ? mealDetails[0].strCategory : ''

    useEffect(() => {
        let url = process.env.NEXT_PUBLIC_BASE_URL
        if (currentCategory && url) {
            url = `${`${url}/recipes`}?category=${currentCategory}`

            fetch(url)
                .then(res => res.json())
                .then(data => setCategory(data.recipes || []))
        }
    }, [currentCategory])

    return (
        <section className={styles.container}>
            {mealDetails.map(meal => (
                <div className={styles.recipeinfo_container} key={meal.idMeal}>
                    {/* MEAL INFO ITEM*/}
                    <div className={styles.recipeinfo_item} key={meal.idMeal}>
                        {/* MEAL IMAGE  */}
                        <div className={styles.recipeinfo_image_container}>
                            <Image src={meal.strMealThumb} alt={meal.strMeal} width={300} height={300} />
                        </div>

                        {/* name */}
                        <div className={styles.recipeinfo_description}>
                            <h1 className={styles.recipeinfo_title}>{meal.strMeal}</h1>

                            <Link
                                href={`/recipes?country=${encodeURIComponent(meal.strArea)}`}
                                className={styles.link_container}
                            >
                                <span className={styles.recipeinfo_area}>{meal.strArea}</span>
                            </Link>

                            <div className={styles.recipeinfo_instructions_container}>
                                <p className={styles.recipeinfo_instructions}>{meal.strInstructions}</p>
                            </div>

                            {/* INGREDIENTS */}
                            <div className={styles.ingredients_container}>
                                <p className={styles.ingredients_title}>Ingredients:</p>
                                <ul className={styles.ingredients_items}>
                                    {Object.keys(meal)
                                        .filter(key => key.startsWith('strIngredient') && meal[key as keyof Meal])
                                        .map(ingredient => (
                                            <li key={ingredient}>
                                                <Link
                                                    href={`/recipes?ingredient=${encodeURIComponent(
                                                        meal[ingredient as keyof Meal] as string,
                                                    )}`}
                                                    className={styles.link_container}
                                                >
                                                    <span>{meal[ingredient as keyof Meal]}</span>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <nav className={styles.sidebar}>
                        <p className={styles.sidebar_category_title}>
                            <span>Category:&nbsp;</span>
                            <Link
                                href={`/recipes?category=${encodeURIComponent(meal.strCategory)}`}
                                className={styles.link_container}
                            >
                                {meal.strCategory}
                            </Link>
                        </p>
                        {category.map(cat => (
                            <ul className={styles.sidebar_category_items} key={cat.idMeal}>
                                <li>
                                    <Link href={`/${cat.idMeal}`} className={styles.link_container}>
                                        {cat.strMeal}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </nav>
                </div>
            ))}
        </section>
    )
}

export default RecipeInfo
