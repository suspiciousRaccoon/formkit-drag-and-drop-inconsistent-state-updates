import React from "react";
import { useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { parents } from "@formkit/drag-and-drop";
import "./App.css";

function App() {
  const [dragStatus, setDragStatus] = useState("Not dragging");
  const [dragCount, setDragCount] = useState(0);
  const dragStatusPlugin = (parent) => {
    const parentData = parents.get(parent);
    if (!parentData) return;

    function dragstart(event) {
      const node = event.target;
      setDragStatus(`Dragging ${node.textContent}`);
      setDragCount(dragCount + 1);
    }

    function dragend() {
      setDragStatus("Not dragging");
    }

    return {
      setup() {},
      teardown() {},
      setupNode(data) {
        data.node.addEventListener("dragstart", dragstart);
        data.node.addEventListener("dragend", dragend);
      },
      tearDownNode(data) {
        data.node.removeEventListener("drastart", dragstart);
        data.node.removeEventListener("dragend", dragend);
      },
      setupNodeRemap(data) {},
      tearDownNodeRemap(data) {},
    };
  };
  const [parent, items] = useDragAndDrop(
    ["🍦 vanilla", "🍫 chocolate", "🍓 strawberry"],
    { plugins: [dragStatusPlugin] }
  );
  return (
    <div>
      <strong>Rank your favorite flavors</strong>
      <br />
      <span>{dragStatus}</span>
      <br />
      <span>{dragCount}</span>
      <ul ref={parent}>
        {items.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
