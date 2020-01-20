import React, {Component} from 'react';

import './node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
  
    return (
      <div
        id={`node-${row}-${col}`}
       
        className={`node `}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        >
         { isStart ?    <img   src="https://i.ya-webdesign.com/images/mario-icon-png-3.png" alt='' /> : ''}
         { isFinish ?    <img   alt='' src="https://i.pinimg.com/originals/8d/4f/ec/8d4fec402b8154546a34b4a8bb77d06f.jpg" /> : ''}

         { isWall ?    <img   alt='' src="https://i.pinimg.com/originals/c0/72/07/c07207f2fa7560aa1ff23245f9f71304.jpg" /> : ''}
         
        </div>
    );
  }
}