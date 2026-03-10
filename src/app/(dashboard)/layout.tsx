"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: "ph-squares-four" },
        { name: "My Courses", href: "/my-courses", icon: "ph-book-open" },
        { name: "Mock Tests", href: "/mock-tests", icon: "ph-question" },
        { name: "Grammar", href: "/grammar", icon: "ph-text-aa" },
        { name: "Performance", href: "/performance", icon: "ph-chart-bar" },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="logo">
                    <div className="logo-top">
                        <div className="logo-icon logo-icon-ss scale-75">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                                <path d="M12 2C6.477 2 2 6.021 2 11c0 2.5 1.059 4.764 2.757 6.4L4 21l4.077-1.33A10.07 10.07 0 0 0 12 20c5.523 0 10-4.021 10-9S17.523 2 12 2Z" fill="white" />
                                <rect x="7" y="14" width="2" height="3" rx="1" fill="#2563eb" />
                                <rect x="11" y="11" width="2" height="6" rx="1" fill="#2563eb" />
                                <rect x="15" y="8" width="2" height="9" rx="1" fill="#2563eb" />
                            </svg>
                        </div>
                        <span>Skills Speak</span>
                    </div>
                    <div className="logo-sub">English Platform</div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${isActive ? "active" : ""}`}
                            >
                                <i className={`${isActive ? "ph-fill" : "ph"} ${item.icon}`}></i>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <Link
                        href="/settings"
                        className={`nav-item ${pathname === "/settings" ? "active" : ""}`}
                    >
                        <i className={`${pathname === "/settings" ? "ph-fill" : "ph"} ph-gear`}></i>
                        Settings
                    </Link>
                    <div className="user-profile">
                        <div className="user-avatar" style={{ position: 'relative', width: '40px', height: '40px' }}>
                            <Image
                                src={session?.user?.image || "/assets/default_avatar.png"}
                                alt="User Avatar"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </div>
                        <div className="user-info">
                            <span className="user-name">{session?.user?.name || "User"}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="nav-item"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', color: '#ef4444' }}
                    >
                        <i className="ph ph-sign-out" style={{ color: '#ef4444' }}></i>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">{children}</main>
        </div>
    );
}
