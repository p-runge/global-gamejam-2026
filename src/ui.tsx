import UIElement from "./components/ui-element";

export default function UI() {
  return (
    <UIElement>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        className="border rounded-lg bg-white text-blue-500 flex flex-col p-2 m-4"
      >
        <p>Level: 69</p>
        <p>Score: over 9000</p>
      </div>
    </UIElement>
  );
}
