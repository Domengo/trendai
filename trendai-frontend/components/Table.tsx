"use client";

export default function Table({
  data,
  columns,
  renderActions,
}: {
  data: any[];
  columns: string[];
  renderActions?: (item: any) => React.ReactNode;
}) {
  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to render cell content
  const renderCellContent = (item: any, column: string) => {
    const value = item[column.toLowerCase()];

    // Handle dates (e.g., deadline, submissionDate)
    if (
      column.toLowerCase() === "deadline" ||
      column.toLowerCase() === "submissiondate"
    ) {
      return formatDate(value);
    }
    if (column === "Actions") {
      return renderActions ? renderActions(item) : null
    }
    // Default case
    return value;
  };

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800/100 dark:text-white"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-800 dark:text-white"
                  >
                    {renderCellContent(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
