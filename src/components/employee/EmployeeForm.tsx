import { useState } from "react";
import {
  Employee,
  EMPLOYEE_CRUD,
  EmployeeFormData,
  initalEmployeeFormState,
} from "../../types/employee";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../state/employee/employeeSlice";
import { useAppDispatch } from "../../state/hooks";
import BaseButton from "../base_components/BaseButton";
import { BaseCloseButton } from "../base_components/BaseCloseButton";
import { ALERT_TYPE } from "../../state/alert/alertTypes";
import { setAlert } from "../../state/alert/alertSlice";

export function EmployeeForm({
  employee,
  onClose,
}: {
  employee: Employee | EmployeeFormData;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState(employee);
  const [errors, setErrors] = useState<{ [x: string]: string[] }>({});
  const dispatch = useAppDispatch();

  const handleForm = async (formAction: EMPLOYEE_CRUD) => {
    setErrors({});

    try {
      switch (formAction) {
        case EMPLOYEE_CRUD.CREATE:
          await dispatch(
            createEmployee(formState as EmployeeFormData)
          ).unwrap();
          break;
        case EMPLOYEE_CRUD.UPDATE:
          await dispatch(updateEmployee(formState as Employee)).unwrap();
          break;
        case EMPLOYEE_CRUD.DELETE:
          await dispatch(deleteEmployee((formState as Employee).id)).unwrap();
          break;
      }
      setFormState(initalEmployeeFormState);
      onClose();
    } catch (err: any) {
      switch (formAction) {
        case EMPLOYEE_CRUD.CREATE:
          dispatch(
            setAlert({
              message: "Error when creating employee",
              type: ALERT_TYPE.DANGER,
            })
          );
          break;
        case EMPLOYEE_CRUD.UPDATE:
          dispatch(
            setAlert({
              message: "Error when updating employee",
              type: ALERT_TYPE.DANGER,
            })
          );
          break;
        case EMPLOYEE_CRUD.DELETE:
          dispatch(
            setAlert({
              message: "Error when deleting employee",
              type: ALERT_TYPE.DANGER,
            })
          );
          break;
      }
      setErrors(err);
    }
  };
  return (
    <>
      <form className="max-w-md mx-auto py-4">
        <div className="mb-4">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formState.first_name}
            onChange={(e) =>
              setFormState({ ...formState, first_name: e.target.value })
            }
            maxLength={50}
            className="w-full p-2 border rounded"
            required
          />
          {errors["first_name"] && (
            <div className="text-red-500 mb-4">*{errors["first_name"]}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formState.last_name}
            onChange={(e) =>
              setFormState({ ...formState, last_name: e.target.value })
            }
            maxLength={50}
            className="w-full p-2 border rounded"
            required
          />
          {errors["last_name"] && (
            <div className="text-red-500 mb-4">*{errors["last_name"]}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            maxLength={50}
            className="w-full p-2 border rounded"
            required
          />
          {errors["email"] && (
            <div className="text-red-500 mb-4">*{errors["email"]}</div>
          )}
        </div>
      </form>

      <div className="flex justify-end gap-2">
        {"id" in employee ? (
          <>
            <BaseButton onClick={() => handleForm(EMPLOYEE_CRUD.UPDATE)}>
              Save
            </BaseButton>
            <BaseButton
              onClick={() => handleForm(EMPLOYEE_CRUD.DELETE)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </BaseButton>
          </>
        ) : (
          <BaseButton onClick={() => handleForm(EMPLOYEE_CRUD.CREATE)}>
            Create
          </BaseButton>
        )}
        <BaseCloseButton onClose={() => onClose()} />
      </div>
    </>
  );
}
