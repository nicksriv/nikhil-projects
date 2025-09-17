import { axios } from "../../helper/axios";
import { disputeConstants } from "./disputeConstants";

const disputeApis = {};

disputeApis.getDisputeApi = async () => {
  const res = await axios.get(disputeConstants.DISPUTE_LIST_API);
  return res;
};

disputeApis.getDisputeCategoriesApi = async () => {
  const res = await axios.get(disputeConstants.DISPUTE_LIST_CATEGORIES_API);
  return res;
};

disputeApis.createDisputeApi = async (payload) => {
  const res = await axios.post(disputeConstants.CREATE_DISPUTE_API, payload);
  return res;
};

export { disputeApis };
