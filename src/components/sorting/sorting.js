import React from "react";
import "./sorting.css";
import { Button, Message, Container } from "semantic-ui-react";
import { bubbleSort } from "../../algorithms/bubbleSort";
import { insertionSort } from "../../algorithms/insertionSort";
import { selectionSort } from "../../algorithms/selectionSort";
import { quickSort } from "../../algorithms/quickSort";
import "../../animate.css";
//consts
const NUMBER_OF_ARRAY_BARS = 150;
const PRIMARY_COLOR = "#6219F4";
const ANIMATION_SPEED_MS = 8;
const SECONDARY_COLOR = "red";
const COMP_COLOR = "green";
class SortingAlgorithms extends React.Component {
  state = {
    array: [],
    colorIndex: [],
    isBubble: false,
    isInsertion: false,
    isSelection: false,
    isQuick: false,
    isHeap: false,
    isMerge: false
  };
  componentDidMount() {
    this.resetArray();
  }

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  resetArray() {
    const array = [];
    const colorIndex = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 500));
      colorIndex.push(PRIMARY_COLOR);
    }
    this.setState({ array, colorIndex });
  }


  runQuickSort = () => {
   
    this.setState({ isQuick: true }, () => {
      let array = quickSort(this.state.array);
      this.changePile(array);
   
      setTimeout(() => {
        this.setState({ isQuick: false });
      }, (array.length + 5) * ANIMATION_SPEED_MS);
    });

 
  };




  runBubbleSort = () => {
    this.setState({ isBubble: true }, () => {
      let array = bubbleSort(this.state.array);
      this.changePile(array);
      setTimeout(() => {
        this.setState({ isBubble: false });
      }, (array.length + 5) * ANIMATION_SPEED_MS);
    });
  };

  runInsertionSort = () => {
    this.setState({ isInsertion: true }, () => {
      let array = insertionSort(this.state.array);
      this.changePile(array);
      setTimeout(() => {
        this.setState({ isInsertion: false });
      }, (array.length + 5) * ANIMATION_SPEED_MS);
    });
  };

  runSelectionSort = () => {
    this.setState({ isSelection: true }, () => {
      let array = selectionSort(this.state.array);
      this.changePile(array);
      setTimeout(() => {
        this.setState({ isSelection: false });
      }, (array.length + 5) * ANIMATION_SPEED_MS);
    });
  };

  changePile = array => {
    for (let i = 0; i < array.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const element = array[i];
      const { currentIndex, nextIndex, oldValue, nextValue } = element;
      const barOneStyle = arrayBars[currentIndex].style;
      const barTwoStyle = arrayBars[nextIndex].style;

      setTimeout(() => {
        barOneStyle.backgroundColor = COMP_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS);

      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
        barOneStyle.height = `${oldValue}px`;
        barTwoStyle.height = `${nextValue}px`;
      }, (i + 1) * ANIMATION_SPEED_MS);
    }
  };

  render() {
    const {
      array,
      colorIndex,
      isBubble,
      isSelection,
      isQuick,
      isMerge,
      isInsertion,
      isHeap
    } = this.state;
    return (
      <div
        className="animated bounceInRight"
        style={{ height: "90vh", align: "center" }}
      >
        <Message
          style={{ margin: "5px", textAlign: "center", marginBottom: "10px" }}
        >
          <Button
            primary
            onClick={() => {
              this.resetArray();
            }}
            disabled={
              isBubble ||
              isSelection ||
              isQuick ||
              isMerge ||
              isInsertion ||
              isHeap
            }
          >
            Generate new Array{" "}
          </Button>
          <Button
            secondary
            onClick={() => {
              this.runBubbleSort();
            }}
            loading={isBubble}
            disabled={
              isSelection || isQuick || isMerge || isInsertion || isHeap
            }
          >
            Bubble Sort
          </Button>
          <Button
            secondary
            onClick={() => {
              this.runInsertionSort();
            }}
            loading={isInsertion}
            disabled={isBubble || isSelection || isQuick || isMerge || isHeap}
          >
            Insertion Sort
          </Button>
          <Button
            secondary
            onClick={() => {
              this.runSelectionSort();
            }}
            loading={isSelection}
            disabled={isBubble || isQuick || isMerge || isInsertion || isHeap}
          >
            Selection Sort
          </Button>
          <Button
            secondary
            loading={isQuick}
            onClick={() => {
              this.runQuickSort();
            }}
            disabled={
              isBubble || isSelection || isMerge || isInsertion || isHeap
            }
          >
            Quick Sort
          </Button>
          <Button
            secondary
            loading={isHeap}
            disabled={
              isBubble || isSelection || isQuick || isMerge || isInsertion
            }
          >
            Heap Sort
          </Button>
          <Button
            secondary
            loading={isMerge}
            disabled={
              isBubble || isSelection || isQuick || isInsertion || isHeap
            }
          >
            Merge Sort
          </Button>
        </Message>
        <Container textAlign="center" style={{ marginTop: "5em" }}>
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={Math.random() + idx}
              style={{
                backgroundColor: colorIndex[idx],
                height: `${value}px`
              }}
            ></div>
          ))}
        </Container>
      </div>
    );
  }
}

export default SortingAlgorithms;
