import "./node.scss";

export function NodeComponent({ node }) {
  const classNode = node.isStart
    ? "start-node"
    : node.isFinish
    ? "finish-node"
    : "";

  return <div className={`node ${classNode}`}></div>;
}
