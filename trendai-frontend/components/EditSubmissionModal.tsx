"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

export default function EditSubmissionModal({
  isOpen,
  onClose,
  submissionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await api.get(`/submissions/${submissionId}`);
        setContent(response.data.content);
      } catch (error) {
        toast.error("Failed to fetch submission. Please try again.");
      }
    };
    if (isOpen) fetchSubmission();
  }, [isOpen, submissionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/submissions/${submissionId}`, { content });
      toast.success("Submission updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update submission. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Submission</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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