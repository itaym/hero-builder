import * as propTypes from 'prop-types'
import Image from '../Image'
import React, {useCallback} from 'react'
import classNames from 'classnames';
import styles from './HeroCard.module.scss'
import {EVENT_HERO_CLICK,PROPTYPES_HERO } from '../../constants'
import {dispatcher} from 'react-dispatch';

const HeroCard = ({ className, hero, index }) => {
    const onClick = useCallback(() => dispatcher.dispatch(EVENT_HERO_CLICK, index), [index])
    return (
        <div
            className={classNames(styles.HeroCard, className)}
            onClick={onClick}>
            <span
                className={styles.heroName}>{hero.name || <div className={styles.emptyName} />}</span>
            <Image alt={hero.name} src={hero.image} />
        </div>
    )
}
HeroCard.propTypes = {
    className: propTypes.any,
    hero: PROPTYPES_HERO,
    index: propTypes.number
}
export default React.memo(HeroCard)