// "use client";

// import { useQuery } from "react-query";
// import api from "@/lib/api";
// import { Loader, Plus } from "lucide-react";
// import Link from "next/link";
// import Table from "@/components/Table";
// import toast from "react-hot-toast";

// export default function Submissions() {
//   const {
//     data: submissions,
//     isLoading,
//     error,
//   } = useQuery("submissions", () => api.get("/submissions").then((res) => res.data), {
//     onError: () => {
//       toast.error("Failed to load submissions. Please try again.");
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Loader className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <p className="text-red-500">Error loading submissions. Please try again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-8">
//       <div className="py-8">
//         <div className="flex justify-between">
//           <h2 className="text-2xl font-semibold leading-tight">Submissions</h2>
//           <Link
//             href="/submissions/new"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             <span>New Submission</span>
//           </Link>
//         </div>
//         <Table data={submissions} columns={["Influencer", "Campaign", "Content", "Status", "Submission Date"]} />
//       </div>
//     </div>
//   );
// }
"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateSubmissionModal from "@/components/CreateSubmissionModal";

export default function SubmissionsTable() {
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery("submissions", () => api.get("/submissions").then((res) => res.data), {
    onError: () => {
      toast.error("Failed to load submissions. Please try again.");
    },
  });

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
        <p className="text-red-500">Error loading submissions. Please try again.</p>
      </div>
    );
  }

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
                      {new Date(submission.submissionDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
    </div>
  );
}