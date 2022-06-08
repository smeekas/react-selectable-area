import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
function useSelect() {
  const state = useSelector((state) =>
    state.items.map((item) => item.selected)
  );
  return state;
}
export default useSelect;
