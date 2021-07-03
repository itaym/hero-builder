import Image from '../Image/Image'
import Page from '../Page'
import React, { useCallback } from 'react'
import styles from './PageResult.module.scss'
import { STAGE_HERO_SELECTION, PROPTYPES_HERO } from '../../constants'

function PageResult({ selectedHero }) {
    const onButtonClick = useCallback(() => window.location.reload(), [])
    return (
        <Page
            currentStage={STAGE_HERO_SELECTION}
            title="Your Hero Is Ready!">
            <div
                className={styles.heroHolder}>
                <Image
                    alt={selectedHero.name} src={selectedHero.image}/>
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

PageResult.propTypes = {
    selectedHero: PROPTYPES_HERO,
}
export default React.memo(PageResult);
