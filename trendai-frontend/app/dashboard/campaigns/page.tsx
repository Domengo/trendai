"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import toast from "react-hot-toast";
import CreateCampaignModal from "@/components/CreateCampaignModal";
import { useState } from "react";
import EditCampaignModal from "@/components/EditCampaignModal";
import { useQueryClient } from "react-query";
import Table from "@/components/CampaignTable";

export default function Campaigns() {
  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery(
    "campaigns",
    () => api.get("/campaigns").then((res) => res.data),
    {
      onError: () => {
        toast.error("Failed to load campaigns. Please try again.");
      },
    }
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      await api.delete(`/campaigns/${campaignId}`);
      toast.success("Campaign deleted successfully!");
      queryClient.invalidateQueries("campaigns");
    } catch (error) {
      if (error){
        toast.error("Failed to delete campaign.");
      }
      
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">
          Error loading campaigns. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 mt-4">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Campaigns</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Campaign</span>
          </button>
        </div>
        <Table
          data={campaigns}
          columns={["Name", "Status", "Deadline", "Actions"]}
          renderActions={(item) => (
            <>
              <button
                onClick={() => {
                  setSelectedCampaignId(item._id);
                  setIsEditModalOpen(true);
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCampaign(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </>
          )}
        />
      </div>
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCampaignId(null);
        }}
        campaignId={selectedCampaignId || ""}
      />
    </div>
  );
}
