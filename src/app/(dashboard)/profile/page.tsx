"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
    const { data: session } = useSession();
    const [avatar, setAvatar] = useState(session?.user?.image || "/assets/default_avatar.png");

    // Simulated handler for changing avatar
    const handleAvatarChange = () => {
        alert("In a production app, this would open a file picker and upload the new image to a cloud storage bucket!");
        setAvatar("/assets/default_avatar.png"); // Mock state change
    };

    return (
        <div>
            <div className="dashboard-header">
                <h1 className="dashboard-title">Your Profile</h1>
                <p className="dashboard-subtitle">Manage your personal information and display picture.</p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '40px' }}>
                <div style={{ position: 'relative' }}>
                    <Image
                        src={avatar}
                        alt="User Avatar"
                        width={150}
                        height={150}
                        style={{ borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }}
                    />
                    <button
                        onClick={handleAvatarChange}
                        style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            background: 'var(--primary)',
                            color: 'var(--bg-card)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                        title="Change Display Picture"
                    >
                        <i className="ph-fill ph-camera" style={{ fontSize: '20px' }}></i>
                    </button>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={session?.user?.name || "Premium User"}
                            readOnly
                            style={{ background: 'var(--bg)' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            value={session?.user?.email || "No email provided"}
                            readOnly
                            style={{ background: 'var(--bg)' }}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    Save Preferences
                </button>
            </div>
        </div>
    );
}
