import * as propTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import styles from "./VerticalNav.module.scss"

const VerticalNav = (props) => {

    return (
        <div
            className={classNames(styles.VerticalNav)}>
            <div className={styles.navItem}>first</div>
            <div className={styles.navItem}>second</div>
            <div className={styles.navItem}>third</div>
        </div>
    )
}
VerticalNav.propTypes = {
    className: propTypes.string,
}
export default React.memo(VerticalNav)