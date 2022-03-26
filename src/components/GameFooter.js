import Dots from './Dots';
import PageFlipBtn from './PageFlipBtn';

export default function GameFooter(props) {
  return (
    <div className="container-fluid  d-flex justify-content-between align-self-end ">
      <PageFlipBtn
        transparentDiv={props.transparentDiv}
        isShown={props.questionsCurrentIndex >= 4 ? true : false}
        pageFlip={props.moveToPreviousPage}
        sign={'←'}
      />
      <div className="container text-center">
        <p className="mb-2"> {`score: ${props.score}/${props.triviaLength}`}</p>
        <Dots index={props.currentDotIndex} dotSize={props.dotSize}></Dots>
      </div>
      <PageFlipBtn
        sign={'→'}
        transparentDiv={props.transparentDiv}
        isShown={
          props.questionsCurrentIndex + 4 < props.triviaLength ? true : false
        }
        pageFlip={props.moveToNextPage}
      />
    </div>
  );
}
