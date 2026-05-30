import DetailAnalytics from "./analytics/detail-analytics";
import ChatXPSummary from "./chat-xp/chat-xp-summary";
import Contracts from "./contracts/contracts";
import Funnel from "./funnel/funnel";
import Quoter from "./quoter/quoter";
import UnitComparator from "./unit-comparator/unit-comparator";

export default function DetailBody() {
  return (
    <>
      <DetailAnalytics />
      <ChatXPSummary />
      <UnitComparator />
      <Quoter />
      <Funnel />
      <Contracts />
    </>
  );
}
