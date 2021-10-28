import React from 'react';
import styles from './Wrapper.module.css'

const HeroWrapper = ({ children }) => <div className={styles.wrapper}>{children}</div>

export default HeroWrapper
