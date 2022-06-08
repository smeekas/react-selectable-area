import SelectableArea from "../SelectableArea";
import Selectable from "../Selectable/Selectable";
import React from "react";
import styles from "./Desktop.module.css";
import useSelect from "../../hook/useSelect";
function Desktop() {
  const getInfo = useSelect();

  console.log(getInfo);

  return (
    <div className={styles.desktop}>
      <SelectableArea>
        <Selectable
          onSelect={() => alert("selected")}
          highlightstyle={{ backgroundColor: "rgba(0,255,255,0.5)" }}
        >
          <div></div>
        </Selectable>
        <Selectable highlightstyle={{ backgroundColor: "rgba(0,255,255,0.5)" }}>
          <div></div>
        </Selectable>
        <Selectable highlightstyle={{ backgroundColor: "rgba(0,255,255,0.5)" }}>
          <h3>aaa</h3>
        </Selectable>
      </SelectableArea>
    </div>
  );
}
export default React.memo(Desktop);
