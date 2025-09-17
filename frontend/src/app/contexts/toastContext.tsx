'use client'
import React, {createContext,useContext,useState,ReactNode} from "react"
 
type Toast  ={
    id:number,
    title:string,
    description?:string,
    variant?: "default" | "success"|"destructive"
}
type ToastContextType ={
    toasts:Toast[];
    toast:(toast:Omit<Toast,"id">) => void
    removeToast:(id:number) => void
}
export const ToastContext = createContext<ToastContextType | undefined>(undefined)
export const ToastProvider = ({children}:{children:ReactNode}) =>{
    const [toasts,setToasts] = React.useState<Toast[]>([])
    const toast = (newToast:Omit<Toast,"id">) =>{
        const id = Date.now()
            setToasts((prev)=>[...prev,{id,...newToast}])
            setTimeout(()=>{
                removeToast(id)
            },3000)

    }
    const removeToast = (id:number) =>{
            setToasts((prev)=> prev.filter((t)=>t.id !==id))
    }

    return (
        <ToastContext.Provider
        value={
            {
                toast,toasts,removeToast
            }
        }
        >
            {children}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-lg shadow-md text-white ${
              t.variant === "success"
                ? "bg-green-600"
                : t.variant === "destructive"
                ? "bg-red-600"
                : "bg-gray-800"
            }`}
          >
            <p className="font-semibold">{t.title}</p>
            {t.description && <p className="text-sm">{t.description}</p>}
          </div>
        ))}
      </div>
        </ToastContext.Provider>
    )
}