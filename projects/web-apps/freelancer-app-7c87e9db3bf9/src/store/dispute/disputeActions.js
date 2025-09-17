import { disputeConstants } from "./disputeConstants";

const disputeActions = {};

disputeActions.getDisputeList = () => ({
  type: disputeConstants.DISPUTE_LIST_SAGA,
});

disputeActions.getDisputeCategories = () => ({
  type: disputeConstants.DISPUTE_LIST_CATEGORIES_SAGA,
});

export { disputeActions };
