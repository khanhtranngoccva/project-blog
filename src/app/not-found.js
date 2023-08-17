import styles from './homepage.module.css'

export default function NotFound() {
    return <section className={styles.notFound}>
        <h1>Page Not Found!</h1>
        <p>Oops! We&apos;ve searched everywhere but didn&apos;t manage to find what you&apos;re looking for.</p>
    </section>
}
