import { Employee } from "../../types/employee";

export interface EmployeeState {
  loading: boolean;
  error: boolean;
  employees: Employee[];
}
