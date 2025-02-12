"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { useQueryClient } from "react-query";
import { Loader } from "lucide-react";
import { User, Campaign } from "@/types";

export default function CreateInfluencerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const selectedUser = users.find((user) => user._id === selectedUserId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersRes, campaignsRes] = await Promise.all([
          api.get("/auth/users"),
          api.get("/campaigns"),
        ]);
        setUsers(usersRes.data);
        setCampaigns(campaignsRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!selectedUser) {
        toast.error("Please select a user");
        return;
      }
      await api.post("/influencers", {
        name: selectedUser?.name,
        user: selectedUserId,
        joinedCampaigns: selectedCampaigns,
      });
      toast.success("Influencer created successfully!");
      queryClient.invalidateQueries("influencers");
      onClose();
    } catch (error) {
      console.error("error creating influencer", error);
      toast.error("Failed to create influencer. Please try again.");
    } finally {
      setIsLoading(false);
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
              {users.map((user: User) => (
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
            {/* <select
              multiple
              value={selectedCampaigns}
              onChange={(e) =>
                setSelectedCampaigns(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              {campaigns.map((campaign: Campaign) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
                </option>
              ))}
            </select> */}
            <div className="space-y-2">
              {campaigns.map((campaign: Campaign) => (
                <div key={campaign._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`campaign-${campaign._id}`}
                    value={campaign._id}
                    checked={selectedCampaigns.includes(campaign._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCampaigns([
                          ...selectedCampaigns,
                          campaign._id,
                        ]);
                      } else {
                        setSelectedCampaigns(
                          selectedCampaigns.filter((id) => id !== campaign._id)
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
                Creating Influencer...
              </>
            ) : (
              "Create Influencer"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
