import React from "react";
import Node from "./node/node";
import { Button } from "semantic-ui-react";
import "./find-me.css";
import { recursiveDivisionMaze } from "./board-algorithms/board";
import {
  dijkstra,
  getNodesInShortestPathOrder
} from "./board-algorithms/dijkstra";

class FindMe extends React.Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    START_NODE_ROW: 10,
    START_NODE_COL: 24,
    FINISH_NODE_ROW: 10,
    FINISH_NODE_COL: 26,
    isStart: false,
    isFinish: false
  };

  componentDidMount() {
    this.clearBoard();
  }
  clearBoard = () => {
    const grid = this.createGrid();
    this.setState({ grid },() =>{
      for (let i = 0; i < grid.length; i++) {
        const element = grid[i];
        element.forEach((node) => {
          document.getElementById(`node-${node.row}-${node.col}`).className ="node";
        });
      }
    
    });
  }

  findMe = () => {
    const {
      grid,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    } = this.state;

    dijkstra(
      grid,
      grid[START_NODE_ROW][START_NODE_COL],
      grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    const newGrid = getNodesInShortestPathOrder(
      grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );

    this.animateShortestPath(newGrid);
  };

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        //const img = document.createElement("img");
      }, 50 * i);
    }
  }

  createGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  handleMouseDown(row, col) {
    const {
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    } = this.state;

    if (
      !(
        (col === START_NODE_COL && row === START_NODE_ROW) ||
        (col === FINISH_NODE_COL && row === FINISH_NODE_ROW)
      )
    ) {
      const newGrid = this.getNewGridWithWallCreated(this.state.grid, row, col);
      console.log("nao eh start nem finish");
      this.setState({ grid: newGrid, mouseIsPressed: true });
      return;
    }

    if (row === START_NODE_ROW && col === START_NODE_COL) {
      console.log("clicou em start");
      this.setState({
        mouseIsPressed: true,
        isStart: true
      });
    }

    if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      this.setState({
        mouseIsPressed: true,
        isFinish: true
      });
    }
  }
  createNewBoard = () => {


    const {
     
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    } = this.state;

    
    let gridDefault = null
    let grid = null
    let len = 1
    while (len === 1){
      gridDefault = this.createGrid();
      grid = recursiveDivisionMaze(
       gridDefault,
       0,
       19,
       0,
       49,
       "horizontal",
       false,
       0
     );
     dijkstra(
       grid,
       grid[START_NODE_ROW][START_NODE_COL],
       grid[FINISH_NODE_ROW][FINISH_NODE_COL]
     );
     let newGrid = getNodesInShortestPathOrder(
       grid[FINISH_NODE_ROW][FINISH_NODE_COL]
     );
     len = newGrid.length
    }
    
    
    
    let lastKValue = 0;
    for (let i = 0; i < grid.length; i++) {
      const element = grid[i];
      element.forEach((node, k) => {
        if (node.isWall) {
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-wall";
          }, 160 * k);
          lastKValue = k;
        }
      });
    }

    setTimeout(() => {
      this.setState({ grid: grid });
    }, 165 * lastKValue);
  };

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const {
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL,
      isStart,
      isFinish
    } = this.state;
    console.log("entrou no mover");
    console.log(isStart, isFinish);

    if (
      !(
        (col === START_NODE_COL && row === START_NODE_ROW) ||
        (col === FINISH_NODE_COL && row === FINISH_NODE_ROW)
      ) &&
      !isStart &&
      !isFinish
    ) {
      const newGrid = this.getNewGridWithWallCreated(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
      return;
    }

    if (isStart) {
      let lastStartRow = START_NODE_ROW;
      let lastStartCol = START_NODE_COL;

      this.setState(
        {
          START_NODE_ROW: row,
          START_NODE_COL: col,
          mouseIsPressed: true
        },
        () => {
          const grid = this.getNewGridWithStarted(
            this.state.grid,
            row,
            col,
            lastStartRow,
            lastStartCol
          );
          this.setState({ grid });
        }
      );
    }

    if (isFinish) {
      let lastFinishRow = FINISH_NODE_ROW;
      let lastFinisiCol = FINISH_NODE_COL;

      this.setState(
        {
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
          mouseIsPressed: true
        },
        () => {
          const grid = this.getNewGridWithFinish(
            this.state.grid,
            row,
            col,
            lastFinishRow,
            lastFinisiCol
          );
          this.setState({ grid });
        }
      );
    }
  }

  handleMouseUp(row, col) {
    this.setState({ mouseIsPressed: false, isStart: false, isFinish: false });
  }

  getNewGridWithFinish = (grid, row, col, lastRow, lastCol) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true
    };
    newGrid[row][col] = newNode;

    const lastNode = newGrid[lastRow][lastCol];
    const oldNode = {
      ...lastNode,
      isFinish: false
    };
    newGrid[lastRow][lastCol] = oldNode;

    return newGrid;
  };

  getNewGridWithStarted = (grid, row, col, lastRow, lastCol) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true
    };
    newGrid[row][col] = newNode;

    const lastNode = newGrid[lastRow][lastCol];
    const oldNode = {
      ...lastNode,
      isStart: false
    };
    newGrid[lastRow][lastCol] = oldNode;

    return newGrid;
  };

  getNewGridWithWallCreated = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  createNode = (col, row) => {
    const {
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    } = this.state;
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
    };
  };

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="modal-wrap-tabuleiro">
          <div className="divButtons">
            <Button
              onClick={() => {
                this.clearBoard();
              }}
            >
              Clear Board
            </Button>

            <Button
              onClick={() => {
                this.findMe();
              }}
            >
              FindMe!
            </Button>
            <Button
              onClick={() => {
                this.createNewBoard();
              }}
            >
              New Maze
            </Button>
          </div>

          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                        row={row}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default FindMe;
