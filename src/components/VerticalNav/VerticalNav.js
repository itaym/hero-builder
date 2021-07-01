import * as propTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import styles from "./VerticalNav.module.scss"

const VerticalNav = ({ className, active, selected, children }) => {

    return (
        <div
            className={classNames(styles.VerticalNav, className)}>
            {(children || []).map((child, index) => {
                const className = classNames(
                    styles.navItem,
                    index === selected ? styles.navSelected : '',
                    !active.includes(index) ? styles.navItemDisabled: '')
                return (
                <div
                    className={className}
                    key={`nav_${index}`}>{child}</div>
                )
            })}
        </div>
    )
}
VerticalNav.propTypes = {
    data: propTypes.arrayOf(propTypes.string),
}
export default React.memo(VerticalNav)