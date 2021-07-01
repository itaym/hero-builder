import styles from "./HeroCard.module.scss";
import * as propTypes from "prop-types";
import React from "react";
import { NO_AVATAR_IMG_URL, NO_AVATAR_X_IMG_URL } from '../../constants'

const HeroCard = ({ hero, onClick }) => {
    const onImageError = e => {
        e.target.src = NO_AVATAR_X_IMG_URL
    }
    return (
        <div
            className={styles.HeroCard}
        onClick={onClick}>
            <span
                className={styles.heroName}>{hero.name || <div className={styles.emptyName} />}</span>
            <img
                className={styles.heroImage} alt={hero.name} src={hero.image || NO_AVATAR_IMG_URL}
                onError={onImageError} />
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
    onClick: propTypes.func
}
export default React.memo(HeroCard)