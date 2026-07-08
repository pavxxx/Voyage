"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    exiting: boolean;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
    showToast: () => {},
});

let counter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: number) => {
        // Start exit animation first
        setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
        );
        // Remove from DOM after animation completes
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 320);
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType = "success") => {
            const id = ++counter;
            setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
            // Auto-dismiss after 4 seconds
            setTimeout(() => removeToast(id), 4000);
        },
        [removeToast]
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container — fixed top-right */}
            <div
                aria-live="polite"
                className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
                style={{ maxWidth: "340px" }}
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="alert"
                        className={[
                            "pointer-events-auto",
                            "flex items-start gap-3",
                            "min-w-[260px] max-w-[340px]",
                            "rounded-xl px-4 py-3.5",
                            "shadow-[0_8px_30px_rgba(0,0,0,0.22)]",
                            "backdrop-blur-xl",
                            "border",
                            toast.type === "success"
                                ? "bg-[#0D1117]/92 border-[#8CA882]/35"
                                : toast.type === "error"
                                ? "bg-[#0D1117]/92 border-[#E05A47]/35"
                                : "bg-[#0D1117]/92 border-[#C97B4B]/35",
                            toast.exiting ? "toast-exit" : "toast-enter",
                        ].join(" ")}
                    >
                        {/* Type icon */}
                        <span
                            className={[
                                "mt-0.5 shrink-0 font-bold text-sm leading-none",
                                toast.type === "success"
                                    ? "text-[#8CA882]"
                                    : toast.type === "error"
                                    ? "text-[#E05A47]"
                                    : "text-[#C97B4B]",
                            ].join(" ")}
                        >
                            {toast.type === "success"
                                ? "✓"
                                : toast.type === "error"
                                ? "✕"
                                : "i"}
                        </span>

                        {/* Message */}
                        <p className="text-[0.73rem] leading-relaxed text-[#F5EDD8]/85 flex-1">
                            {toast.message}
                        </p>

                        {/* Dismiss button */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="shrink-0 text-[#F5EDD8]/25 hover:text-[#F5EDD8]/60 text-xs transition-colors leading-none mt-0.5 ml-1"
                            aria-label="Dismiss notification"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
