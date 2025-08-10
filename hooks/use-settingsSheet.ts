import { create } from "zustand"

interface SheetStore{
    open: boolean
    setOpen: (open: boolean)=>void
    kindSheet: string
    setKindSheet: (kind: string)=>void
}

export const useSettingsSheet = create<SheetStore>()(set=>({
    open: false,
    setOpen: open => set({open}),
    kindSheet: "",
    setKindSheet: kind=>set({kindSheet: kind})
}))