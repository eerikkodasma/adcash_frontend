import axios from "axios";
import { API_BASE_URL } from "../../App";
import { Employee, EmployeeFormData } from "../../types/employee";

export const employeeService = {
  async fetchEmployee() {
    const response = await axios.get(`${API_BASE_URL}/employees/`);
    return response.data;
  },

  async createEmployee(employeeData: EmployeeFormData) {
    const response = await axios.post(
      `${API_BASE_URL}/employees/`,
      employeeData
    );
    return response.data;
  },

  async updateEmployee(employee: Employee) {
    const response = await axios.put(
      `${API_BASE_URL}/employees/${employee.id}/`,
      employee
    );
    return response.data;
  },

  async deleteEmployee(id: number) {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}/`);
    return response.data;
  },
};
