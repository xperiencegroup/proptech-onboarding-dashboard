import BrochureButton from "./components/brochure-button/brochure-button";
import Chat from "./components/chat/chat";
import TopbarLogin from "./components/login/topbar-login";
import TopbarLogo from "./components/logo/topbar-logo";
import SideMenu from "./components/side-menu/side-menu";

export default function InterfazAluna() {
  return (
    <>
      <div className="aluna-topbar">
        <TopbarLogo />
        <TopbarLogin />
      </div>

      <SideMenu />
      <BrochureButton />
      <Chat />
    </>
  );
}
