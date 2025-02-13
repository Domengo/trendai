"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus, Pen, LucideTrash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateInfluencerModal from "@/components/CreateInfluencerModal";
import EditInfluencerModal from "@/components/EditInfluencerModal";
import { useQueryClient } from "react-query";
import InfluencerTable from "@/components/InfluencerTable";
import Tooltip from "@/components/Tooltip";

export default function Influencers() {
  const {
    data: influencers,
    isLoading,
    error,
  } = useQuery(
    "influencers",
    () => api.get("/influencers").then((res) => res.data),
    {
      onError: () => {
        toast.error("Failed to load influencers. Please try again.");
      },
    }
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<
    string | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteInfluencer = async (influencerId: string) => {
    try {
      await api.delete(`/influencers/${influencerId}`);
      toast.success("Influencer deleted successfully!");
      queryClient.invalidateQueries("influencers");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete influencer.");
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
          Error loading influencers. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Influencers</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Influencer</span>
          </button>
        </div>
        <InfluencerTable
          data={influencers}
          renderActions={(item) => (
            <>
              <Tooltip text="Edit Influencer">
                <button
                  onClick={() => {
                    setSelectedInfluencerId(item._id);
                    setIsEditModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded mr-2"
                >
                  <Pen className="w-4 h-4 mr-2" />
                </button>
              </Tooltip>
              <Tooltip text="Delete Influencer">
                <button
                  onClick={() => handleDeleteInfluencer(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded"
                >
                  <LucideTrash className="w-4 h-4 mr-2" />
                </button>
              </Tooltip>
            </>
          )}
        />
      </div>
      <CreateInfluencerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditInfluencerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInfluencerId(null);
        }}
        influencerId={selectedInfluencerId || ""}
      />
    </div>
  );
}
