// Room types and related constants
export const ROOM_TYPES = [
  { value: 'スタンダード', text: 'スタンダード' },
  { value: 'デラックス', text: 'デラックス' },
  { value: 'スイート', text: 'スイート' }
] as const

// Birth date dropdown options
export const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: year, text: year.toString() }
})

export const BIRTH_MONTHS = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1
  return { value: month, text: `${month}月` }
})

export const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1
  return { value: day, text: `${day}日` }
})

// Room capacity based on room type
export const ROOM_CAPACITY_MAP = {
  'スタンダード': 2,
  'デラックス': 3,
  'スイート': 4
} as const

export type RoomType = keyof typeof ROOM_CAPACITY_MAP