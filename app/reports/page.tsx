"use server"
import { getReport} from '@/action/phone.action'
import ReportsPage from './ClientReport'
import { FC } from 'react'
import { SearchParams } from '@/types'
interface Props {
  searchParams: SearchParams
}
const page: FC<Props> = async props => {
  const searchParams = await props.searchParams
  const res = await getReport({
    searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		brend: `${searchParams.brend || ''}`,
    
  })
  const sales = res?.data?.sales
  console.log(sales)
  
  return (
    <>
      <ReportsPage sales={sales || []} />
    </>
  )
}

export default page