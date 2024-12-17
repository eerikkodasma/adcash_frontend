import { useState } from "react";
import { InfluencerList } from "../components/influencer/InfluencerList";
import { EmployeeList } from "../components/employee/EmployeeList";
import BaseButton from "../components/base_components/BaseButton";

function MainLayout() {
  const enum VIEWS {
    INFLUENCERLIST = "INFLUENCERLIST",
    EMPLOYEELIST = "EMPLOYEELIST",
  }
  const [activeTab, setActiveTab] = useState<VIEWS>(VIEWS.INFLUENCERLIST);

  return (
    <div className="container mx-auto p-4 shadow-lg m-[10%]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Influencer Management
      </h1>

      <div className="flex justify-center mb-4">
        <BaseButton
          onClick={() => setActiveTab(VIEWS.INFLUENCERLIST)}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === VIEWS.INFLUENCERLIST
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Influencer List
        </BaseButton>
        <BaseButton
          onClick={() => setActiveTab(VIEWS.EMPLOYEELIST)}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === VIEWS.EMPLOYEELIST
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Employee List
        </BaseButton>
      </div>

      {activeTab === VIEWS.INFLUENCERLIST ? (
        <InfluencerList />
      ) : (
        <EmployeeList />
      )}
    </div>
  );
}

export default MainLayout;
