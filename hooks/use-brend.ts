import { IBrend } from "@/types"
import { create } from "zustand"

interface BrendState{
    editingBrend: IBrend | null
    setEditingBrend: (brend: IBrend)=>void

}

export const useEditBrendStore = create<BrendState>((set) =>({
    editingBrend: null,
    setEditingBrend: (brend)=>set({editingBrend: brend})
}))