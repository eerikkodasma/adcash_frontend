import Alert from "./components/Alert";
import MainLayout from "./layouts/MainLayout";

export const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export default function App() {
  return (
    <>
      <Alert />
      <MainLayout />
    </>
  );
}
