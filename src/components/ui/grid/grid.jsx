import { NodeComponent } from "./node/node";
import "./grid.scss";

export function GridComponent({ grid }) {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              return <NodeComponent key={nodeIdx} node={node} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
