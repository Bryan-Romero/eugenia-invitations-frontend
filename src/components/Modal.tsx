import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  return (
    <div className="bg-slate-400/50 flex fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="bg-gray-100 m-auto w-fit h-fit flex flex-col items-center rounded-2xl px-6 py-7 shadow-md">
        <button
          className="bg-red-500 mb-8 p-2 self-end text-white font-semibold rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default function ModalPortal({ children, onClose }: Props) {
  return ReactDOM.createPortal(
    <Modal onClose={onClose}>{children}</Modal>,
    document.getElementById("modal-root")!
  );
}
