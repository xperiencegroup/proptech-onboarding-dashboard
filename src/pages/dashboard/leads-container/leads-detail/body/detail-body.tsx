import DetailAnalytics from "./analytics/detail-analytics";
import Contracts from "./contracts/contracts";
import Funnel from "./funnel/funnel";
import Quoter from "./quoter/quoter";
import UnitComparator from "./unit-comparator/unit-comparator";

export default function DetailBody() {
  return (
    <>
      <DetailAnalytics />
      <UnitComparator />
      <Quoter />
      <Funnel />
      <Contracts />
    </>
  );
}
