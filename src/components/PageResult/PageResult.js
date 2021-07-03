import React, { useCallback } from 'react'
import HeroCard from '../HeroCard'
import VerticalNav from '../VerticalNav'
import Page from '../Page'
import styles from './PageResult.module.scss'
import { dispatcher } from 'react-dispatch'
import {
    EVENT_NAV_CLICK, NO_AVATAR_IMG_URL, NO_AVATAR_X_IMG_URL,
    STAGE_HERO_SELECTION, STAGE_SKILL_EDIT
} from '../../constants'
import Slider from "react-rangeslider";

function PageResult({ heroes, selectedHero }) {
    const onImageError = e => e.target.src = NO_AVATAR_X_IMG_URL
    const selectedHeroIndex = heroes.findIndex(hero => hero === selectedHero)
    const onButtonClick = useCallback(() => window.location.reload(), [])
    return (
        <Page
            currentStage={STAGE_HERO_SELECTION}
            title="Your Hero Is Ready!">
            <div
                className={styles.heroHolder}>
                <img
                    className="" alt={selectedHero.name} src={selectedHero.image || NO_AVATAR_IMG_URL}
                onError={onImageError} />
                <div className={styles.heroDetails}>
                    <h2 className={styles.heroName}>{selectedHero.name}</h2>
                    {selectedHero.skills.map((skill, index) => {
                        return (
                            <div
                                key={`skill_${selectedHero.skills[index].name}`}>
                                <h3>{`${selectedHero.skills[index].value}%`} {selectedHero.skills[index].name}</h3>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className="pageButton">
                <button
                    onClick={onButtonClick}
                    disabled={!selectedHero}>Restart</button>
            </div>
        </Page>
    );
}

export default React.memo(PageResult);
