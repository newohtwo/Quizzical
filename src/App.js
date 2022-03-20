import './App.css';
import IntroductionPage from './components/IntroductionPage';
import TriviaQuastions from './components/TriviaQuastions';
import react from 'react';
import axios from 'axios';
import data from './components/tempData';
import { nanoid } from 'nanoid';
function App() {
  const [triviaQuastions, setTriviaQuastions] = react.useState(
    mockAddRandomizedAnswers(data.results)
  );
  const [showSettings, setShowSettings] = react.useState(false);

  function shuffleArray(array) {
    const tempArray = array;
    for (var i = tempArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }
    return tempArray;
  }

  function mockAddRandomizedAnswers(data) {
    return data.map((triviaQuastion) => {
      let { question, correct_answer } = triviaQuastion;
      return {
        question,
        correct_answer,
        rndAnswers: shuffleArray([
          ...triviaQuastion.incorrect_answers,
          triviaQuastion.correct_answer,
        ]),
      };
    });
  }

  // function createApiCall(userPrefrences) {
  //   console.log(userPrefrences);
  //   const url = `https://opentdb.com/api.php?amount=${userPrefrences.quastionNum}&category=${userPrefrences.category}&difficulty=${userPrefrences.difficulty}&type=multiple`;
  //   fetchTrivia(url);
  // }

  // //TODO FIND A WAY TO USE THE GOTTEN DATA INTO THE NEXT PAGE OF THE APP
  // //SHOW THE DATA IN A QUASTION AND ANSWER WAY ,
  // //SHOW CORRECT AND INCORRECT ANSWERS

  // async function fetchTrivia(url) {
  //   const response = await axios.get(url);
  //   setTriviaQuastions(response.data.results);
  //   toggleShowSettings();
  // }

  function toggleShowSettings() {
    setShowSettings((oldSate) => !oldSate);
  }

  function mockCreateApiCall() {
    toggleShowSettings();
  }

  return (
    <div className="App container page rounded  mt-4">
      {!showSettings && (
        <IntroductionPage createApiCall={mockCreateApiCall} key={nanoid()} />
      )}
      {showSettings && (
        <TriviaQuastions
          triviaQuastions={triviaQuastions}
          triviaLength={triviaQuastions.length}
          key={nanoid()}
        />
      )}
    </div>
  );
}

export default App;
