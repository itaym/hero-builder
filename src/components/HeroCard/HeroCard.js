import styles from "./HeroCard.module.scss";
import * as propTypes from "prop-types";
import React from "react";

const HeroCard = ({ hero }) => {
    const noAvatar = '/no_avatar.png'
    return (
        <div
            className={styles.HeroCard}>
            <span
                className={styles.heroName}>{hero.name || <div className={styles.emptyName} />}</span>
            <img
                className={styles.heroImage} alt={hero.name} src={hero.image || noAvatar} />
        </div>
    )
}
HeroCard.propTypes = {
    hero: propTypes.objectOf({
        id: propTypes.Number,
        name: propTypes.String,
        image: propTypes.String,
        skills: propTypes.arrayOf({
            name: propTypes.String,
            value: propTypes.Number
        })

    }),
}
export default React.memo(HeroCard)