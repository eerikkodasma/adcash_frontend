import { Employee } from "../../types/employee";

export interface EmployeeStoreState {
  loading: boolean;
  error: boolean;
  employees: Employee[];
}
