'use client'
import React, { createContext, useContext, useState, ReactNode } from "react"
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react'

type Toast = {
    id: number,
    title: string,
    description?: string,
    variant?: "default" | "success" | "destructive",
    duration?: number
}

type ToastContextType = {
    toasts: Toast[];
    toast: (toast: Omit<Toast, "id">) => void
    removeToast: (id: number) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const toast = (newToast: Omit<Toast, "id">) => {
        const id = Date.now()
        const duration = newToast.duration || 4000 // Default 4 seconds
        
        setToasts((prev) => [...prev, { id, ...newToast }])
        
        // Auto remove toast after duration
        setTimeout(() => {
            removeToast(id)
        }, duration)
    }

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    const getIcon = (variant: string) => {
        switch (variant) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            case 'destructive':
                return <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            default:
                return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
        }
    }

    const getVariantStyles = (variant: string) => {
        switch (variant) {
            case 'success':
                return {
                    container: 'bg-white border-l-4 border-green-500 shadow-lg hover:shadow-xl',
                    title: 'text-gray-900',
                    description: 'text-gray-600'
                }
            case 'destructive':
                return {
                    container: 'bg-white border-l-4 border-red-500 shadow-lg hover:shadow-xl',
                    title: 'text-gray-900',
                    description: 'text-gray-600'
                }
            default:
                return {
                    container: 'bg-white border-l-4 border-blue-500 shadow-lg hover:shadow-xl',
                    title: 'text-gray-900',
                    description: 'text-gray-600'
                }
        }
    }

    return (
        <ToastContext.Provider
            value={{
                toast,
                toasts,
                removeToast
            }}
        >
            {children}
            
            {/* Sleek Toast Container */}
            <div className="fixed bottom-4 right-4 space-y-3 z-50">
                {toasts.map((t) => {
                    const styles = getVariantStyles(t.variant || 'default')
                    return (
                        <div
                            key={t.id}
                            className={`
                                ${styles.container} 
                                rounded-xl p-4 max-w-sm min-w-[320px] 
                                transform transition-all duration-300 ease-out 
                                hover:scale-105 animate-slide-in-right
                            `}
                        >
                            <div className="flex items-start space-x-3">
                                {/* Icon */}
                                <div className="mt-0.5">
                                    {getIcon(t.variant || 'default')}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold ${styles.title} text-sm`}>
                                        {t.title}
                                    </p>
                                    {t.description && (
                                        <p className={`text-sm ${styles.description} mt-1 leading-relaxed`}>
                                            {t.description}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Close Button */}
                                <button
                                    onClick={() => removeToast(t.id)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100 flex-shrink-0"
                                    aria-label="Close notification"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out;
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `}</style>
        </ToastContext.Provider>
    )
}

// Custom hook to use the toast context
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}