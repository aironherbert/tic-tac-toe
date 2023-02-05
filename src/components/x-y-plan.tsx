import styled from "@emotion/styled";
import { useRef, useState } from "react";

const Container = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  margin: 1em 1em 1em 0;
  position: relative;
  cursor: crosshair;
  & svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const Point = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: calc(${(props: { x: number; y: number }) => props.y}px - 5px);
  left: calc(${(props: { x: number; y: number }) => props.x}px - 5px);
`;

interface Position {
  x: number;
  y: number;
}
export default function XYPlan() {
  const [positions, setPositions] = useState<Position[]>([]);
  const currentPosition = useRef<Position>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: any) => {
    var eventDoc, doc, body;

    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }

    const rect = ref.current?.getBoundingClientRect();

    const x = event.pageX - (rect?.left ?? 0);

    const y = event.pageY - (rect?.top ?? 0);

    currentPosition.current = { x, y };
  };
  document.onmousemove = handleMouseMove;
  return (
    <div style={{ display: "flex" }}>
      <div>
        {positions.length} positions
        <Container
          ref={ref}
          onMouseMove={handleMouseMove}
          onClick={() => setPositions([...positions, currentPosition.current])}
        >
          {positions.map((position, index) => (
            <Point key={index} x={position.x} y={position.y} />
          ))}
        </Container>
        <button
          onClick={() => {
            setPositions([]);
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <h2>Positions</h2>
        <div>
          {positions.map((position, index) => (
            <div key={index}>
              {index + 1}: {position.x}, {position.y}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

