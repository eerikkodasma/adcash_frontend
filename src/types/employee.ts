export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
}

export const initalEmployeeFormState: EmployeeFormData = {
  first_name: "",
  last_name: "",
  email: "",
};

export const enum EMPLOYEE_CRUD {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
