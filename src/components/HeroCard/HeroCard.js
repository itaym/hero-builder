import styles from "./HeroCard.module.scss";
import * as propTypes from "prop-types";
import React from "react";
import { NO_AVATAR, NO_AVATAR_X } from '../../constants'

const HeroCard = ({ hero }) => {
    const onImageError = e => {
        e.target.src = NO_AVATAR_X
    }
    return (
        <div
            className={styles.HeroCard}>
            <span
                className={styles.heroName}>{hero.name || <div className={styles.emptyName} />}</span>
            <img
                className={styles.heroImage} alt={hero.name} src={hero.image || NO_AVATAR}
                onError={onImageError}/>
        </div>
    )
}
HeroCard.propTypes = {
    hero: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
        image: propTypes.string,
        skills: propTypes.arrayOf( propTypes.shape({
            name: propTypes.string,
            value: propTypes.number
        }))

    }),
}
export default React.memo(HeroCard)