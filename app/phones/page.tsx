// app/phones/page.tsx (yoki shunga o‘xshash joyda)
import React from 'react'
import PhonesPage from './clientPage'
import { getBrend, getCapacity, getColor, getCondition, getPhones} from '@/action/phone.action'

const PhoneServerPage = async () => {
  const res = await getPhones()
  const phones = res?.data?.phones ?? []

  const brends = await getBrend()
  const capacities = await getCapacity()
  const colors = await getColor()
  const conditions = await getCondition()

  return (
    <>
      <PhonesPage
        phones={phones}
        
        brends={brends?.data?.brends || []}
        capacities={capacities?.data?.capacities || []}
        colors={colors?.data?.colors || []}
        conditions={conditions?.data?.conditions || []}
      />
    </>
  )
}

export default PhoneServerPage
