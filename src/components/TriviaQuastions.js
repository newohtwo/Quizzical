import react from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';

export default function triviaQuastions(props) {
  const [score, setScore] = react.useState(0);
  const [questions, setQuestions] = react.useState(initQuestions());

  function createQuestions() {
    return questions.map((question) => {
      return (
        <Question
          key={nanoid()}
          question={question.questionText}
          correctAnswer={question.correctAnswer}
          buttons={question.buttons}
          index={question.index}
          buttonClick={buttonClick}
          updateScore={updateScore}
        ></Question>
      );
    });
  }

  function initQuestions() {
    return props.triviaQuastions.map((question, index) => {
      return {
        questionText: question.question,
        correctAnswer: question.correct_answer,
        buttons: initBtnsForQuestion(question.rndAnswers),
        index,
      };
    });
  }

  function initBtnsForQuestion(possibleAnswers) {
    return possibleAnswers.map((text) => {
      const id = nanoid();
      return {
        text,
        id,
        isDisabled: false,
        isClicked: false,
      };
    });
  }

  //willl need to refactor to be more presentable
  //disables the rest of the buttons and highlightes the pressed one
  function buttonClick(...args) {
    const index = args[0];
    const id = args[1];
    const cpyArray = [...questions];
    const cpyQuestion = questions[index];

    cpyQuestion.buttons = cpyQuestion.buttons.map((button) => {
      if (button.id === id) {
        compareAnswer(cpyQuestion.correctAnswer, button.text);
        return { ...button, isClicked: !button.isClicked };
      } else {
        return { ...button, isDisabled: !button.isDisabled };
      }
    });

    cpyArray[index] = cpyQuestion;
    setQuestions(cpyArray);
  }
  //compares the user choosen button answer to the correct answer
  function compareAnswer(answer, buttonAnswer) {
    if (answer === buttonAnswer) {
      updateScore();
    }
  }

  // can use effect to check for every correct or incorrect answer after every rerender of the page
  function updateScore() {
    setScore((oldNum) => oldNum + 1);
  }

  return (
    <div className="container ">
      {createQuestions()}
      <div className="container-fluid text-center mt-5">
        <p>{score}</p>
      </div>
    </div>
  );
}
