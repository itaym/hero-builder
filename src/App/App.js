import PageSelection from '../components/PageSelection'
import PageResult from '../components/PageResult'
import PageSkills from '../components/PageSkills'
import { dispatcher } from 'react-dispatch'
import React, { useEffect, useCallback, useState } from 'react'
import TopMenu from '../components/TopMenu'
import {
    API_URL,
    EVENT_HERO_CLICK, EVENT_NAV_CLICK, STAGE_HERO_RESULT,
    STAGE_HERO_SELECTION, STAGE_SKILL_EDIT
} from '../constants'
import styles from './App.module.scss';

const PagesMap = {
    [STAGE_HERO_SELECTION] : PageSelection,
    [STAGE_SKILL_EDIT] : PageSkills,
    [STAGE_HERO_RESULT] : PageResult,
}
const initialState = {
    heroes: [
        { id: 0, name: '', skills: [], image: ''},
        { id: 1, name: '', skills: [], image: ''},
        { id: 2, name: '', skills: [], image: ''}],
    selectedHero: null,
    currentStage: STAGE_HERO_SELECTION
}

function App() {
    const [state, setState] = useState(initialState)

    const fetchData = useCallback(() => {
        const getHeroes = async () => {
            const response = await fetch(`${API_URL}/heroes`)
            return (await response.json()).heroes
        }
        (async () => {
            try {
                const heroes = await getHeroes()
                heroes.forEach(hero => {
                    // Normalize data
                    hero.image = hero.image ? `${API_URL}${hero.image}` : ''
                    hero.skills.forEach(skill => {
                        skill.value = 0
                    })
                })
                // Simulate delay
                setTimeout(setState, 2000, {...initialState, heroes})
            }
            catch (e) {
                alert(e)
            }
        })()
    }, [])

    /**
     Using two useEffect function. The first one will operate only ONCE and it's purpose is to fetch the data.
     That's why it has a dependency of an empty array. No dependency at all will cause it to operate
     after each render. The second useEffect function purpose is to initiate the dispatcher and it SHOULD
     operate after each change to the state after setState is called.
     * */
    useEffect(() => {
        // Start fetching data
        fetchData();
    }, [])

    useEffect(() => {
        // Handle cross components events
        const onHeroClickEvent = heroIndex =>  setState({...state, selectedHero: state.heroes[heroIndex]})
        const onNavClickEvent = currentStage => setState({...state, currentStage})

        dispatcher.on(EVENT_HERO_CLICK, onHeroClickEvent);
        dispatcher.on(EVENT_NAV_CLICK, onNavClickEvent);
        return () => {
            dispatcher.off(EVENT_HERO_CLICK)
            dispatcher.off(EVENT_NAV_CLICK)
        }
    }, [state])

    const { currentStage, heroes, selectedHero} = state
    const StagePage = PagesMap[currentStage]

    const allStages = [STAGE_HERO_RESULT, STAGE_HERO_SELECTION, STAGE_SKILL_EDIT]
    const selectionStage = [STAGE_HERO_SELECTION]

    return (
        <div className={styles.globalContainer}>
            <TopMenu
                activeList={selectedHero ? allStages : selectionStage}
                currentSelected={currentStage} />
            <StagePage
                heroes={heroes}
                currentStage={currentStage}
                selectedHero={selectedHero} />
        </div>
    );
}

export default App;
