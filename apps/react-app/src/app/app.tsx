import {ZustandTimer} from '../components/ZustandTimer';
import {RecoilTimer} from '../components/RecoilTimer';
import { JotaiTimer } from '../components/JotaiTimer';
import { RxJsTimer } from '../components/RxJsTimer';
import styles from './app.module.css'

export function App() {

  return (
    <div className={styles['container']}>
      <ZustandTimer />
      <RecoilTimer />
      <JotaiTimer />
      <RxJsTimer />
    </div>
  );
}

export default App;
