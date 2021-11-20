import styles from './Header.module.css'

interface HeaderProps {
  score: number
}

export default function Header({ score }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Woodoku</div>
      <div className={styles.score}>{score}</div>
    </header>
  )
}