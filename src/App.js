import HeroCard from "./components/HeroCard"
import VerticalNav from "./components/VerticalNav"
import styles from './App.module.scss'
import { API_URL } from './constants'
import { useEffect, useState } from "react"

const initialState = {
    heroes: [
        { id: 0, name: '', skills: [], image: ''},
        { id: 1, name: '', skills: [], image: ''},
        { id: 2, name: '', skills: [], image: ''}],
    selectedHero: null,
    currentStage: 7
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
                    hero.image = hero.image ? `${API_URL}${hero.image}` : ''
                    hero.skills.forEach( skill => {
                        skill.value = 0
                    })
                })
                setTimeout(setState,2000, {...state, heroes})
            })
            .catch((e) => alert(e))
    }, [])
    return (
        <div className={styles.globalApp}>
            <div className={styles.globalContainer}>
                <div>
                    <VerticalNav />
                </div>
                <div className={"pageTitle"}>
                    <h1>Create Your Hero!</h1>
                </div>
                <div className={styles.heroCardsHolder}>
                    {state.heroes.map((hero)=>{
                        return (
                        <div
                            key={`hero_id_${hero.id}`}
                            className={styles.heroCardHolder}>
                            <HeroCard
                                hero={hero} />
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
