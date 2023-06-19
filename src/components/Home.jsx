import { useState } from 'react';
import HangmanGame from './hangman/HangmanGame';

function Home() {
  const [gameKey, setGameKey] = useState("-1")

  const games = {
    "-1": {
      component: <></>
    },
    "0": {
      name: "Hangman",
      desc: "Guess the word",
      component: <HangmanGame />
    }
  }

  const gameComponent = gameKey === "-1" ? <></> : <>
    {games[gameKey].component}

    <div style={{ padding: '20px' }}></div>
    <hr />
    <p role='button' style={{ cursor: 'pointer' }} onClick={() => { setGameKey("-1") }}>Play another game</p>
  </>

  const gameSelection = gameKey !== "-1" ? <></> : <>
    {/* <h1>Games</h1> */}
    <h4>Click on the game to play</h4>
    {Object.entries(games).filter(([key, value]) => key !== "-1").map(([key, value], i) => {
      return <div key={key} role="button" style={{ cursor: 'pointer' }} onClick={() => { setGameKey(key) }}>
        <span>{i + 1}. {value.name}</span>
        <span style={{ paddingLeft: '10px' }}><i>({value.desc})</i></span>
      </div>
    })}
  </>

  return (
    <div style={{ padding: '50px' }}>

      {gameSelection}
      {gameComponent}
    </div>
  );
}

export default Home;
