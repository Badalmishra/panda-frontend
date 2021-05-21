import './App.css';
import GameScreen from './GamePage';

function App() {
  return (
    <div className="App">
      <GameScreen  myId={new Date().getTime()}/>
    </div>
  );
}

export default App;
