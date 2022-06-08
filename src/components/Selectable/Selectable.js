import styles from "./Selectable.module.css";
import {  useEffect, forwardRef, useState } from "react";
import {  useSelector } from "react-redux";
import createSelectable from "../../hoc/Hoc";
// const Selectable=({ selected, ...rest })=> {
const Selectable = forwardRef((props, ref) => {
  const items = useSelector((state) => state.items);
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    const index =
      Array.from(ref.current.parentNode.children).findIndex(
        (item) => item === ref.current
      ) - 1;

    setIsSelected(items[index]?.selected);
  }, [ref, items]);
  useEffect(() => {
    if (props.onSelect && isSelected) {
      props.onSelect();
    }
  }, [isSelected, props]);
  return (
    <div
      {...props}
      ref={ref}
      style={isSelected ? props.highlightstyle : {}}
      className={`${styles.ch} childs`}
    >
      {props.children}
    </div>
  );
});
export default createSelectable(Selectable);
