import { Modal } from "./Modal";

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-sm text-secondary mb-5">{message}</p>
      <div className="flex gap-2">
        <button onClick={onCancel} className="flex-1 border border-border rounded-lg py-2 text-sm font-medium text-primary hover:bg-bg transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity">
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
