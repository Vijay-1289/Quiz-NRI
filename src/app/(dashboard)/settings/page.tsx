"use client";

import { signOut, useSession } from "next-auth/react";

export default function Settings() {
    const { data: session } = useSession();

    return (
        <div>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Settings</h1>
                <p className="dashboard-subtitle">Manage your account preferences and subscription.</p>
            </div>
            <div className="card">
                {session ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                        <p>Logged in as: <strong>{session.user?.email}</strong></p>
                        <button className="btn btn-outline" onClick={() => signOut({ callbackUrl: '/login' })}>
                            <i className="ph-fill ph-sign-out"></i>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <p>Account settings are currently unavailable.</p>
                )}
            </div>
        </div >
    );
}
