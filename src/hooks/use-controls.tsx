import { useEffect, useRef } from "react";

export type KeyHandler =
  | ((e: KeyboardEvent) => void)
  | {
      onPress?: (e: KeyboardEvent) => void;
      onRelease?: (e: KeyboardEvent) => void;
    };

export type ControlSchema = {
  keyboard?: Record<string, KeyHandler>;
  mouse?: {
    onClick?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
  };
};

export function useControls(schema: ControlSchema) {
  const pressedKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = schema.keyboard?.[e.key];
      if (!handler) return;

      // If key is already pressed (and holding), don't trigger again
      if (pressedKeys.current.has(e.key)) return;
      pressedKeys.current.add(e.key);

      if (typeof handler === "function") {
        handler(e);
      } else {
        handler.onPress?.(e);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const handler = schema.keyboard?.[e.key];
      if (!handler) return;

      pressedKeys.current.delete(e.key);

      if (typeof handler !== "function") {
        handler.onRelease?.(e);
      }
    };

    const handleClick = (e: MouseEvent) => {
      schema.mouse?.onClick?.(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      schema.mouse?.onMouseMove?.(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      schema.mouse?.onMouseDown?.(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      schema.mouse?.onMouseUp?.(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    if (schema.mouse?.onClick) {
      window.addEventListener("click", handleClick);
    }
    if (schema.mouse?.onMouseMove) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    if (schema.mouse?.onMouseDown) {
      window.addEventListener("mousedown", handleMouseDown);
    }
    if (schema.mouse?.onMouseUp) {
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (schema.mouse?.onClick) {
        window.removeEventListener("click", handleClick);
      }
      if (schema.mouse?.onMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (schema.mouse?.onMouseDown) {
        window.removeEventListener("mousedown", handleMouseDown);
      }
      if (schema.mouse?.onMouseUp) {
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [schema]);
}
