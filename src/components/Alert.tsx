import { useEffect } from "react";
import { clearAlert } from "../state/alert/alertSlice";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { ALERT_TYPE } from "../state/alert/alertTypes";
import BaseButton from "./base_components/BaseButton";

export default function Alert() {
  const { message, type } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  const alertClass =
    type === ALERT_TYPE.SUCCESS
      ? "bg-green-100 text-green-700 border-green-500"
      : "bg-red-100 text-red-700 border-red-500";

  return (
    <div
      className={`fixed top-4 right-4 max-w-96 w-full z-50 flex gap-1 justify-between p-3 border border-solid rounded ${alertClass}`}
    >
      <div className="flex gap-1">
        {type === ALERT_TYPE.SUCCESS ? (
          <strong>Success!</strong>
        ) : (
          <strong>Danger!</strong>
        )}
        {message}
      </div>
      <BaseButton
        onClick={() => dispatch(clearAlert())}
        className="bg-inherit font-semibold hover:text-gray-900"
      >
        x
      </BaseButton>
    </div>
  );
}
