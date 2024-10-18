import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "./Button";
import * as React from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";

export const Modal: React.FC<IProjectDetailProps> = forwardRef(function Modal(
  { children, ...props },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
    };
  });

  return (
    <dialog
      className="backdrop:bg-stone-900/90 p-4 rounded-md  shadow-md border"
      ref={dialogRef}
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button {...props}>Close</Button>
      </form>
    </dialog>
  );
});
