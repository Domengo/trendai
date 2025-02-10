"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

export default function EditInfluencerModal({
  isOpen,
  onClose,
  influencerId,
}: {
  isOpen: boolean;
  onClose: () => void;
  influencerId: string;
}) {
  const [name, setName] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchInfluencer = async () => {
  //     try {
  //       const response = await api.get(`/influencers/${influencerId}`);
  //       setName(response.data.name);
  //     } catch (error) {
  //       toast.error("Failed to fetch influencer. Please try again.");
  //     }
  //   };
  //   if (isOpen) fetchInfluencer();
  // }, [isOpen, influencerId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [influencerRes, campaignsRes] = await Promise.all([
          api.get(`/influencers/${influencerId}`),
          api.get("/campaigns"),
        ]);
        setName(influencerRes.data.name);
        setSelectedCampaignIds(influencerRes.data.joinedCampaigns || []);
        setCampaigns(campaignsRes.data);
      } catch (error) {
        console.error("Fetching influencer error", error);
        toast.error("Failed to fetch influencer, please try again");
      }
    };
    if (isOpen) fetchData();
  }, [isOpen, influencerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/influencers/${influencerId}`, {
        name,
        joinedCampaigns: selectedCampaignIds,
      });
      toast.success("Influencer updated successfully!");
      onClose();
    } catch (error) {
      console.error("Update influencer error", error);
      toast.error("Failed to update influencer. Please try again.");
    }
  };

  return (
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <h2 className="text-xl font-semibold mb-4">Edit Influencer</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    //           Name
    //         </label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
    //       >
    //         Update
    //       </button>
    //     </div>
    //   </form>
    // </Modal>
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Influencer</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Joined Campaigns
            </label>
            <select
              multiple
              value={selectedCampaignIds}
              onChange={(e) =>
                setSelectedCampaignIds(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
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
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
