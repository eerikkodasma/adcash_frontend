import { Influencer } from "../../types/influencer";

export interface InfluencerStoreState {
  loading: boolean;
  error: boolean;
  influencers: Influencer[];
}
