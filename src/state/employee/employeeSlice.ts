import { EmployeeStoreState } from "./employeeTypes";
import { employeeService } from "./employeeApi";
import { Employee, EmployeeFormData } from "../../types/employee";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAlert } from "../alert/alertSlice";
import { ALERT_TYPE } from "../alert/alertTypes";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await employeeService.fetchEmployee();
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to fetch employees",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData: EmployeeFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await employeeService.createEmployee(employeeData);
      dispatch(
        setAlert({
          message: "Success when creating employee",
          type: ALERT_TYPE.SUCCESS,
        })
      );
      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when creating employee",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: Employee, { rejectWithValue, dispatch }) => {
    try {
      const response = await employeeService.updateEmployee(employee);
      dispatch(
        setAlert({
          message: "Success when updating employee",
          type: ALERT_TYPE.SUCCESS,
        })
      );
      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when updating employee",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      dispatch(
        setAlert({
          message: "Success when deleting employee",
          type: ALERT_TYPE.SUCCESS,
        })
      );
      return response;
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Error when deleting employee",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: EmployeeStoreState = {
  employees: [],
  loading: true,
  error: false,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Employee
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // Create Employee
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });

    // Update Employee
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.employees.map((employee, index) => {
        if (employee.id === action.payload.id) {
          state.employees[index] = action.payload;
        }
      });
    });

    // Delete Employee
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.meta.arg
      );
    });
  },
});

export default employeesSlice.reducer;
