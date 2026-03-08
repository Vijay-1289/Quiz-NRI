"use client";

import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

type Theme = "light" | "dark" | "system";

const GOALS = [
    "Get a job in an MNC",
    "Improve spoken English",
    "Ace job interviews",
    "Business communication",
];
const TARGETS = [
    "15 minutes / day",
    "30 minutes / day",
    "1 hour / day",
    "2 hours / day",
];

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
        root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("ss-theme", theme);
}

export default function SettingsPage() {
    const { data: session } = useSession();

    const [theme, setTheme] = useState<Theme>("light");
    const [goal, setGoal] = useState(GOALS[0]);
    const [target, setTarget] = useState(TARGETS[0]);
    const [name, setName] = useState("");
    const [saved, setSaved] = useState(false);
    const [showSO, setShowSO] = useState(false);

    // Load saved prefs on mount
    useEffect(() => {
        const savedTheme = (localStorage.getItem("ss-theme") as Theme) || "light";
        const savedGoal = localStorage.getItem("ss-goal") || GOALS[0];
        const savedTarget = localStorage.getItem("ss-target") || TARGETS[0];
        const savedName = localStorage.getItem("ss-name") || session?.user?.name || "";
        setTheme(savedTheme);
        setGoal(savedGoal);
        setTarget(savedTarget);
        setName(savedName);
        applyTheme(savedTheme);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Apply theme in real time as picker changes
    function handleTheme(t: Theme) {
        setTheme(t);
        applyTheme(t);
    }

    function handleSave() {
        localStorage.setItem("ss-goal", goal);
        localStorage.setItem("ss-target", target);
        localStorage.setItem("ss-name", name);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    const themeOptions: { value: Theme; icon: string; label: string; desc: string }[] = [
        { value: "light", icon: "☀️", label: "Light", desc: "Clean & bright" },
        { value: "dark", icon: "🌙", label: "Dark", desc: "Easy on eyes" },
        { value: "system", icon: "💻", label: "System", desc: "Follow device" },
    ];

    return (
        <div className="settings-page">

            {/* Page header */}
            <div className="settings-hero">
                <div className="settings-hero-text">
                    <h1 className="settings-page-title">Settings ⚙️</h1>
                    <p className="settings-page-sub">Personalise your Skills Speak experience</p>
                </div>
                <button
                    className={`settings-save-btn${saved ? " saved" : ""}`}
                    onClick={handleSave}
                >
                    {saved
                        ? <><i className="ph-fill ph-check-circle" /> Saved!</>
                        : <><i className="ph ph-floppy-disk" /> Save Changes</>
                    }
                </button>
            </div>

            <div className="settings-body">

                {/* ── LEFT: Account ── */}
                <div className="settings-col">
                    <div className="settings-card">
                        <div className="sc-title">👤 Account</div>
                        <div className="sc-divider" />

                        {/* Avatar + name/email */}
                        <div className="settings-account-row">
                            <div className="settings-avatar-wrap">
                                <Image
                                    src={session?.user?.image || "/assets/default_avatar.png"}
                                    alt="Avatar"
                                    width={72} height={72}
                                    className="settings-avatar-img"
                                />
                            </div>
                            <div className="settings-account-info">
                                <div className="settings-field-label">Display Name</div>
                                <input
                                    className="settings-input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                                <div className="settings-field-label" style={{ marginTop: 10 }}>Email Address</div>
                                <input
                                    className="settings-input settings-input--readonly"
                                    value={session?.user?.email || ""}
                                    readOnly
                                />
                                <p className="settings-hint">🔒 Managed by Google — cannot be changed here</p>
                            </div>
                        </div>

                        {/* Goal + target */}
                        <div className="sc-row">
                            <div>
                                <div className="settings-field-label">Learning Goal 🎯</div>
                                <select className="settings-select" value={goal} onChange={e => setGoal(e.target.value)}>
                                    {GOALS.map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                            <div>
                                <div className="settings-field-label">Daily Target ⏱️</div>
                                <select className="settings-select" value={target} onChange={e => setTarget(e.target.value)}>
                                    {TARGETS.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Sign out */}
                        <div className="sc-divider" style={{ marginTop: 20 }} />
                        {!showSO ? (
                            <button className="settings-signout-btn" onClick={() => setShowSO(true)}>
                                <i className="ph-fill ph-sign-out" /> Sign Out
                            </button>
                        ) : (
                            <div className="settings-signout-confirm">
                                <p>👋 Are you sure you want to sign out?</p>
                                <div className="settings-signout-actions">
                                    <button
                                        className="settings-action-btn settings-action-btn--danger"
                                        onClick={() => signOut({ callbackUrl: "/login" })}
                                    >Yes, sign out</button>
                                    <button
                                        className="settings-action-btn settings-action-btn--outline"
                                        onClick={() => setShowSO(false)}
                                    >Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── RIGHT: Appearance ── */}
                <div className="settings-col">
                    <div className="settings-card">
                        <div className="sc-title">🎨 Appearance</div>
                        <div className="sc-divider" />

                        <div className="settings-field-label">Theme — changes instantly ✨</div>
                        <div className="theme-picker">
                            {themeOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    className={`theme-card${theme === opt.value ? " theme-card--active" : ""}`}
                                    onClick={() => handleTheme(opt.value)}
                                >
                                    <span className="theme-card-icon">{opt.icon}</span>
                                    <span className="theme-card-label">{opt.label}</span>
                                    <span className="theme-card-desc">{opt.desc}</span>
                                    {theme === opt.value && (
                                        <div className="theme-card-check">
                                            <i className="ph-fill ph-check-circle" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Live preview swatch */}
                        <div className="theme-preview">
                            <div className="theme-preview-bar">
                                <div className="tp-dot tp-dot--red" />
                                <div className="tp-dot tp-dot--yellow" />
                                <div className="tp-dot tp-dot--green" />
                                <span className="tp-label">skillsspeak.netlify.app</span>
                            </div>
                            <div className="theme-preview-body">
                                <div className="tp-sidebar" />
                                <div className="tp-content">
                                    <div className="tp-card tp-card--a" />
                                    <div className="tp-card tp-card--b" />
                                    <div className="tp-card tp-card--c" />
                                </div>
                            </div>
                        </div>
                        <p className="settings-hint" style={{ textAlign: "center", marginTop: 8 }}>
                            🎨 Theme applies across the whole app instantly
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
