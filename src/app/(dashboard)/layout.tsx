"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

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
                        <div className="logo-icon scale-75">
                            <i className="ph-fill ph-graduation-cap"></i>
                        </div>
                        <span>Interview Ready</span>
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
                        <div className="user-avatar">
                            <i className="ph-fill ph-user"></i>
                        </div>
                        <div className="user-info">
                            <span className="user-name">Alex Johnson</span>
                            <span className="user-role">Premium Member</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">{children}</main>
        </div>
    );
}
