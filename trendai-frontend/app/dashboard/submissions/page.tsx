"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateSubmissionModal from "@/components/CreateSubmissionModal";
import { useQueryClient } from "react-query";
import EditSubmissionModal from "@/components/EditSubmissionModal";

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
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Influencer
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission: any) => (
                  <tr key={submission._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      {submission.influencer.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      {submission.campaign.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      <a
                        href={submission.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View Content
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : submission.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      {new Date(submission.submissionDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      {submission.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(submission._id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(submission._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                      <button
                        onClick={() => handleEditSubmission(submission._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteSubmission(submission._id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
