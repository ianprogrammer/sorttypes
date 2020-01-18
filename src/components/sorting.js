import React from 'react'
import './sorting.css'
import { Button, Message, Container } from 'semantic-ui-react'
import { bubbleSort } from '../algorithms/bubbleSort'
import { insertionSort } from '../algorithms/insertionSort'


//consts
const NUMBER_OF_ARRAY_BARS = 150;
const PRIMARY_COLOR = 'turquoise';
const ANIMATION_SPEED_MS = 10;
const SECONDARY_COLOR = 'red';
class SortingAlgorithms extends React.Component {


    state = {

        array: [],
        colorIndex: [],
        isBubble: false

    }
    componentDidMount() {
        this.resetArray()
    }

    randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    resetArray() {
        const array = [];
        const colorIndex = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(this.randomIntFromInterval(5, 730));
            colorIndex.push(PRIMARY_COLOR)

        }
        this.setState({ array, colorIndex });
    }


    runBubbleSort = () => {
        let array = bubbleSort(this.state.array)
       this.changePile(array)
    }

    runInsertionSort = () => {
        let array = insertionSort(this.state.array)
       this.changePile(array)
    }

    changePile=(array)=>{
        for (let i = 0; i < array.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const element = array[i];
            const { currentIndex, nextIndex, oldValue, nextValue } = element;
            const barOneStyle = arrayBars[currentIndex].style;
            const barTwoStyle = arrayBars[nextIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                barOneStyle.height = `${oldValue}px`
                barTwoStyle.height = `${nextValue}px`
                console.log("A")
            }, i * ANIMATION_SPEED_MS);
        }
    }



    render() {
        const { array, colorIndex, isBubble } = this.state
        return (
            <div style={{ height: '100vh', align: 'center' }}>

                <Message style={{ margin: '5px', textAlign: 'center', marginBottom: '10px' }}  >
                    <Button primary onClick={() => { this.resetArray() }}>Generate new Array </Button>
                    <Button secondary onClick={() => { this.runBubbleSort() }} loading={isBubble}>Bubble Sort</Button>
                    <Button secondary onClick={() => { this.runInsertionSort() }}>Insertion Sort</Button>
                    <Button secondary>Selection Sort</Button>
                    <Button secondary>Quick Sort</Button>
                    <Button secondary>Merge Sort</Button>
                </Message>
                <Container textAlign='center'>{array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={Math.random() + idx}
                        style={{
                            backgroundColor: colorIndex[idx],
                            height: `${value}px`,
                        }}></div>
                ))}</Container>

            </div>
        )
    }
}

export default SortingAlgorithms