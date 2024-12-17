import { BUTTON_COLOR_TYPES } from "../../types/base";
import BaseButton from "./BaseButton";

export default function BaseCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <BaseButton onClick={onClose} colorType={BUTTON_COLOR_TYPES.SECONDARY}>
      Close
    </BaseButton>
  );
}
