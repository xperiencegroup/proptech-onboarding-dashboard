import "./overlay-shadow.css";

export default function OverlayShadow() {
  return (
    <div className="absolute top-0 left-0 inset-0 z-100 w-full h-full pointer-events-none overlay-shadow" />
  );
}
