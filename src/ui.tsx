import UIElement from "./components/ui-element";

export default function UI() {
  return (
    <UIElement>
      <div className="flex justify-between">
        <div className="border rounded-lg bg-white text-blue-500 flex flex-col p-2 m-4">
          <p>Level: 69</p>
          <p>Score: over 9000</p>
        </div>
      </div>
      <div className="border rounded-lg bg-white text-red-500 flex p-2 m-4">
        <div>Icon 1</div>
        <div>Icon 2</div>
        <div>Icon 3</div>
      </div>
    </UIElement>
  );
}
