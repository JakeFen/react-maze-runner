import "./node.scss";

export function NodeComponent({
  node,
  nodeMouseDown,
  nodeMouseEnter,
  nodeMouseOver,
  nodeMouseUp,
}) {
  const classNode = node.isStart
    ? "start-node"
    : node.isFinish
    ? "finish-node"
    : node.isWall
    ? "wall-node"
    : node.isVisited
    ? "visited-node"
    : "";

  return (
    <div
      className={`node ${classNode}`}
      onMouseDown={() => nodeMouseDown(node)}
      onMouseEnter={() => nodeMouseEnter(node)}
      onMouseOver={() => nodeMouseOver(node)}
      onMouseUp={() => nodeMouseUp()}
    ></div>
  );
}
