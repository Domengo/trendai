"use client";
import { Pen, LucideTrash } from "lucide-react";

interface Submission {
  _id: string;
  influencer: { name: string };
  campaign: { name: string };
  content: string;
  status: string;
  submissionDate: string;
}

interface SubmissionTableProps {
  data: Submission[];
  onEdit: (submissionId: string) => void;
  onDelete: (submissionId: string) => void;
  onApprove: (submissionId: string) => void;
  onReject: (submissionId: string) => void;
}

export default function SubmissionTable({
  data,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: SubmissionTableProps) {
  return (
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
            {data.map((submission) => (
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
                        onClick={() => onApprove(submission._id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(submission._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-700 text-sm">
                  <button
                    onClick={() => onEdit(submission._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pen className="w-4 h-4 mr-2" />
                  </button>
                  <button
                    onClick={() => onDelete(submission._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <LucideTrash className="w-4 h-4 mr-2"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
