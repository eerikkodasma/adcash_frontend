import { EmployeeForm } from "./EmployeeForm";
import { Employee, EmployeeFormData } from "../../types/employee";
import { BaseModal } from "../base_components/BaseModal";

export function EmployeeFormModal({
  isOpen,
  employee,
  onClose,
}: {
  isOpen: boolean;
  employee: Employee | EmployeeFormData;
  onClose: () => void;
}) {
  return (
    <BaseModal isOpen={isOpen}>
      <div className="text-lg font-semibold border-b pb-1">
        {employee ? "Employee edit" : "Employee create"}
      </div>

      <EmployeeForm employee={employee} onClose={() => onClose()} />
    </BaseModal>
  );
}
