import { ReactNode } from "react";
import { BUTTON_COLOR_TYPES, BUTTON_TYPE } from "../../types/base";

interface ModalProps {
  children?: ReactNode;
  type?: BUTTON_TYPE;
  colorType?: BUTTON_COLOR_TYPES;
  className?: string;
  onClick: () => void;
}

function BaseButton({
  children,
  type = BUTTON_TYPE.BUTTON,
  colorType = BUTTON_COLOR_TYPES.PRIMARY,
  className,
  onClick,
}: ModalProps) {
  const colorStyles = {
    PRIMARY: "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
    SECONDARY: "px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={className ? className : colorStyles[colorType]}
    >
      {children}
    </button>
  );
}

export default BaseButton;
