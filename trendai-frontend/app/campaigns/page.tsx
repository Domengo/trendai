"use client"

import { useQuery } from "react-query"
import api from "@/utils/api"
import { Loader, Plus } from "lucide-react"
import Link from "next/link"
import Layout from "../../components/Layout"
import toast from "react-hot-toast"

const Campaigns = () => {
  const {
    data: campaigns,
    isLoading,
    error,
  } = useQuery("campaigns", () => api.get("/campaigns").then((res) => res.data), {
    onError: () => {
      toast.error("Failed to load campaigns. Please try again.")
    },
  })

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Error loading campaigns. Please try again.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Campaigns</h2>
            <Link
              href="/campaigns/new"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>New Campaign</span>
            </Link>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns &&
                    campaigns.map((campaign: any) => (
                      <tr key={campaign._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">{campaign.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold text-${
                              campaign.status === "active" ? "green" : "red"
                            }-900 leading-tight`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 bg-${
                                campaign.status === "active" ? "green" : "red"
                              }-200 opacity-50 rounded-full`}
                            ></span>
                            <span className="relative">{campaign.status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(campaign.deadline).toLocaleDateString()}
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Campaigns

