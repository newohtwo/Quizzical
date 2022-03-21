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

  react.useEffect(() => {
    updateCurrentQArr();
  }, [questionsCurrentIndex]);

  //TODO update the questionArr with new values either going up or down useing the questions arr

  function createQuestions() {
    const arr = [];
    for (let index = 0; index <= 3; index++) {
      arr.push(createQuestionComponent(questions[index]));
    }
    return arr;
  }

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
    updateCurrentQArr();
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

  function dotSize() {
    let num = props.triviaLength;
    let dotNum = 0;
    while (num > 0) {
      dotNum += 1;
      num -= 4;
    }
    return dotNum;
  }

  //need to put here an array that will constanly change its values and that way will "flip" however i want
  return (
    <div className="container-fluid g-0 h-100 d-flex flex-column justify-content-between">
      <div className="container-fluid  ">{currentQuestionArr}</div>

      <div className="container-fluid  d-flex justify-content-between align-self-end ">
        <button onClick={() => moveToPreviousPage()}> &#8592;</button>
        <div className="container text-center">
          <p className="mb-2"> {`score: ${score}/${props.triviaLength}`}</p>
          <Dots index={currentDotIndex} dotSize={dotSize()}></Dots>
        </div>
        <button onClick={() => moveToNextPage()}> →</button>
      </div>
    </div>
  );
}
