// "use client";

// import { useState } from "react";
// import api from "@/lib/api";
// import toast from "react-hot-toast";
// import Modal from "@/components/Modal";

// export default function CreateSubmissionModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const [influencerId, setInfluencerId] = useState("");
//   const [campaignId, setCampaignId] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/submissions", {
//         influencer: influencerId,
//         campaign: campaignId,
//         content,
//       });
//       toast.success("Submission created successfully!");
//       onClose();
//     } catch (error) {
//         console.error(error);
//       toast.error("Failed to create submission. Please try again.");
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <h2 className="text-xl font-semibold mb-4">Create Submission</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Influencer ID
//             </label>
//             <input
//               type="text"
//               value={influencerId}
//               onChange={(e) => setInfluencerId(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Campaign ID
//             </label>
//             <input
//               type="text"
//               value={campaignId}
//               onChange={(e) => setCampaignId(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Content URL
//             </label>
//             <input
//               type="url"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
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

export default function CreateSubmissionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [influencers, setInfluencers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [influencerId, setInfluencerId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("pending");
const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const influencersResponse = await api.get("/influencers");
        const campaignsResponse = await api.get("/campaigns");
        setInfluencers(influencersResponse.data);
        setCampaigns(campaignsResponse.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/submissions", {
        influencer: influencerId,
        campaign: campaignId,
        content,
        status,
      });
      toast.success("Submission created successfully!");
      queryClient.invalidateQueries("submissions");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create submission. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Create Submission</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Influencer
            </label>
            <select
              value={influencerId}
              onChange={(e) => setInfluencerId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Influencer</option>
              {influencers.map((influencer: any) => (
                <option key={influencer._id} value={influencer._id}>
                  {influencer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign
            </label>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Campaign</option>
              {campaigns.map((campaign: any) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content URL
            </label>
            <input
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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