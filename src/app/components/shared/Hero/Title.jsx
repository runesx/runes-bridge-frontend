import React from 'react';
import styles from './Title.module.css'

const HeroTitle = ({ children }) => <h1 className={styles.title}>{children}</h1>

export default HeroTitle
