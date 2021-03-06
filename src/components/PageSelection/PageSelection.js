import * as propTypes from 'prop-types'
import React, { useCallback } from 'react'
import HeroCard from '../HeroCard'
import VerticalNav from '../VerticalNav'
import Page from '../Page'
import styles from './PageSelection.module.scss'
import { dispatcher } from 'react-dispatch'
import {
    EVENT_NAV_CLICK, PROPTYPES_HERO,
    STAGE_HERO_SELECTION, STAGE_SKILL_EDIT
} from '../../constants'

function PageSelection({ heroes, selectedHero }) {

    const selectedHeroIndex = heroes.findIndex(hero => hero === selectedHero)
    const onButtonClick = useCallback(() => dispatcher.dispatch(EVENT_NAV_CLICK, STAGE_SKILL_EDIT), [])
    return (
        <Page
            currentStage={STAGE_HERO_SELECTION}
            title="Create Your Hero!">
            <VerticalNav
                activeList={new Array(heroes.length).fill(0).map((_, index) => index)}
                className={styles.heroCardsHolder}
                selected={selectedHeroIndex}>
                {heroes.map((hero, index) => {
                    return (
                        <div
                            className={styles.heroCardHolder}
                            key={`hero_id_${hero.id}`}>
                            <HeroCard
                                hero={hero}
                                index={index} />
                        </div>
                    )
                })}
            </VerticalNav>
            <div className="pageButton">
                <button
                    onClick={onButtonClick}
                    disabled={!selectedHero}>Next</button>
            </div>
        </Page>
    );
}

PageSelection.propTypes = {
    heroes: propTypes.arrayOf(PROPTYPES_HERO),
    selectedHero: PROPTYPES_HERO,
}
export default React.memo(PageSelection);
