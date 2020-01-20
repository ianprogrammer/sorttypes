export const selectionSort = (array) => {

    let i = 0
    let findedIndex = 0
    let animations = []
    while (i < array.length  - 1 ) {
        findedIndex = i

        for (let k = i + 1; k < array.length; k++) {
            const element = array[k];
            animations.push({ currentIndex: i, nextIndex: findedIndex, oldValue: array[findedIndex], nextValue: array[i] })
          
          
             if(element < array[findedIndex]){
              
                findedIndex  = k 
            }
        }
       
        const oldValue = array[findedIndex]
        array[findedIndex] = array[i]
        array[i] = oldValue     
    //    animations.push({ currentIndex: i, nextIndex: findedIndex, oldValue: array[findedIndex], nextValue: array[i] })
          
        


        i++;
    }
    animations.push({ currentIndex: i, nextIndex: findedIndex, oldValue: array[findedIndex], nextValue: array[i] })
           
    return animations
}
