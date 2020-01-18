export const bubbleSort = (array) => {
    let oldvalue = 0
    let current = 0
    let count = 1
    let didSwap = false
    let lessLen = 0
    let animations = []
    while (current < array.length - lessLen) {

        if (array[current] > array[count]) {
            oldvalue = array[count]
            animations.push({ currentIndex: current, nextIndex: count, oldValue: oldvalue, nextValue: array[current] })
            array[count] = array[current]
            array[current] = oldvalue
            didSwap = true
        }
        current++
        count++

        if (didSwap && current === array.length - lessLen) {
            current = 0
            count = 1
            lessLen++
            didSwap = false
        }
    }
    return animations
}