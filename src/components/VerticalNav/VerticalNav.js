import * as propTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import styles from "./VerticalNav.module.scss"

const VerticalNav = ({ data, active, selected }) => {

    return (
        <div
            className={styles.VerticalNav}>
            {(data || []).map((navName, index) => {
                const className = classNames(
                    styles.navItem,
                    index === selected ? styles.navSelected : '',
                    !active.includes(index) ? styles.navItemDisabled: '')
                return (
                <div
                    className={className}
                    key={`nav_${index}`}>{navName}</div>
                )
            })}
        </div>
    )
}
VerticalNav.propTypes = {
    data: propTypes.arrayOf(propTypes.string),
}
export default React.memo(VerticalNav)