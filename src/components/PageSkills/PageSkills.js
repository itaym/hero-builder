import React, { useCallback } from 'react'
import HeroCard from '../HeroCard'
import VerticalNav from '../VerticalNav'
import Page from '../Page'
import styles from './PageSelection.module.scss'
import { dispatcher } from 'react-dispatch'
import {
    EVENT_HERO_CLICK,
    STAGE_SKILL_EDIT
} from '../../constants'

function PageSelection({ header, heroes, selectedHeroIndex }) {

    const onHeroClick = useCallback(selectedHeroIndex => () => dispatcher.dispatch(EVENT_HERO_CLICK, selectedHeroIndex), [])

    return (
        <Page
            header={header}
            heroes={heroes}
            currentStage={STAGE_SKILL_EDIT}
            selectedHeroIndex={selectedHeroIndex}
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
                                onClick={onHeroClick(index)} />
                        </div>
                    )
                })}
            </VerticalNav>
        </Page>
    );
}

export default React.memo(PageSelection);
