import React from 'react'
import SettingsPage from './ClientSettings'
import { getBrend, getCapacity, getColor, getCondition } from '@/action/phone.action'

const page = async() => {
  const res = await getColor()
  const colors = res?.data?.colors

  const condition = await getCondition()
  const conditions = condition?.data?.conditions

  const bred = await getBrend()
  const brends = bred?.data?.brends

  const capacity = await getCapacity()
  const capacities = capacity?.data?.capacities

  return (
    <>
    <SettingsPage capacities={capacities || []} colors={colors || []} conditions={conditions || []} brends={brends || []} />
    </>
  )
}

export default page