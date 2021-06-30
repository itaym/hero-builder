import HeroCard from "./components/HeroCard"
import VerticalNav from "./components/VerticalNav"
import styles from './App.module.scss'
import { useState } from "react"

const initialState = {
    heroes: [
        { id: 0, name: 'Itay', skills: [], image: 'https://frontend-interview-hero-63u64o32qq-uk.a.run.app/portraits/orc.png'},
        { id: 1, name: '', skills: [], image: ''},
        { id: 2, name: '', skills: [], image: ''}]
}

function App() {
    const [state, setState] = useState(initialState)
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
                        <div className={styles.heroCardHolder}>
                            <HeroCard
                                key={`hero_id_${hero.id}`}
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
