import { IPhone } from "@/types";
import { create } from "zustand"

interface Store{
    salePhone: IPhone | null,
    setSalePhone: (phone: IPhone)=>void,
    openSaleModal: boolean,
    setOpenSaleModal: (open: boolean)=>void 
}

export const useSaleStore = create<Store>()(set=>({
    salePhone: null,
    setSalePhone: phone=>set({salePhone: phone}),
    openSaleModal: false,
    setOpenSaleModal: open=>set({openSaleModal: open})
}))








