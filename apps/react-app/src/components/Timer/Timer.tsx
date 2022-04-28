import './styles.css'

interface TimerProps {
  id: string
  seconds: number
  isRunning: boolean
  toggleTimer: () => void
  fetchedData:{
    byId: Record<string, {
        id: string;
        data: string;
    }>;
    allIds: string[];
} 
}

export function Timer({id, seconds, isRunning, toggleTimer, fetchedData}: TimerProps) {
  return (
    <div className='timerWrapper'>
      <div className="timerContainer">
        {id} Timer: {seconds.toFixed(2)}
      </div>

      <button onClick={toggleTimer} style={{marginTop: '15px'}}>{isRunning ? 'Stop' : 'Start'} timer</button>

      <div style={{marginTop: '20px'}}>

      <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
      </div>
    </div>
  )
}
