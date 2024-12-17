import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { fetchEmployees } from "../../state/employee/employeeSlice";
import { EmployeeFormModal } from "./EmployeeFormModal";
import {
  Employee,
  EmployeeFormData,
  initalEmployeeFormState,
} from "../../types/employee";
import EmployeeFormModal from "./EmployeeFormModal";
import BaseButton from "../base_components/BaseButton";

export default function EmployeeList() {
  const employeeState = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [employeeModal, setEmployeeModal] = useState<
    Employee | EmployeeFormData
  >(initalEmployeeFormState);

  return (
    <div className="container mx-auto p-4">
      <BaseButton
        onClick={() => setModalOpen(true)}
        className="px-3 py-1 mb-2 float-right bg-green-500 text-white rounded text-lg"
      >
        + Create new
      </BaseButton>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-white text-lg">
            <th className="p-2 bg-red-400 text-left">Name</th>
            <th className="p-2 bg-red-400 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {employeeState.loading ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-gray-600 pt-8 text-lg"
              >
                Loading...
              </td>
            </tr>
          ) : employeeState.error ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-red-500 pt-8 text-lg"
              >
                There has been a problem with fetching you data
              </td>
            </tr>
          ) : employeeState.employees.length < 1 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-gray-600 pt-8 text-lg"
              >
                Your empolyee list is currently empty.
              </td>
            </tr>
          ) : (
            employeeState.employees.map((employee) => (
              <tr
                onClick={() => (setEmployeeModal(employee), setModalOpen(true))}
                key={employee.id}
                className="border-b cursor-pointer hover:shadow-sm hover:bg-red-50"
              >
                <td className="p-2">
                  {employee.first_name} {employee.last_name}
                </td>
                <td className="p-2">{employee.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <EmployeeFormModal
        isOpen={isModalOpen}
        employee={employeeModal}
        onClose={() => (
          setModalOpen(false), setEmployeeModal(initalEmployeeFormState)
        )}
      ></EmployeeFormModal>
    </div>
  );
}
