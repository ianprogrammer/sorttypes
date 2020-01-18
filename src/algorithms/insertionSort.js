export const insertionSort = (array)=>{
    let animations = []
    for (let i = 0; i < array.length; i++) {
        let j = i
        while( j > 0 && array[j] < array[j-1]){
            const temp = array[j-1]
            array[j-1] = array[j]
            array[j] = temp

            animations.push({ currentIndex: j, nextIndex: j-1, oldValue: temp, nextValue: array[j-1] })
            j--;
        }   
    }
    return animations
}