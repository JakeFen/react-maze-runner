import { NodeComponent } from "./node/node";
import "./grid.scss";

export function GridComponent({
  grid,
  nodeMouseDown,
  nodeMouseEnter,
  nodeMouseOver,
  nodeMouseUp,
}) {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              return (
                <NodeComponent
                  key={nodeIdx}
                  node={node}
                  nodeMouseDown={nodeMouseDown}
                  nodeMouseEnter={nodeMouseEnter}
                  nodeMouseOver={nodeMouseOver}
                  nodeMouseUp={nodeMouseUp}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
