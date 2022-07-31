import React from 'react'
import styles from './styles.module.css'

const Features = ({title, text}) => {
  return (
    <div className={styles.card}>
        <h1>{title}</h1>
        <p>{text}</p>
        </div>
  )
}

export default Features