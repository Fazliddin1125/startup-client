import { IBrend } from "@/types"
import { create } from "zustand"


interface Store{
    kind: string,
    setKind: (kind:string)=>void,
    product: IBrend
    setProduct: (product: IBrend)=>void
    openModal: boolean
    setOpenModal: (open: boolean)=>void
}

export const useSettingModal= create<Store>()(set=>({
    kind: "",
    setKind: kind=>set({kind}),
    product: {name: "", _id:""},
    setProduct: product=>set({product}),
    openModal: false,
    setOpenModal: open=>set({openModal: open})
}))








