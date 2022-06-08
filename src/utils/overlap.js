import store from "../store";
const doesOverlap = (parent, children) => {
  const newArr = [];
  children.forEach((item, index) => {
   const returnedVal= childOverlap(parent, item.node.getBoundingClientRect(), index)
  //  console.log(returnedVal);
   newArr.push(returnedVal)
  });
  const prev = store.getState().items.map((item) => item.selected);
  // console.log(prev);
  // console.log(newArr);
  prev.forEach((item, index) => {
    if (item !== newArr[index]) {
      // console.log("HERE");
      store.dispatch({ type: "UPDATE_SELECTABLE_ARR", newArr: newArr });
      return;
    }
  });
  // console.log();

  // return newArr;
};

const childOverlap = (parent, child, index) => {
  //   console.log(index);
  // if (index == 2) {
  //   console.log(
  //     `P: t:${parent.top} b:${parent.bottom} l"${parent.left} r:${parent.right}`
  //   );
  //   console.log(
  //     `C: t:${child.top} b:${child.bottom} l:"${child.left} r:${child.right}`
  //   );
  // }
  const does =
    (parent.left <= child.right &&
      parent.left >= child.left &&
      parent.top >= child.top &&
      parent.top <= child.bottom) ||
    (parent.left <= child.right &&
      parent.left >= child.left &&
      parent.top >= child.top &&
      parent.top <= child.bottom &&
      parent.bottom >= child.top &&
      parent.bottom <= child.bottom) ||
    (parent.left <= child.right &&
      parent.left >= child.left &&
      parent.bottom >= child.top &&
      parent.bottom <= child.bottom) ||
    (parent.right >= child.left &&
      parent.right <= child.right &&
      parent.bottom >= child.top &&
      parent.bottom <= child.bottom) ||
    (parent.right >= child.left &&
      parent.right <= child.right &&
      parent.top >= child.top &&
      parent.top <= child.bottom &&
      parent.bottom >= child.top &&
      parent.bottom <= child.bottom) ||
    (parent.top >= child.top &&
      parent.top <= child.bottom &&
      parent.right >= child.left &&
      parent.right <= child.right) ||
    (parent.top <= child.top &&
      parent.right >= child.left &&
      parent.right <= child.right &&
      parent.bottom >= child.bottom) ||
    (parent.top <= child.top &&
      parent.bottom >= child.bottom &&
      parent.left > child.left &&
      parent.left < child.right) ||
    (parent.top < child.top &&
      parent.left < child.left &&
      parent.right > child.right &&
      parent.bottom > child.bottom) ||
    (parent.left < child.left &&
      parent.right > child.right &&
      parent.bottom > child.top &&
      parent.bottom < child.bottom) ||
    (parent.left < child.left &&
      parent.right > child.right &&
      parent.top > child.top &&
      parent.top < child.bottom);

  // store.dispatch({ type: "UPDATE_SELECTABLE", index: index, does: does });

  return does;
};

export default doesOverlap;
