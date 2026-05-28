import { type ToastMessage } from "./use-Toast";
import "./toast.css";

const ICONS: Record<ToastMessage["type"], string> = {
  success: "✓",
  error: "✕",
  info: "i",
  warning: "!",
};

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: number) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  return (
    <div className={`toast toast--${toast.type}`} role="alert">
      <span className="toast__icon">{ICONS[toast.type]}</span>
      <span className="toast__text">{toast.text}</span>
      <button
        className="toast__close"
        onClick={() => onRemove(toast.id)}
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
