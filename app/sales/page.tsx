

import { getSales } from "@/action/phone.action"
import SalesPage from "./ClientSale"

const page = async() => {
  const res = await getSales()
  const sales = res?.data?.sales
  
  return (
    <>
    <SalesPage sales={sales || []} />
    </>
  )
}

export default page