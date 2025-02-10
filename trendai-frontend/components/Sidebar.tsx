"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, Users, FileText } from "lucide-react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
    { name: "Influencers", href: "/dashboard/influencers", icon: Users },
    { name: "Submissions", href: "/dashboard/submissions", icon: FileText },
  ];

  return (
    <aside
      className={`z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link
          href="/dashboard"
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center"
        >
          <Megaphone className="mr-2 h-6 w-6" />
          TrendAI
        </Link>
        <ul className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li className="relative px-6 py-3" key={item.name}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    pathname === item.href
                      ? "text-gray-800 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
