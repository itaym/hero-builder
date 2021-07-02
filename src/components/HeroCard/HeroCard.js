import * as propTypes from 'prop-types'
import React, {useCallback} from 'react'
import styles from './HeroCard.module.scss'
import {EVENT_HERO_CLICK, NO_AVATAR_IMG_URL, NO_AVATAR_X_IMG_URL} from '../../constants'
import {dispatcher} from "react-dispatch";
import classNames from "classnames";

const HeroCard = ({ className, hero, index }) => {
    const onImageError = e => e.target.src = NO_AVATAR_X_IMG_URL
    const onClick = useCallback(() => dispatcher.dispatch(EVENT_HERO_CLICK, index), [index])
    return (
        <div
            className={classNames(styles.HeroCard, className)}
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
    className: propTypes.any,
    hero: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
        image: propTypes.string,
        skills: propTypes.arrayOf( propTypes.shape({
            name: propTypes.string,
            value: propTypes.number
        }))

    }),
    index: propTypes.number
}
export default React.memo(HeroCard)