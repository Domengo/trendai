"use client";

interface Influencer {
  _id: string;
  name: string;
  joinedCampaigns: {
    _id: string;
    name: string;
    status: string;
    deadline: string;
    __v: number;
  }[];
  __v: number;
}

interface InfluencerTableProps {
  data: Influencer[];
  renderActions?: (item: Influencer) => React.ReactNode;
}

export default function InfluencerTable({ data, renderActions }: InfluencerTableProps) {
  // Helper function to format the date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800/100 dark:text-white">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800/100 dark:text-white">
                Joined Campaigns
              </th>
              {renderActions && (
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800/100 dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-800 dark:text-white">
                  {item.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-800 dark:text-white">
                  {item.joinedCampaigns.map((campaign) => campaign.name).join(", ")}
                </td>
                {renderActions && (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-800 dark:text-white">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}