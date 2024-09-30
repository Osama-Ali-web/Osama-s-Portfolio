import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useOutSideClick } from "../hooks/useOutSideClick";
import { ModalVariant } from "../animation variants/ModalVariant";

export default function Modal({
  isLoading,
  children,
  onClose,
  title,
  size = "small",
  cancelButtonType = "reset",
}) {
  const ref = useOutSideClick(onClose);

  function handleClose() {
    onClose();
  }
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return createPortal(
    <AnimatePresence>
      <div className=" fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-opacity-40 backdrop-blur-sm">
        <motion.div
          key="modalBackdrop"
          variants={ModalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          ref={ref}
          className={` no-scrollbar relative flex max-h-[calc(100vh-5em)] flex-col gap-2 overflow-y-auto rounded-2xl bg-gradient-to-br from-designColor to-sky-500 px-3 py-8 sm:gap-8 ${size === "large" ? "w-[90%]" : " w-[90%] lg:w-[50%]"}`}
        >
          <button
            onClick={handleClose}
            disabled={isLoading}
            className=" to absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border-none bg-gradient-to-br from-designColor to-sky-500 pb-1 text-2xl font-semibold leading-none text-gray-200 shadow-lg outline-none duration-300 hover:bg-none focus:ring-2 focus:ring-designColor disabled:animate-pulse disabled:cursor-not-allowed disabled:text-red-500"
          >
            <span>&times;</span>
          </button>
          <h2 className=" text-center text-xl font-bold capitalize text-stone-100">
            {title}
          </h2>
          <div
            key="modalContent"
            className="  text-sm text-stone-200 sm:text-lg "
          >
            {children}
          </div>
          <div className=" self-end">
            <button
              type={cancelButtonType}
              disabled={isLoading}
              className=" to rounded-md border-none bg-gradient-to-br from-designColor to-stone-700  px-4 py-1.5 text-lg font-semibold capitalize text-red-50  shadow-xl outline-none transition-all duration-200 hover:from-stone-700 hover:to-designColor focus:ring-2 focus:ring-designColor focus:ring-offset-2 "
              onClick={onClose}
            >
              cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}
