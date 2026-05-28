import TopbarLogin from "./components/login/topbar-login";
import TopbarLogo from "./components/logo/topbar-logo";

export default function InterfazAluna() {
  return (
    <div className="aluna-topbar">
      <TopbarLogo />
      <TopbarLogin />
    </div>
  );
}
