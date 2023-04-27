import { NavBarComponent } from "../ui/nav/nav";
import { GridComponent } from "../ui/grid/grid";
import { KeyBarComponent } from "../ui/keybar/keybar";
import { useState } from "react";

export function MazeRunnerComponent() {
  const [grid, setGrid] = useState(createGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [moveStartNode, setMoveStartNode] = useState(false);
  const [MoveFinishNode, setMoveFinishNode] = useState(false);

  function createGrid() {
    const startNode = { row: 10, col: 10 };
    const finishNode = { row: 10, col: 35 };
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
    } else if (node.isStart) {
      setMoveStartNode(true);
    } else if (node.isFinish) {
      setMoveFinishNode(true);
    }
  }

  function nodeMouseEnter(node) {
    if (!mouseDown) return;
    if (!moveStartNode && !MoveFinishNode) {
      updateWall(node);
    }
  }

  function nodeMouseOver(node) {
    if (!mouseDown) return;
    if (moveStartNode) {
      updateStart(node);
    } else if (MoveFinishNode) {
      updateFinish(node);
    }
  }

  function nodeMouseUp() {
    setMouseDown(false);
    setMoveStartNode(false);
    setMoveFinishNode(false);
  }

  function updateStart(currentNode) {
    setGrid((grid) => {
      return grid.map((row) => {
        return row.map((node) => {
          return currentNode.row === node.row && currentNode.col === node.col
            ? { ...node, isStart: true }
            : { ...node, isStart: false };
        });
      });
    });
  }

  function updateFinish(currentNode) {
    setGrid((grid) => {
      return grid.map((row) => {
        return row.map((node) => {
          return currentNode.row === node.row && currentNode.col === node.col
            ? { ...node, isFinish: true }
            : { ...node, isFinish: false };
        });
      });
    });
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
        nodeMouseOver={nodeMouseOver}
        nodeMouseUp={nodeMouseUp}
      />
    </div>
  );
}
