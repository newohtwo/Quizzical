import './App.css';
import IntroductionPage from './components/IntroductionPage';
import TriviaQuastions from './components/TriviaQuastions';
import react from 'react';
import axios from 'axios';

function App() {
  const [triviaQuastions, setTriviaQuastions] = react.useState();
  const [showSettings, setShowSettings] = react.useState(true);

  function createApiCall(userPrefrences) {
    console.log(userPrefrences);
    const url = `https://opentdb.com/api.php?amount=${userPrefrences.quastionNum}&category=${userPrefrences.category}&difficulty=${userPrefrences.difficulty}&type=multiple`;
    fetchTrivia(url);
  }
  //TODO FIND A WAY TO USE THE GOTTEN DATA INTO THE NEXT PAGE OF THE APP
  //SHOW THE DATA IN A QUASTION AND ANSWER WAY ,
  //SHOW CORRECT AND INCORRECT ANSWERS

  async function fetchTrivia(url) {
    const response = await axios.get(url);
    setTriviaQuastions(response.data.results);
    toggleShowSettings();
  }

  function toggleShowSettings() {
    setShowSettings((oldSate) => !oldSate);
  }

  return (
    <div className="App container page rounded  mt-4">
      {!showSettings && <IntroductionPage createApiCall={createApiCall} />}
      {showSettings && <TriviaQuastions />}
    </div>
  );
}

export default App;
