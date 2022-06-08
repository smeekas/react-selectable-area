import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import doesOverlap from "../utils/overlap";
import styles from "./SelectableArea.module.css";
function SelectableArea(props) {
  const childRef = useRef();
  const parentRef = useRef();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  // const selected = useSelector((state) => state.selected);
  // const start = useSelector((state) => state.start);
  const [mouse, setMouse] = useState({
    x: null,
    y: null,
    offsetX: null,
    offsetY: null,
    isLeft: true,
    // initialX: 0,
    // initialY: 0,
  });
  const childStyle = {
    width: mouse.offsetX,
    height: mouse.offsetY,
    top: mouse.isRight && `${mouse.y}px`,
    bottom: !mouse.isRight && `${mouse.height - mouse.y}px`,
    left: mouse.isLeft && `${mouse.x}px`,
    right: !mouse.isLeft && `${mouse.width - mouse.x}px`,
  };
  const moveHandler = (e) => {
    if (mouse.initialX) {
      doesOverlap(childRef.current.getBoundingClientRect(), items);

      let offsetX = e.pageX - mouse.initialX;
      let offsetY = e.pageY - mouse.initialY;
      let isLeft = true;
      let isRight = true;
      if (offsetX < 0) {
        isLeft = false;
        offsetX = -offsetX;
      }
      if (offsetY < 0) {
        isRight = false;
        offsetY = -offsetY;
      }
      setMouse((prev) => {
        return {
          ...prev,
          offsetX: offsetX,
          offsetY: offsetY,
          isLeft: isLeft,
          isRight: isRight,
        };
      });
    }
  };
  const downHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let data = e.target.getBoundingClientRect();

    const x = Math.abs(e.clientX - data.x);
    const y = Math.abs(e.clientY - data.y);
    setMouse((prev) => {
      return {
        initialX: e.pageX,
        initialY: e.pageY,
        ...prev,
        x: x,
        y: y,
        width: data.width,
        height: data.height,
      };
    });
  };
  const upHandler = (e) => {
    // console.log("up");
    items.forEach((item) => {
      if (item.selected) {
        dispatch({ type: "RESET_SELECTABLE" });
        return;
      }
    });
    if (mouse.initialX) {
      // dispatch({ type: "RESET_SELECTABLE" });
      setMouse((prev) => {
        return {};
      });
    }
  };

  return (
    <>
      <div
        className={`${styles.dummy} dummyParent`}
        ref={parentRef}
        onMouseDown={(e) => downHandler(e)}
        onMouseUp={(e) => upHandler(e)}
        onMouseLeave={(e) => upHandler(e)}
        onMouseMove={(e) => moveHandler(e)}
      >
        <div
          ref={childRef}
          style={{ ...childStyle, display: !mouse.initialX && "none" }}
          className={styles.child}
        ></div>

        {props.children}
      </div>
    </>
  );
}
export default SelectableArea;
