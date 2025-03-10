'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    const handleRoute = () => {
        router.push('/recipes')
    }
    return (
        <div className={styles.page}>
            <button className={styles.route_button} onClick={handleRoute}>
                Get recipes
            </button>
        </div>
    )
}
