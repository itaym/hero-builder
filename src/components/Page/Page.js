import React from 'react'
import styles from './Page.module.scss'
import * as propTypes from 'prop-types'

function Page({ children, title }) {
    return (
        <div className={styles.Page}>
            <div className={styles.pageContainer}>
                <div className={"pageTitle"}>
                    <h1>{title}</h1>
                </div>
                {children}
            </div>
        </div>
    );
}

Page.propTypes = {
    title: propTypes.string,
}
export default React.memo(Page);
