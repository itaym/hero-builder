import styles from "./HeroCard.module.scss";
import * as propTypes from "prop-types";
import React from "react";

const HeroCard = (props) => {

    return (
        <div
            className={styles.HeroCard}>
            <span
                className={styles.heroName}>Hello world</span>
        </div>
    )
}
HeroCard.propTypes = {
    className: propTypes.string,
}
export default React.memo(HeroCard)