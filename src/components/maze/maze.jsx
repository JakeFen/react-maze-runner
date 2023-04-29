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
          shortestPath: false,
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

  function visualizeAlgo(newGrid, shortestPath) {
    for (var i = 0; i < newGrid.length; i++) {
      const newNode = newGrid[i];
      setTimeout(() => {
        setGrid((grid) => {
          return grid.map((row) => {
            return row.map((node) => {
              return newNode.row === node.row && newNode.col === node.col
                ? { ...node, isVisited: true }
                : node;
            });
          });
        });
      }, 10 * i);
    }

    visualizeFastestPath(shortestPath);
  }

  function visualizeFastestPath(shortestPath) {
    for (var i = 0; i < shortestPath.length; i++) {
      const newNode = shortestPath[i];

      setTimeout(() => {
        setGrid((grid) => {
          return grid.map((row) => {
            return row.map((node) => {
              return newNode.row === node.row && newNode.col === node.col
                ? { ...node, shortestPath: true }
                : node;
            });
          });
        });
      }, 10 * i);
    }
  }

  function fastestPath(finishNode) {
    const shortestPath = [];
    let currentNode = finishNode;

    // Start from final node, add to our array, then update our current node with the previous node property
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return shortestPath;
  }

  function runAlgo() {
    const flatGrid = grid.flat();
    const startNode = flatGrid.find((node) => node.isStart);
    const finishNode = flatGrid.find((node) => node.isFinish);
    switch (selectedAlgo) {
      case "Dijkstra":
        const newGrid = runDijkstra(grid, startNode, finishNode, setGrid);
        const shortestPath = fastestPath(finishNode);
        visualizeAlgo(newGrid, shortestPath);
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
