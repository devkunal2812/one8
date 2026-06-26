import LockerRoomClient from '@/components/sections/LockerRoom'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Locker Room – ONE8 King Edition',
  description: 'Step into Virat\'s world. An interactive experience.',
  robots: 'noindex, nofollow',
}

export default function LockerRoomPage() {
  return <LockerRoomClient />
}
