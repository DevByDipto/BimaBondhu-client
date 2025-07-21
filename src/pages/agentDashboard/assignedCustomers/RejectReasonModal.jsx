// RejectReasonModal.jsx
import { useState } from "react";

const RejectReasonModal = ({ isOpen, onClose, onSubmit, application }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
    setReason("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Reject Application</h2>
        <p className="mb-2">Why are you rejecting <strong>{application?.name}</strong>'s application?</p>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-sm">Cancel</button>
          <button onClick={handleSubmit} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default RejectReasonModal;
