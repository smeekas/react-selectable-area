import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
function createSelectable(Component) {
  return function (props) {
    let secondType = false;
    // console.log(hello);
    const divRef = useRef();
    const dispatch = useDispatch();
    const dummyHandler = (e) => {
      e.stopPropagation();
    };
    useEffect(() => {
      if (!secondType) {
        secondType = true;
        return;
      }
      // console.log("selected");
      dispatch({ type: "ADD", node: divRef.current });
    }, []);
    return (
      <Component
        {...props}
        hello="helo"
        ref={divRef}
        onMouseDownCapture={(e) => {
          // console.log("child")
          dummyHandler(e);
        }}
      >
        {props.children}
      </Component>
    );
  };
}

export default createSelectable;
