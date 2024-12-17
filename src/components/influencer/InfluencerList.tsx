import { useState, useEffect } from "react";
import {
  Influencer,
  InfluencerFormData,
  initalInfluencerFormState,
} from "../../types/influencer";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  fetchInfluencers,
  updateInfluencer,
} from "../../state/influencer/influencerSlice";
import BaseButton from "../base_components/BaseButton";
import InfluencerFormModal from "../influencer/InfluencerFormModal";
import { fetchEmployees } from "../../state/employee/employeeSlice";

export default function InfluencerList() {
  const influencerState = useAppSelector((state) => state.influencer);
  const employeeState = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [influencerModal, setInfluencerModal] = useState<
    Influencer | InfluencerFormData
  >(initalInfluencerFormState);

  useEffect(() => {
    dispatch(fetchInfluencers(searchQuery));
    dispatch(fetchEmployees());
  }, [dispatch, searchQuery]);

  const handleAssignManager = async (
    influencer: Influencer,
    newManagerId: number | null
  ) => {
    try {
      await dispatch(
        updateInfluencer({
          ...influencer,
          manager_id: newManagerId,
        })
      );
    } catch (err) {}
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-2 flex gap-2 justify-between h-10">
        <input
          type="text"
          placeholder="Filter by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md max-w-96 w-full"
        />
        <BaseButton
          onClick={() => setModalOpen(true)}
          className="px-3 py-1 float-right bg-green-500 text-white rounded text-lg"
        >
          + Create new
        </BaseButton>
      </div>

      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="text-white text-lg">
            <th className="p-2 bg-indigo-900 text-left">Name</th>
            <th className="p-2 bg-indigo-900 text-left">Social Media</th>
            <th className="p-2 bg-indigo-900 text-left">Manager</th>
          </tr>
        </thead>
        <tbody>
          {influencerState.loading ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-gray-600 pt-8 text-lg"
              >
                Loading...
              </td>
            </tr>
          ) : influencerState.error ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-red-500 pt-8 text-lg"
              >
                There has been a problem with fetching you data
              </td>
            </tr>
          ) : influencerState.influencers.length < 1 ? (
            <tr>
              <td
                colSpan={3}
                className="text-center font-semibold text-gray-600 pt-8 text-lg"
              >
                Your influencers list is currently empty.
              </td>
            </tr>
          ) : (
            influencerState.influencers.map((influencer) => (
              <tr
                onClick={() => (
                  setInfluencerModal(influencer), setModalOpen(true)
                )}
                key={influencer.id}
                className="border-b cursor-pointer hover:shadow-sm hover:bg-indigo-50"
              >
                <td className="p-2">
                  {influencer.first_name} {influencer.last_name}
                </td>
                <td className="p-2">
                  {influencer.social_media_accounts.map((account, index) => (
                    <div key={index}>
                      {account.platform}: {account.username}
                    </div>
                  ))}
                </td>
                <td className="p-2">
                  <select
                    id="emplyees"
                    value={influencer.manager?.id || 0}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleAssignManager(
                        influencer,
                        Number(e.target.value) ? Number(e.target.value) : null
                      )
                    }
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value={0}>No Manager Assigned</option>
                    {employeeState.employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.first_name} {employee.last_name} (
                        {employee.email})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <InfluencerFormModal
        isOpen={isModalOpen}
        influencer={influencerModal}
        onClose={() => (
          setModalOpen(false), setInfluencerModal(initalInfluencerFormState)
        )}
      ></InfluencerFormModal>
    </div>
  );
}
