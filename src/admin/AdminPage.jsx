import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarBody } from "../components/ui/sidebar";
import { motion as Motion } from "framer-motion";
import { cn } from "../lib/utils";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import {
  IconDashboard,
  IconChefHat,
  IconCategory,
  IconLogout,
  IconWorld,
  IconSettings,
  IconListDetails,
  IconCalendarTime,
  IconMenu2,
} from "@tabler/icons-react";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Güvenli şekilde çıkış yapıldı");
      navigate("/login");
    } catch (error) {
      toast.error("Çıkış yapılırken bir sorun oluştu");
      console.error("Logout error:", error);
    }
  };

  const mainLinks = [
    {
      label: "Kontrol Merkezi",
      href: "/admin",
      icon: <IconDashboard className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Menüler",
      href: "/admin/menus",
      icon: <IconChefHat className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "İş İlanları",
      href: "/admin/jobs",
      icon: <IconListDetails className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Kategoriler",
      href: "/admin/categories",
      icon: <IconCategory className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Rezervasyonlar",
      href: "/admin/reservations",
      icon: <IconCalendarTime className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Başvurular",
      href: "/admin/applications",
      icon: <IconListDetails className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "İletişim Mesajları",
      href: "/admin/contact-messages",
      icon: <IconListDetails className="h-5 w-5 shrink-0 text-gray-300" />,
    },
  ];

  const quickLinks = [
    {
      label: "Yeni Menü",
      href: "/admin/menus/new",
      icon: <IconListDetails className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Yeni Kategori",
      href: "/admin/categories/new",
      icon: <IconCategory className="h-5 w-5 shrink-0 text-gray-300" />,
    },
  ];

  const additionalLinks = [
    {
      label: "Siteyi Görüntüle",
      href: "/",
      target: "_blank",
      rel: "noreferrer",
      icon: <IconWorld className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Ayarlar",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-gray-300" />,
    },
    {
      label: "Çıkış Yap",
      onClick: handleLogout,
      icon: <IconLogout className="h-5 w-5 shrink-0 text-gray-300" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111a] flex flex-col h-screen overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <header className="bg-slate-950/70 backdrop-blur-xl shadow-lg border-b border-white/10 py-3 px-6 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/10 text-gray-200"
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
            >
              <IconMenu2 size={22} />
            </button>
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Yönetim paneli aktif
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <span className="font-medium text-white">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <Sidebar open={open} setOpen={setOpen} animate={false}>
          <SidebarBody
            className="justify-between gap-10 py-4 bg-slate-950/80 backdrop-blur-xl border-r border-white/10 h-full"
            showMobileTrigger={false}
          >
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="mt-2 flex flex-col gap-2 px-2">
                {mainLinks.map((link, idx) => (
                  <CustomSidebarLink key={idx} link={link} onNavigate={() => setOpen(false)} />
                ))}
              </div>

              <div className="mt-8 px-2">
                <span className="text-xs px-2 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Hızlı Erişim
                </span>
                <div className="mt-2 flex flex-col gap-2">
                  {quickLinks.map((link, idx) => (
                    <CustomSidebarLink key={idx} link={link} onNavigate={() => setOpen(false)} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto px-2">
              <div className="flex flex-col gap-2">
                {additionalLinks.map((link, idx) => (
                  <CustomSidebarLink key={idx} link={link} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-transparent relative z-10">
          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-slate-950/55 backdrop-blur-xl rounded-[28px] shadow-2xl border border-white/10 p-4 md:p-6 min-h-[calc(100vh-7rem)]"
          >
            <Outlet />
          </Motion.div>
        </main>
      </div>
    </div>
  );
};

const CustomSidebarLink = ({ link, onNavigate }) => {
  if (link.onClick) {
    return (
      <button
        onClick={() => {
          link.onClick();
          if (onNavigate) onNavigate();
        }}
        className="flex items-center rounded-2xl px-3 py-2.5 transition-all duration-200 text-gray-300 hover:bg-white/8 hover:text-white w-full text-left border border-transparent hover:border-white/10"
      >
        <div className="text-gray-400">{link.icon}</div>
        <span className="ml-3">{link.label}</span>
      </button>
    );
  }

  if (link.target === "_blank") {
    return (
      <a
        href={link.href}
        target={link.target}
        rel={link.rel}
        onClick={() => onNavigate && onNavigate()}
        className="flex items-center rounded-2xl px-3 py-2.5 transition-all duration-200 text-gray-300 border border-transparent hover:bg-white/8 hover:text-white hover:border-white/10"
      >
        <div className="text-gray-400">{link.icon}</div>
        <span className="ml-3">{link.label}</span>
      </a>
    );
  }

  return (
    <NavLink
      to={link.href}
      end={link.href === "/admin"}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-2xl px-3 py-2.5 transition-all duration-200 border",
          isActive
            ? "bg-gradient-to-r from-emerald-500/15 to-teal-500/10 text-emerald-300 border-emerald-400/20 shadow-lg shadow-emerald-950/20"
            : "text-gray-300 border-transparent hover:bg-white/8 hover:text-white hover:border-white/10"
        )
      }
      onClick={() => onNavigate && onNavigate()}
    >
      {({ isActive }) => (
        <>
          <div className={cn(isActive ? "text-emerald-500" : "text-gray-400")}>
            {link.icon}
          </div>
          <span className="ml-3">{link.label}</span>
        </>
      )}
    </NavLink>
  );
};

const Logo = () => {
  return (
    <div className="relative z-20 flex items-center space-x-3 py-1">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-950/30" />
      <div>
        <Motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="block font-semibold whitespace-pre text-white text-lg"
        >
          Ala Söğüş
        </Motion.span>
        <span className="block text-xs uppercase tracking-[0.28em] text-emerald-300/70">
          Admin Panel
        </span>
      </div>
    </div>
  );
};

export default AdminPage;
