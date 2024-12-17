import { ReactNode } from "react";

export default function BaseModal({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-49 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
