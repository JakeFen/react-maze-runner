import { NavBarComponent } from "../ui/nav/nav";
import { GridComponent } from "../ui/grid/grid";
import { KeyBarComponent } from "../ui/keybar/keybar";
import { useState } from "react";

export function MazeRunnerComponent() {
  const [startNode, setStartNode] = useState({ row: 10, col: 10 });
  const [finishNode, setEndNode] = useState({ row: 10, col: 35 });
  const [grid, setGrid] = useState(createGrid());

  function createGrid() {
    const grid = [];

    for (let row = 0; row < 21; row++) {
      const gridRow = [];
      for (let col = 0; col < 46; col++) {
        gridRow.push({
          row,
          col,
          isStart: row === startNode.row && col === startNode.col,
          isFinish: row === finishNode.row && col === finishNode.col,
        });
      }
      grid.push(gridRow);
    }
    return grid;
  }

  return (
    <div>
      <NavBarComponent />
      <KeyBarComponent />
      <GridComponent grid={grid} />
    </div>
  );
}
