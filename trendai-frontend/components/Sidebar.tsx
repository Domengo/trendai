"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Campaigns", href: "/dashboard/campaigns" },
    { name: "Influencers", href: "/dashboard/influencers" },
    { name: "Submissions", href: "/dashboard/submissions" },
  ];

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link href="/dashboard" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
          TrendAI
        </Link>
        <ul className="mt-6">
          {navigation.map((item) => (
            <li className="relative px-6 py-3" key={item.name}>
              <Link
                href={item.href}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                  pathname === item.href
                    ? "text-gray-800 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}