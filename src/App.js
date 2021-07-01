import HeroCard from "./components/HeroCard"
import VerticalNav from "./components/VerticalNav"
import styles from './App.module.scss'
import {API_URL, STAGE_HERO_RESULT, STAGE_HERO_SELECTION, STAGE_SKILL_EDIT} from './constants'
import { useEffect, useState } from "react"

const navigationData = [
    'Class', 'Skills', 'Results'
]
const initialState = {
    heroes: [
        { id: 0, name: '', skills: [], image: ''},
        { id: 1, name: '', skills: [], image: ''},
        { id: 2, name: '', skills: [], image: ''}],
    selectedHero: -1,
    currentStage: STAGE_HERO_SELECTION
}

function App() {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const getHeroes = async () => {
            const response = await fetch(`${API_URL}/heroes`)
            return (await response.json()).heroes
        }
        getHeroes()
            .then(heroes => {
                heroes.forEach(hero => {
                    // Normalize data
                    hero.image = hero.image ? `${API_URL}${hero.image}` : ''
                    hero.skills.forEach( skill => {
                        skill.value = 0
                    })
                })
                // Simulate delay
                setTimeout(setState,1000, {...state, heroes})
            })
            .catch((e) => alert(e))
    }, [])
    const onHeroClick = selectedHero => () => setState({...state, selectedHero})

    const { currentStage, heroes, selectedHero} = state
    const allStages = [STAGE_HERO_RESULT, STAGE_HERO_SELECTION, STAGE_SKILL_EDIT]
    const selectStage = [STAGE_HERO_SELECTION]
    return (
        <div className={styles.globalApp}>
            <div className={styles.globalContainer}>
                <VerticalNav
                    active={selectedHero > -1 ? allStages   : selectStage}
                    selected={currentStage}>
                    <div>Class</div>
                    <div>Skills</div>
                    <div>Result</div>
                </VerticalNav>
                <div className={"pageTitle"}>
                    <h1>Create Your Hero!</h1>
                </div>
                <VerticalNav
                    active={new Array(heroes.length).fill(0).map((_, index) => index)}
                    className={styles.heroCardsHolder}
                    selected={selectedHero}>
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
            </div>
        </div>
    );
}

export default App;
