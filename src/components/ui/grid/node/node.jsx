import "./node.scss";

export function NodeComponent({
  node,
  nodeMouseDown,
  nodeMouseEnter,
  nodeMouseUp,
}) {
  const classNode = node.isStart
    ? "start-node"
    : node.isFinish
    ? "finish-node"
    : node.isWall
    ? "wall-node"
    : "";

  return (
    <div
      className={`node ${classNode}`}
      onMouseDown={() => nodeMouseDown(node)}
      onMouseEnter={() => nodeMouseEnter(node)}
      onMouseUp={() => nodeMouseUp()}
    ></div>
  );
}
