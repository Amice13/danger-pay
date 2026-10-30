<template>
  <div
    ref="wrapperRef"
    class="wrapper"
  >
    <div
      class="sheet"
      :style="{
        width: `${designWidth}px`,
        transform: `scale(${scale})`
      }"
    >
      <!-- Day names -->

      <div class="row">
        <div class="label bg-blue-grey-lighten-3" />

        <div
          v-for="day in days"
          :key="`weekday-${day}`"
          class="day-header bg-blue-lighten-4"
        >
          {{ dayNames[(weekDayOffset + day - 1) % 7] }}
        </div>

        <div class="total-header bg-blue-darken-4 font-weight-bold">
          Total
        </div>
      </div>

      <!-- Day numbers -->

      <div class="row">
        <div class="label bg-blue-grey-lighten-3" />

        <div
          v-for="day in days"
          :key="`day-${day}`"
          class="day-header day-number bg-blue-lighten-4"
        >
          {{ day }}
        </div>

        <div class="total-header bg-blue-darken-4" />
      </div>

      <!-- Status rows -->

      <div
        v-for="row in rows"
        :key="row.id"
        class="row"
      >
        <div class="label bg-pink-lighten-4">
          {{ row.label }}
        </div>

        <div
          v-for="day in days"
          :key="`${row.id}-${day}`"
          class="cell bg-pink-lighten-5"
          @mousedown.prevent="startDrag(row.id, day)"
          @mouseenter="dragOver(day)"
          @mouseup="onMouseup()"
        >
          <v-icon
            v-if="dayStatus[day - 1] === row.id"
            icon="mdi-check"
          />
        </div>

        <div class="total bg-blue-darken-4">
          {{ getRowTotal(row.id) }}
        </div>
      </div>

      <!-- Danger Pay -->

      <div class="row payments font-weight-bold">
        <div class="label bg-blue-darken-3">
          Danger Pay Calculation
        </div>

        <div
          v-for="day in days"
          :key="`payment-${day}`"
          class="payment-cell bg-blue-darken-1"
        >
          {{ isCounted(day) }}
        </div>

        <div class="total bg-blue-darken-4">
          {{ total }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

const LABEL_WIDTH = 450
const DAY_SIZE = 32
const TOTAL_WIDTH = 80
const DB_NAME = 'danger-pay-data'

const props = defineProps<{
  month?: string
  staffType?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const wrapperRef = ref<HTMLElement>()

const rows = computed(() => {
  return [
    {
      id: 'presence',
      label: 'Presence in the Country'
    },
    ...(props.staffType === 'International' ? [{
      id: 'rnr',
      label: 'Absence on R&R outside the Country'
    }] : []),
    {
      id: 'annual',
      label: 'Absence WE/Annual Leave outside the Country'
    },
    {
      id: 'other',
      label: 'Absence on other leave outside the Country'
    },
    {
      id: 'mission',
      label: 'Absence on Mission outside the Country'
    },
    {
      id: 'remote',
      label: 'Telecommuting from abroad'
    }
  ]
})

const daysInMonth = computed<number>(() => {
  if (!props.month) return 31
  const [year, month] = props.month.split('-')
  return new Date(Number(year), Number(month), 0).getDate()
})

const designWidth = LABEL_WIDTH + daysInMonth.value * DAY_SIZE + TOTAL_WIDTH

const wrapperWidth = ref(0)
const scale = computed(() => Math.min(1, wrapperWidth.value / designWidth))

const days = computed(() => {
  return Array.from(
    { length: daysInMonth.value },
    (_, i) => i + 1
  )
})

const dayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const weekDayOffset = computed(() => {
  if (!props.month) return 0
  const [year, month] = props.month.split('-')
  return new Date(Number(year), Number(month) - 1, 1).getDay()
})

const dayStatus = ref<string[]>(
  Array(daysInMonth.value).fill('presence')
)

const isDragging = ref(false)
const dragRowId = ref<string | null>(null)

function setDayStatus (day: number, rowId: string) {
  dayStatus.value[day - 1] = rowId
}

function startDrag (rowId: string, day: number) {
  isDragging.value = true
  dragRowId.value = rowId
  setDayStatus(day, rowId)
}

function dragOver (day: number) {
  if (!isDragging.value || !dragRowId.value) return
  setDayStatus(day, dragRowId.value)
}

const dayKey = computed(() => {
  const staffType = props.staffType === null ? 'National' : props.staffType
  return staffType + '-' + props.month
})

function onMouseup () {
  store[dayKey.value] = dayStatus.value
  localStorage.setItem(DB_NAME, JSON.stringify(store))
  emit('update:modelValue', dayStatus.value)
}

function stopDrag () {
  isDragging.value = false
  dragRowId.value = null
}

function getRowTotal (rowId: string) {
  return dayStatus.value.filter(status => status === rowId).length
}

function isCounted (day: number): number {
  const index = day - 1
  if (dayStatus.value[index] === 'presence') return 1
  if (dayStatus.value[index] === 'mission') {
    const startIndex = index - 7 < 0 ? 0 : index - 7
    if (dayStatus.value.slice(startIndex, index).filter(el => el === 'mission').length === 7) return 0
    return 1
  }
  if (dayStatus.value[index] === 'rnr') {
    const startIndex = index - 7 < 0 ? 0 : index - 7
    if (dayStatus.value.slice(startIndex, index).filter(el => el === 'rnr').length === 7) return 0
    return 1
  }
  return 0
}

const total = computed<number>(() => {
  return days.value.map(el => isCounted(el)).reduce((a, b) => a + b)
})

let resizeObserver: ResizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(
    entries => {
      wrapperWidth.value =
        entries[0].contentRect.width
    }
  )

  if (wrapperRef.value) {
    resizeObserver.observe(
      wrapperRef.value
    )
  }

  window.addEventListener(
    'mouseup',
    stopDrag
  )
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()

  window.removeEventListener(
    'mouseup',
    stopDrag
  )
})

const storage = localStorage.getItem(DB_NAME)
const store = storage === null ? {} : JSON.parse(storage)

watch(() => [props.month, props.staffType], () => {
  if (store[dayKey.value] === undefined) {
    dayStatus.value = Array(daysInMonth.value).fill('presence')
  } else {
    dayStatus.value = [...store[dayKey.value]]
  }
  emit('update:modelValue', dayStatus.value)
})
</script>

<style scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
  user-select: none;
}

.sheet {
  transform-origin: top left;
}

.row {
  display: flex;
}

.label {
  width: 450px;
  height: 32px;

  padding-inline: 8px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  border: 1px solid #8a8a8a;
}

.day-header,
.cell,
.payment-cell {
  width: 32px;
  height: 32px;

  flex-shrink: 0;

  border: 1px solid #8a8a8a;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
}

.day-header {
  font-size: 13px;
}

.day-number {
  font-size: 16px;
}

.cell {
  cursor: pointer;
}

.cell:hover {
  border: 2px solid #890f4f;
}

.total,
.total-header {
  width: 80px;
  height: 32px;

  border: 1px solid #8a8a8a;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
}

.total {
  font-weight: bold;
}
</style>