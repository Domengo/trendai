"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import Table from "@/components/Table";
import toast from "react-hot-toast";

export default function Influencers() {
  const {
    data: influencers,
    isLoading,
    error,
  } = useQuery("influencers", () => api.get("/influencers").then((res) => res.data), {
    onError: () => {
      toast.error("Failed to load influencers. Please try again.");
    },
  });

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
        <p className="text-red-500">Error loading influencers. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Influencers</h2>
          <Link
            href="/influencers/new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>New Influencer</span>
          </Link>
        </div>
        <Table data={influencers} columns={["Name", "Joined Campaigns"]} />
      </div>
    </div>
  );
}