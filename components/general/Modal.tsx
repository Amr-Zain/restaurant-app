import React from "react";
import "./modal.scss";
import { TimesIcon } from "@/components/Icons";
type Props = {
  persist?: boolean;
  title?: string;
  classes?: string;
  titleClasses?: string;
  iconColor?: string;
  closeBtnClass?: string;
  contentClass?: string;
  modalClass?: string;
  description?: string;
  hasCloseBtn?: boolean; // true
  hideHeader?: boolean; // false
  children?: React.ReactNode;
  close: () => void;
};

const Modal = ({ hasCloseBtn = true, ...props }: Props) => {
  function onClose() {
    if (props.persist) return;

    close();
  }
  return (
    <div
      className={`base-modal px-3 bg-[#00000083] flex items-center justify-center 
  fixed top-0 left-0 w-screen h-screen z-1007 
  ${props.modalClass ? props.modalClass : ""}`}
      onClick={onClose}
    >
      <div
        className={`base-modal-content max-h-[650px] min-h-[300px] 
    overflow-y-auto rounded-3xl bg-bgcolor relative ${
      props.classes ? props.classes : ""
    }`}
        onClick={(e) => e.stopPropagation()}
      >
        {!props.hideHeader && (
          <div className="bg-white p-5 top_header">
            <div
              className={`flex items-center justify-between gap-5 ${
                props.closeBtnClass ? props.closeBtnClass : ""
              }`}
            >
              {props.title && (
                <h3
                  className={`${
                    props.titleClasses ? props.titleClasses : ""
                  } text-lg font-semibold`}
                >
                  {props.title}
                </h3>
              )}

              {hasCloseBtn && (
                <button
                  type="button"
                  className={props.iconColor}
                  onClick={props.close}
                >
                  <TimesIcon />
                </button>
              )}
            </div>
          </div>
        )}

        {props.description && <p className="text-third">{props.description}</p>}

        <div
          className={`${
            props.contentClass ? props.contentClass : ""
          } my-auto h-full p-5 overflow-x-hidden relative`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
