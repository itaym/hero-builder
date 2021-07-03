import 'react-rangeslider/lib/index.css';
import Page from '../Page'
import React, { useCallback, useState } from 'react'
import Slider from 'react-rangeslider'
import styles from './PageSkills.module.scss'
import { dispatcher } from 'react-dispatch'
import {
    EVENT_NAV_CLICK,
    STAGE_HERO_SELECTION, STAGE_HERO_RESULT, PROPTYPES_HERO, STAGE_SKILL_EDIT
} from '../../constants'
import Image from "../Image/Image";

function PageSkills({ selectedHero }) {
    const onButtonClick = useCallback(() => dispatcher.dispatch(EVENT_NAV_CLICK, STAGE_HERO_RESULT), [])
    const [tmpSkills, setTmpSkills] = useState(selectedHero && selectedHero.skills.map(skill => skill.value))
    const remainingPoints = 100 - tmpSkills.reduce((a, b)=> a + b, 0)

    const onChange = currentSkillIndex => (value) => {

        const workArray = selectedHero.skills.map(skill => skill.value)
        const ratioArray = workArray.map(skill => skill / 100)

        workArray[currentSkillIndex] = value

        let skillLoopIndex = 0
        let totalScore = workArray.reduce((a, b) => a + b, 0)

        if (totalScore > 100) {
            /**
             Floating points in JS can give you hell:
             */
            do {
                if (skillLoopIndex >= workArray.length) skillLoopIndex = 0;
                if (skillLoopIndex !== currentSkillIndex && workArray[skillLoopIndex] > 0) {
                    workArray[skillLoopIndex] -= ratioArray[skillLoopIndex]
                    workArray[skillLoopIndex] = Math.max(workArray[skillLoopIndex], 0)
                    totalScore -= ratioArray[skillLoopIndex]
                }
                skillLoopIndex++
            } while (totalScore > 100.00001)

            workArray.forEach((value, index) => {
                /**
                 Rounding the results can end it three ways:
                 1. Total score is 100 - cool.
                 2. Total score is less from 100 (By max no. of skills) - need to handle
                 3. Total score is greater from 100 (Same as no. 2)
                 */
                workArray[index] = Math.round(value)
            })
            totalScore = workArray.reduce((a, b) => a + b, 0)
            /**
             Handling difference from 100 at this point may result in ratio difference
             */
            while (totalScore > 100) {
                if (skillLoopIndex >= workArray.length) skillLoopIndex = 0;
                if (workArray[skillLoopIndex] > 0) {
                    workArray[skillLoopIndex]--
                    totalScore--
                }
                skillLoopIndex++
            }
            while (totalScore < 100) {
                if (skillLoopIndex >= workArray.length) skillLoopIndex = 0;
                if (workArray[skillLoopIndex] > 0) {
                    workArray[skillLoopIndex]++
                    totalScore++
                }
                skillLoopIndex++
            }
        }
        setTmpSkills([...workArray])
    }
    const onChangeComplete = () => {
        selectedHero.skills = selectedHero.skills.map((skill, index) => ({...skill, value:tmpSkills[index]}))
        //Refresh menu active items
        dispatcher.dispatch(EVENT_NAV_CLICK, STAGE_SKILL_EDIT)
    }
    return (
        <Page
            currentStage={STAGE_HERO_SELECTION}
            title="Fine Tune Your Skills">
            <div
                className={styles.heroSkillsHolder}>
                <Image
                    className={styles.heroBackground}
                    src={selectedHero.image}
                    style={{ opacity: (100 - remainingPoints) / 100}} />
                <h2>Remaining Points: {remainingPoints}</h2>
                {tmpSkills.map((skill, index) => {
                    return (
                        <div
                            className={styles.heroSkillRow}
                            key={`skill_${selectedHero.skills[index].name}`}>
                            <h3>{selectedHero.skills[index].name}</h3>
                            <Slider
                                min={0}
                                max={100}
                                orientation="horizontal"
                                color="red"
                                onChangeComplete={onChangeComplete}
                                onChange={onChange(index)}
                                defaultValue={skill}
                                value={skill} />
                        </div>
                    )
                })}
            </div>
            <div className="pageButton">
                <button
                    disabled={remainingPoints !== 0}
                    onClick={onButtonClick}>Finish</button>
            </div>
        </Page>
    );
}

PageSkills.propTypes = {
    selectedHero: PROPTYPES_HERO,
}
export default React.memo(PageSkills);
