import BaseModal from "../base_components/BaseModal";
import { Influencer, InfluencerFormData } from "../../types/influencer";
import InfluencerForm from "./InfluencerForm";

export default function InfluencerFormModal({
  isOpen,
  influencer,
  
  onClose,
}: {
  isOpen: boolean;
  influencer: Influencer | InfluencerFormData;
  onClose: () => void;
}) {
  return (
    <BaseModal isOpen={isOpen}>
      <div className="text-lg font-semibold border-b pb-1">
        {influencer ? "Influencer edit" : "Influencer create"}
      </div>

      <InfluencerForm influencer={influencer} onClose={() => onClose()} />
    </BaseModal>
  );
}
