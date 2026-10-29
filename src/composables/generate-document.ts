import national from '@/templates/national.xlsx?url'
import international from '@/templates/international.xlsx?url'
import { downloadXlsx } from '@/src/index.ts'

interface MainData {
  staffType?: string
  name?: string
  dutyStation?: string
  title?: string
  employeeId?: string
  month?: string
}

const formatDate = (month?: string): string => {
  const [y, m] = month?.split('-') ?? []
  if (y === undefined || m === undefined) return 'Undefined month'
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(y), Number(m) - 1, 1))
}

function isCounted (days: string[], day: number): number {
  const index = day - 1
  if (days[index] === 'presence') return 1
  if (days[index] === 'mission') {
    const startIndex = index - 7 < 0 ? 0 : index - 7
    if (days.slice(startIndex, index).filter(el => el === 'mission').length === 7) return 0
    return 1
  }
  if (days[index] === 'rnr') {
    const startIndex = index - 7 < 0 ? 0 : index - 7
    if (days.slice(startIndex, index).filter(el => el === 'rnr').length === 7) return 0
    return 1
  }
  return 0
}

const dayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const getWeekDayOffset = (m?: string) => {
  if (!m) return 0
  const [year, month] = m.split('-')
  return new Date(Number(year), Number(month) - 1, 1).getDay()
}

const NATIONAL_PAY = 623/31
const INTERNATIONAL_PAY = 1698/31

async function generateDocument (days: string[], mainData: MainData): Promise<void> {
  const url = mainData.staffType === 'International' ? international : national
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const data: Record<string, unknown> = { ...mainData }
  data.day = [...Array(days.length).keys()].map(el => el + 1)
  data.presence = days.map(el => el === 'presence' ? '☑' : '☐')
  data.rnr = days.map(el => el === 'rnr' ? '☑' : '☐')
  data.annual = days.map(el => el === 'annual' ? '☑' : '☐')
  data.other = days.map(el => el === 'other' ? '☑' : '☐')
  data.mission = days.map(el => el === 'mission' ? '☑' : '☐')
  data.remote = days.map(el => el === 'remote' ? '☑' : '☐')
  data.dp = (data.day as number[]).map(day => isCounted(days, day))
  const weekDayOffset = getWeekDayOffset(data.month as string)
  data.weekday = (data.day as number[]).map(day => dayNames[(weekDayOffset + day - 1) % 7])
  data.total = (data.dp as number[]).reduce((a, b) => a + b)
  data.month = formatDate(data.month as string)
  const coefficient = mainData.staffType === 'International' ? INTERNATIONAL_PAY : NATIONAL_PAY
  data.globalSum = Math.round((coefficient * (data.total as number)) * 100) / 100
  const name = mainData.name ?? '';
  const i = name.lastIndexOf(' ');
  const reversedName = i === -1 ? name : `${name.slice(i + 1)} ${name.slice(0, i)}`;
  downloadXlsx(arrayBuffer, data, reversedName + ' - ' + mainData.employeeId + ' - DP ' + formatDate(mainData.month) + '.xlsx')
}

function useGenerateDocument () {
  return { generateDocument }
}

export default useGenerateDocument
