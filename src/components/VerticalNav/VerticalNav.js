import * as propTypes from "prop-types"
import React from "react"
import classNames from "classnames"
import styles from "./VerticalNav.module.scss"

const VerticalNav = ({ active, className, children, selected }) => {

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
    active: propTypes.arrayOf(propTypes.number),
    className: propTypes.arrayOf(propTypes.string),
    selected: propTypes.arrayOf(propTypes.number),
}
export default React.memo(VerticalNav)