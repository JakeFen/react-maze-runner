import { NavBarComponent } from "../ui/nav/nav";
import { GridComponent } from "../ui/grid/grid";
import { KeyBarComponent } from "../ui/keybar/keybar";
import { useState } from "react";

export function MazeRunnerComponent() {
  const [startNode, setStartNode] = useState({ row: 10, col: 10 });
  const [finishNode, setEndNode] = useState({ row: 10, col: 35 });
  const [grid, setGrid] = useState(createGrid());
  const [mouseDown, setMouseDown] = useState(false);

  function createGrid() {
    const grid = [];

    for (let row = 0; row < 21; row++) {
      const gridRow = [];
      for (let col = 0; col < 46; col++) {
        gridRow.push({
          row,
          col,
          isWall: false,
          isStart: row === startNode.row && col === startNode.col,
          isFinish: row === finishNode.row && col === finishNode.col,
        });
      }
      grid.push(gridRow);
    }
    return grid;
  }

  function nodeMouseDown(node) {
    setMouseDown(true);
    if (!node.isStart && !node.isFinish) {
      updateWall(node);
    }
  }

  function nodeMouseEnter(node) {
    if (!mouseDown) return;
    updateWall(node);
  }

  function nodeMouseUp() {
    setMouseDown(false);
  }

  function updateWall(currentNode) {
    setGrid((grid) => {
      return grid.map((row) => {
        return row.map((node) => {
          return currentNode.row === node.row && currentNode.col === node.col
            ? { ...node, isWall: !currentNode.isWall }
            : node;
        });
      });
    });
  }

  return (
    <div>
      <NavBarComponent />
      <KeyBarComponent />
      <GridComponent
        grid={grid}
        nodeMouseDown={nodeMouseDown}
        nodeMouseEnter={nodeMouseEnter}
        nodeMouseUp={nodeMouseUp}
      />
    </div>
  );
}
