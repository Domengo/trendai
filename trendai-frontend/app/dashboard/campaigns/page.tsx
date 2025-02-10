"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import Table from "@/components/Table";
import toast from "react-hot-toast";
import CreateCampaignModal from "@/components/CreateCampaignModal";
import { useState } from "react";

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
        <Table data={campaigns} columns={["Name", "Status", "Deadline"]} />
      </div>
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
