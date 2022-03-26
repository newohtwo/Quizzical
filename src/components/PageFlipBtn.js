export default function PageFlipBtn(props) {
  return (
    <>
      {props.isShown ? (
        <button className="page-flip-btn" onClick={() => props.pageFlip()}>
          {props.sign}
        </button>
      ) : (
        props.transparentDiv()
      )}
    </>
  );
}
