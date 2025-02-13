"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { Loader } from "lucide-react";
import { Campaign } from "@/types";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [influencerRes, campaignsRes] = await Promise.all([
          api.get(`/influencers/${influencerId}`),
          api.get("/campaigns"),
        ]);
        setName(influencerRes.data.name);
        // setSelectedCampaignIds(influencerRes.data.joinedCampaigns || []);
        setSelectedCampaignIds(
          influencerRes.data.joinedCampaigns.map((campaign: any) => campaign._id)
        );
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            <div className="space-y-2">
              {campaigns.map((campaign: Campaign) => (
                <div key={campaign._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`campaign-${campaign._id}`}
                    value={campaign._id}
                    checked={selectedCampaignIds.includes(campaign._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCampaignIds([
                          ...selectedCampaignIds,
                          campaign._id,
                        ]);
                      } else {
                        setSelectedCampaignIds(
                          selectedCampaignIds.filter(
                            (id) => id !== campaign._id
                          )
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`campaign-${campaign._id}`}>
                    {campaign.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
