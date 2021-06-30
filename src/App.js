import styles from './App.module.scss';
import HeroCard from "./components/HeroCard";
import VerticalNav from "./components/VerticalNav";
function App() {
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
              <sapn className={styles.heroCardHolder}><HeroCard /></sapn>
              <sapn className={styles.heroCardHolder}><HeroCard /></sapn>
              <sapn className={styles.heroCardHolder}><HeroCard /></sapn>
          </div>
      </div>
    </div>
  );
}

export default App;
