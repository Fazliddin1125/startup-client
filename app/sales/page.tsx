

import { getSales } from "@/action/phone.action"
import SalesPage from "./ClientSale"
import { FC } from 'react'
import { SearchParams } from '@/types'
interface Props {
  searchParams: SearchParams
}
const page:FC<Props> = async props => {
  const searchParams = await props.searchParams
  const res = await getSales({
    searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		brend: `${searchParams.brend || ''}`,
})
  const sales = res?.data?.sales
  
  return (
    <>
    <SalesPage sales={sales || []} />
    </>
  )
}

export default page