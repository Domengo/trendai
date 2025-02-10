// "use client";

// import { useState } from "react";
// import api from "@/lib/api";
// import toast from "react-hot-toast";
// import Modal from "@/components/Modal";

// export default function CreateInfluencerModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const [name, setName] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/influencers", {
//         name,
//       });
//       toast.success("Influencer created successfully!");
//       onClose();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to create influencer. Please try again.");
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <h2 className="text-xl font-semibold mb-4">Create Influencer</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//           >
//             Create
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { useQueryClient } from "react-query";

export default function CreateInfluencerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get("/users");
        const campaignsResponse = await api.get("/campaigns");
        setUsers(usersResponse.data);
        setCampaigns(campaignsResponse.data);
      } catch (error) {
        toast.error("Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/influencers", {
        user: selectedUserId,
        joinedCampaigns: selectedCampaigns,
      });
      toast.success("Influencer created successfully!");
      queryClient.invalidateQueries("influencers");
      onClose();
    } catch (error) {
      toast.error("Failed to create influencer. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create Influencer</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select User</option>
              {users.map((user: any) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Joined Campaigns (Optional)
            </label>
            <select
              multiple
              value={selectedCampaigns}
              onChange={(e) =>
                setSelectedCampaigns(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              {campaigns.map((campaign: any) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}