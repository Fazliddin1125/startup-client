import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { QueryProps } from "@/types"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPrice(price: number){
  return new Intl.NumberFormat('uz-Uz', {style: "currency", currency: 'UZS'}).format(price)
}

export function formUrlQuery({ key, params, value}: QueryProps){
    const currenturl  = qs.parse(params)
    currenturl[key] = value!

    return qs.stringifyUrl({url: window.location.pathname, query: currenturl}, {skipNull: true})
}
export function removeUrlQuery({params, key}: QueryProps){
    const currentUrl = qs.parse(params)
    delete currentUrl[key]
    return qs.stringifyUrl({url: window.location.pathname, query: currentUrl}, {skipNull: true})
}