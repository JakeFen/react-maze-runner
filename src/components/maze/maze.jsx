import { NavBarComponent } from "../ui/nav/nav";
import { GridComponent } from "../ui/grid/grid";
import { KeyBarComponent } from "../ui/keybar/keybar";
import { useState } from "react";
import { runDijkstra } from "../../algorithms/dijkstra";
import { RunAStar } from "../../algorithms/aStar";

export function MazeRunnerComponent() {
  const [grid, setGrid] = useState(createGrid());
  const [mouseDown, setMouseDown] = useState(false);
  const [moveStartNode, setMoveStartNode] = useState(false);
  const [MoveFinishNode, setMoveFinishNode] = useState(false);
  const [selectedAlgo, setSlectedAlgo] = useState("Dijkstra");

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
          distance: Infinity,
          isVisited: false,
          previousNode: null,
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

  function updateGrid(newGrid) {
    console.log("Grid: ", grid);
    // for (const currentNode of newGrid) {
    //   setTimeout(() => {
    //     console.log(currentNode);
    //     setGrid((grid) => {
    //       return grid.map((row) => {
    //         return row.map((node) => {
    //           return currentNode.row === node.row &&
    //             currentNode.col === node.col
    //             ? { ...node, isVisited: currentNode.isVisited }
    //             : node;
    //         });
    //       });
    //     });
    //   }, 1000);
    // }
  }

  function runAlgo() {
    const flatGrid = grid.flat();
    const startNode = flatGrid.find((node) => node.isStart);
    const finishNode = flatGrid.find((node) => node.isFinish);
    switch (selectedAlgo) {
      case "Dijkstra":
        const visitedNodes = runDijkstra(grid, setGrid, startNode, finishNode);
        // updateGrid(visitedNodes);
        return true;
      case "AStar":
        return RunAStar(grid, startNode, finishNode);
    }
  }

  function updateAlgo(data) {
    setSlectedAlgo(data);
  }

  function clearBoard() {
    setGrid(createGrid());
  }

  return (
    <div>
      <NavBarComponent
        runAlgo={runAlgo}
        updateAlgo={updateAlgo}
        clearBoard={clearBoard}
      />
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
