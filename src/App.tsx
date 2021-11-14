import './App.css';
import Board from './Board/Board';
import Bucket from './Bucket/Bucket';
import Header from './Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      <Bucket />
    </div>
  );
}

export default App;
