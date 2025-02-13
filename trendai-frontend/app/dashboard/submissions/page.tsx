"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateSubmissionModal from "@/components/CreateSubmissionModal";
import { useQueryClient } from "react-query";
import EditSubmissionModal from "@/components/EditSubmissionModal";
import SubmissionTable from "@/components/SubmissionTable";

export default function SubmissionsTable() {
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery(
    "submissions",
    () => api.get("/submissions").then((res) => res.data),
    {
      onError: () => {
        toast.error("Failed to load submissions. Please try again.");
      },
    }
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditSubmission = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsEditModalOpen(true);
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    try {
      await api.delete(`/submissions/${submissionId}`);
      toast.success("Submission deleted!");
      queryClient.invalidateQueries("submissions");
    } catch (error) {
      if (error) {
        toast.error("Deletion failed");
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
          Error loading submissions. Please try again.
        </p>
      </div>
    );
  }

  const handleApprove = async (submissionId: string) => {
    try {
      await api.patch(`/submissions/${submissionId}/approve`);
      toast.success("Submission approved!");
      queryClient.invalidateQueries("submissions"); // Refresh the table
    } catch (error) {
      if (error) {
        toast.error("Failed to approve submission. Please try again.");
      }
    }
  };

  const handleReject = async (submissionId: string) => {
    try {
      await api.patch(`/submissions/${submissionId}/reject`);
      toast.success("Submission rejected!");
      queryClient.invalidateQueries("submissions"); // Refresh the table
    } catch (error) {
      if (error) {
        toast.error("Failed to reject submission. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Submissions</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Submission</span>
          </button>
        </div>
        <SubmissionTable
          data={submissions}
          onEdit={handleEditSubmission}
          onDelete={handleDeleteSubmission}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
      <CreateSubmissionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditSubmissionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSubmissionId(null);
        }}
        submissionId={selectedSubmissionId || ""}
      />
    </div>
  );
}
