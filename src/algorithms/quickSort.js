export const quickSort = array => {
  let animations = [];
  const newArray = quickSortHelper(animations, array, 0, array.length - 1);

  return animations;
};

const quickSortHelper = (animations, array, startIndex, endIndex) => {
  if (startIndex >= endIndex){
      return
  } 

  let p = startIndex;
  let r = endIndex;
  let l = startIndex + 1;

  while (l <= r) {

    animations.push({ currentIndex: l, nextIndex: r, oldValue: -1, nextValue: -1 })

    if (array[p] < array[l] && array[p] > array[r]) {
      const oldValue = array[l];
      array[l] = array[r];
      array[r] = oldValue;

      animations.push({ currentIndex: l, nextIndex: r, oldValue: array[r], nextValue: oldValue })
    }

    if (array[p] >= array[l]) {
      l++;
    }
    if (array[p] <= array[r]) {
      r--;
    }
  }
  const oValue = array[p];
  array[p] = array[r];
  array[r] = oValue;
  animations.push({ currentIndex: p, nextIndex: r, oldValue: array[r], nextValue: oValue })

  let getSmallerArray = r - 1 - startIndex < endIndex - (r + 1);

  if (getSmallerArray) {
    quickSortHelper(animations, array, startIndex, r - 1);
    quickSortHelper(animations, array, r + 1, endIndex);
  } else {
    quickSortHelper(animations, array, r + 1, endIndex);
    quickSortHelper(animations, array, startIndex, r - 1);
  }
  return array;
};
