import { NextRequest, NextResponse } from 'next/server'
import { CARS } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const condition = searchParams.get('condition')
  const bodyType = searchParams.get('bodyType')
  const maxPrice = searchParams.get('maxPrice')

  let cars = [...CARS]

  if (condition && condition !== 'All') {
    cars = cars.filter((c) => c.condition === condition)
  }
  if (bodyType && bodyType !== 'All') {
    cars = cars.filter((c) => c.bodyType === bodyType)
  }
  if (maxPrice) {
    cars = cars.filter((c) => c.pricePerMonth[36] <= parseInt(maxPrice))
  }

  return NextResponse.json({ cars, total: cars.length })
}
