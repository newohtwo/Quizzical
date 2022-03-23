import react from 'react';
import Question from './Question';
import Dots from './Dots';
import { nanoid } from 'nanoid';

export default function triviaQuastions(props) {
  const [score, setScore] = react.useState(0);
  const [questions, setQuestions] = react.useState(initQuestions());
  const [currentDotIndex, setCurrentDotIndex] = react.useState(0);

  const [currentQuestionArr, setCurrentQuestionArr] = react.useState(
    createQuestions()
  );

  const [questionsCurrentIndex, setQuestionsCurrentIndex] = react.useState(
    Number(0)
  );

  //update the current question array after the index is 'moved'
  react.useEffect(() => {
    updateCurrentQArr();
  }, [questionsCurrentIndex]);

  //create initial question on the page
  function createQuestions() {
    const arr = [];
    for (let index = 0; index <= 3; index++) {
      arr.push(createQuestionComponent(questions[index]));
    }
    return arr;
  }

  //update the current question array with new values
  function updateCurrentQArr() {
    let arr = [];
    if (questionsCurrentIndex + 4 > props.triviaLength) {
      arr = questions
        .slice(questionsCurrentIndex, props.triviaLength)
        .map((question) => createQuestionComponent(question));
    } else {
      arr = questions
        .slice(questionsCurrentIndex, questionsCurrentIndex + 4)
        .map((question) => createQuestionComponent(question));
    }

    setCurrentQuestionArr(arr);
  }

  //create component from question object
  function createQuestionComponent(question) {
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

  //disables the buttons in the selected row and highlightes the pressed one
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

    //update the object and the shown array of questions
    cpyArray[index] = cpyQuestion;
    setQuestions(cpyArray);
    updateCurrentQArr();
  }

  //compares the user choosen button answer to the correct answer
  function compareAnswer(answer, buttonAnswer) {
    if (answer === buttonAnswer) {
      updateScore();
    }
  }

  function updateScore() {
    setScore((oldNum) => oldNum + 1);
  }

  function moveToNextPage() {
    if (questionsCurrentIndex + 4 < props.triviaLength) {
      setQuestionsCurrentIndex(questionsCurrentIndex + 4);
      setCurrentDotIndex((num) => num + 1);
    }
  }

  function moveToPreviousPage() {
    if (questionsCurrentIndex - 4 >= 0) {
      setQuestionsCurrentIndex(questionsCurrentIndex - 4);
      setCurrentDotIndex((num) => num - 1);
    }
  }

  //calculates the amount of dots (page indicatiors) to show on page
  function dotSize() {
    let num = props.triviaLength;
    let dotNum = 0;
    while (num > 0) {
      dotNum += 1;
      num -= 4;
    }

    return dotNum;
  }

  return (
    <div className="container-fluid g-0 h-100 d-flex flex-column justify-content-between">
      <div className="container-fluid  ">{currentQuestionArr}</div>

      <div className="container-fluid  d-flex justify-content-between align-self-end ">
        {questionsCurrentIndex >= 4 ? (
          <button
            className="page-flip-btn"
            onClick={() => moveToPreviousPage()}
          >
            &#8592;
          </button>
        ) : null}
        <div className="container text-center">
          <p className="mb-2"> {`score: ${score}/${props.triviaLength}`}</p>
          <Dots index={currentDotIndex} dotSize={dotSize()}></Dots>
        </div>
        {questionsCurrentIndex + 4 < props.triviaLength ? (
          <button className="page-flip-btn " onClick={() => moveToNextPage()}>
            →
          </button>
        ) : null}
      </div>
    </div>
  );
}
