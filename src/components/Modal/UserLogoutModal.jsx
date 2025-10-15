import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const UserLogoutModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="text-gray-700 hover:text-red-500"
      >
        Open Logout Modal
      </button>

      {/* Popup modal */}
      <Popup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeOnDocumentClick
        modal
      >
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Log Out</h2>
          <p className="text-gray-500 mb-5 text-sm">
            Are you sure you want to log out?
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                console.log("User logged out");
                setModalOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default UserLogoutModal;
