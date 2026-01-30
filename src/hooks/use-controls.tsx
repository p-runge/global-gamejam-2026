import { useEffect } from "react";

export type ControlSchema = {
  keyboard?: Record<string, (e: KeyboardEvent) => void>;
  mouse?: {
    onClick?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
  };
};

export function useControls(schema: ControlSchema) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = schema.keyboard?.[e.key];
      if (handler) {
        handler(e);
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
