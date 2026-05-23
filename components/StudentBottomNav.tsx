"use client";

import Link from "next/link";

import { usePathname }
from "next/navigation";

import {
  Home,
  ClipboardList,
  Trophy,
  BarChart3,
  Brain,
  User,
  LogOut
} from "lucide-react";

import { supabase }
from "@/lib/supabase";

export default function StudentBottomNav() {

  const pathname =
    usePathname();

  async function logout() {

    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

  const navItems = [

    {
      href: "/student",
      label: "Home",
      icon: Home
    },

    {
      href: "/student/checkin",
      label: "Checkin",
      icon: ClipboardList
    },

    {
      href: "/student/rewards",
      label: "Reward",
      icon: Trophy
    },

    {
      href: "/student/progress",
      label: "Progress",
      icon: BarChart3
    },

    // 🔥 AI MENU

    {
      href: "/student/ai",
      label: "AI",
      icon: Brain
    },

    {
      href: "/student/profile",
      label: "Profile",
      icon: User
    }

  ];

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">

      <div className="grid grid-cols-7">

        {navItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center py-3 text-xs

                ${active
                  ? "text-blue-600 font-bold"
                  : "text-gray-500"}
              `}
            >

              <Icon size={22} />

              <span className="mt-1">

                {item.label}

              </span>

            </Link>
          );
        })}

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="
            flex flex-col items-center justify-center py-3 text-xs text-red-500
          "
        >

          <LogOut size={22} />

          <span className="mt-1">

            Logout

          </span>

        </button>

      </div>

    </div>
  );
}