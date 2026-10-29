<template>
  <v-container class="fill-height d-flex flex-column justify-center" max-width="1200">
    <div>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2>Form for Monthly Claims and Deductions 2026</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Month:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <month-picker v-model="mainData.month" />
        </v-col>
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Staff Type:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-select
            v-model="mainData.staffType"
            :items="staffTypes"
            class="mr-4"
            name="staffType"
            type="search"
            autocomplete="off"
            :variant="enabledFields.staffTypeIsEnabled ? 'solo' : 'plain'"
            density="compact"
            id="id"
            :clearable="enabledFields.staffTypeIsEnabled"
            :readonly="!enabledFields.staffTypeIsEnabled"
            hide-details
          />
          <v-btn
            v-if="enabledFields.staffTypeIsEnabled"
            @click="save('staffType', mainData.staffType)"
            :disabled="!mainData.staffType"
            text="Save"
          />
          <v-btn
            v-else
            @click="edit('staffType')"
            icon="mdi-pencil"
            size="x-small"
            variant="tonal"
            color="grey"
            text="Save"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Name:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-text-field
            v-model="mainData.name"
            class="mr-4"
            name="name"
            type="search"
            autocomplete="off"
            :variant="!!enabledFields.nameIsEnabled ? 'solo' : 'plain'"
            density="compact"
            id="id"
            :clearable="enabledFields.nameIsEnabled"
            :readonly="!enabledFields.nameIsEnabled"
            hide-details
          />
          <v-btn
            v-if="enabledFields.nameIsEnabled"
            @click="save('name', mainData.name)"
            :disabled="!mainData.name"
            text="Save"
          />
          <v-btn
            v-else
            @click="edit('name')"
            icon="mdi-pencil"
            size="x-small"
            variant="tonal"
            color="grey"
            text="Save"
          />
        </v-col>
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Duty Station:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-select
            v-model="mainData.dutyStation"
            :items="dutyStations"
            class="mr-4"
            name="dutyStation"
            type="search"
            autocomplete="off"
            :variant="enabledFields.dutyStationIsEnabled ? 'solo' : 'plain'"
            density="compact"
            id="id"
            :clearable="enabledFields.dutyStationIsEnabled"
            :readonly="!enabledFields.dutyStationIsEnabled"
            hide-details
          />
          <v-btn
            v-if="enabledFields.dutyStationIsEnabled"
            @click="save('dutyStation', mainData.dutyStation)"
            :disabled="!mainData.dutyStation"
            text="Save"
          />
          <v-btn
            v-else
            @click="edit('dutyStation')"
            icon="mdi-pencil"
            size="x-small"
            variant="tonal"
            color="grey"
            text="Save"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Title:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-text-field
            v-model="mainData.title"
            class="mr-4"
            name="title"
            type="search"
            autocomplete="off"
            :variant="enabledFields.titleIsEnabled ? 'solo' : 'plain'"
            density="compact"
            id="id"
            :clearable="enabledFields.titleIsEnabled"
            :readonly="!enabledFields.titleIsEnabled"
            hide-details
          />
          <v-btn
            v-if="enabledFields.titleIsEnabled"
            @click="save('title', mainData.title)"
            :disabled="!mainData.title"
            text="Save"
          />
          <v-btn
            v-else
            @click="edit('title')"
            icon="mdi-pencil"
            size="x-small"
            variant="tonal"
            color="grey"
            text="Save"
          />
        </v-col>
        <v-col cols="2" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Employee ID:</p>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-text-field
            v-model="mainData.employeeId"
            class="mr-4"
            name="employeeId"
            type="search"
            autocomplete="off"
            :placeholder="enabledFields.employeeIdIsEnabled ? '100XXXXX' : ''"
            :variant="enabledFields.employeeIdIsEnabled ? 'solo' : 'plain'"
            density="compact"
            id="id"
            :clearable="enabledFields.employeeIdIsEnabled"
            :readonly="!enabledFields.employeeIdIsEnabled"
            hide-details
          />
          <v-btn
            v-if="enabledFields.employeeIdIsEnabled"
            @click="save('employeeId', mainData.employeeId)"
            :disabled="!mainData.employeeId"
            text="Save"
          />
          <v-btn
            v-else
            @click="edit('employeeId')"
            icon="mdi-pencil"
            size="x-small"
            variant="tonal"
            color="grey"
            text="Save"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Calendar
            v-model="values"
            :staff-type="mainData.staffType"
            :month="mainData.month"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col offset="6" cols="6" class="text-right d-flex justify-end align-center">
          <p class="font-weight-bold">Global sum: <span style="font-size: 1.5em;">{{ new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(globalSum) }}</span></p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="justify-end d-flex">
          <v-btn
            @click="downloadTemplate"
            class="mr-2"
            prepend-icon="mdi-download"
            text="Save"
            color="green-darken-2"
          />
          <v-btn
            @click="dialog = !dialog"
            prepend-icon="mdi-send"
            text="Send"
            color="blue-darken-4"
          />
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="dialog"
      scrollable 
      persistent :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Send message
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h3>Send to supervisor</h3>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="3" class="text-right d-flex justify-end align-center">
              <p class="font-weight-bold">Supervisor name:</p>
            </v-col>
            <v-col cols="9" class="d-flex align-center">
              <v-text-field
                v-model="mainData.supervisorName"
                class="mr-4"
                name="supervisorName"
                type="search"
                autocomplete="off"
                :variant="!!enabledFields.supervisorNameIsEnabled ? 'solo' : 'plain'"
                density="compact"
                id="id"
                :clearable="enabledFields.supervisorNameIsEnabled"
                :readonly="!enabledFields.supervisorNameIsEnabled"
                hide-details
              />
              <v-btn
                v-if="enabledFields.supervisorNameIsEnabled"
                @click="save('supervisorName', mainData.supervisorName)"
                :disabled="!mainData.supervisorName"
                text="Save"
              />
              <v-btn
                v-else
                @click="edit('supervisorName')"
                icon="mdi-pencil"
                size="x-small"
                variant="tonal"
                color="grey"
                text="Save"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="3" class="text-right d-flex justify-end align-center">
              <p class="font-weight-bold">Supervisor email:</p>
            </v-col>
            <v-col cols="9" class="d-flex align-center">
              <v-text-field
                v-model="mainData.supervisorEmail"
                class="mr-4"
                name="supervisorEmail"
                type="search"
                autocomplete="off"
                :variant="!!enabledFields.supervisorEmailIsEnabled ? 'solo' : 'plain'"
                density="compact"
                id="id"
                :clearable="enabledFields.supervisorEmailIsEnabled"
                :readonly="!enabledFields.supervisorEmailIsEnabled"
                hide-details
              />
              <v-btn
                v-if="enabledFields.supervisorEmailIsEnabled"
                @click="save('supervisorEmail', mainData.supervisorEmail)"
                :disabled="!mainData.supervisorEmail"
                text="Save"
              />
              <v-btn
                v-else
                @click="edit('supervisorEmail')"
                icon="mdi-pencil"
                size="x-small"
                variant="tonal"
                color="grey"
                text="Save"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                :href="supervisorMessage"
                prepend-icon="mdi-send"
                variant="tonal"
                color="blue-darken-4"
                text="Send to supervisor"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3>Send to finance</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                :href="financeMessage"
                prepend-icon="mdi-send"
                variant="tonal"
                color="blue-darken-4"
                text="Send to finance"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p class="text-red">Please, pay attention that you still need to sign your form and attach it manually to the letters</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="dialog = false"
            prepend-icon="mdi-close"
            color="blue-darken-4"
            text="Close"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import MonthPicker from '@/components/MonthPicker.vue'
import Calendar from '@/components/Calendar.vue'
import useGenerateDocument from '@/composables/generate-document'
const { generateDocument } = useGenerateDocument()

const dutyStations = [
  'UKRDN, Dnipro, Ukraine',
  'UKRKH, Kharkiv, Ukraine',
  'UKRKI, Kyiv, Ukraine',
  'UKRLV, Lviv, Ukraine',
  'UKROD, Odesa, Ukraine'
]

const staffTypes = [
  'National',
  'International'
]

interface MainData {
  staffType?: string
  name?: string
  dutyStation?: string
  title?: string
  employeeId?: string
  month?: string
  supervisorName?: string
  supervisorEmail?: string
}

interface EnabledFields {
  nameIsEnabled?: boolean
  dutyStationIsEnabled?: boolean
  titleIsEnabled?: boolean
  employeeIdIsEnabled?: boolean
  staffTypeIsEnabled?: boolean
  supervisorNameIsEnabled?: boolean
  supervisorEmailIsEnabled?: boolean
}

const dialog = ref<boolean>(false)
const mainData = ref<MainData>({})
const enabledFields = ref<EnabledFields>({})

const storage = localStorage.getItem('danger-pay')
const store = storage === null ? {} : JSON.parse(storage)
const values = ref<string[]>([])

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

onMounted(() => {
  const fields = ['name', 'staffType', 'dutyStation', 'title', 'employeeId', 'supervisorName', 'supervisorEmail'] as Array<keyof MainData>
  mainData.value = store
  for (const field of fields) {
    if (mainData.value[field] !== undefined) continue
    const disabledKey = (field + 'IsEnabled') as keyof EnabledFields
    enabledFields.value[disabledKey] = true
  }
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear() - (new Date().getMonth() === 0 ? 1 : 0)
  mainData.value.month = `${String(currentYear)}-${String(currentMonth).padStart(2, '0')}`
})

const NATIONAL_PAY = 623/31
const INTERNATIONAL_PAY = 1698/31

const globalSum = computed<number>(() => {
  const total = [...Array(values.value.length).keys()].map(el => isCounted(values.value, el)).reduce((a, b) => a + b, 0)
  const coefficient = mainData.value.staffType === 'International' ? INTERNATIONAL_PAY : NATIONAL_PAY
  return Math.round((coefficient * total) * 100) / 100
})

const save = (field: keyof MainData, value?: string) => {
  if (value === undefined) return
  mainData.value[field] = value
  localStorage.setItem('danger-pay', JSON.stringify(mainData.value))
  const disabledKey = (field + 'IsEnabled') as keyof EnabledFields
  enabledFields.value[disabledKey] = false
}

const edit = (field: string) => {
  const disabledKey = (field + 'IsEnabled') as keyof EnabledFields
  enabledFields.value[disabledKey] = true
  const element = document.querySelector(`input[name="${field}"]`) as HTMLInputElement
  if (element !== null) element.focus()
}

const downloadTemplate = () => {
  generateDocument(values.value, mainData.value)
}

const supervisorMessage = computed(() => `mailto:${mainData.value.supervisorEmail}?subject=Request%20for%20Review%20and%20Confirmation%20of%20Form%20of%20Presence&body=Dear%20${mainData.value.supervisorName?.split(' ')[0]}%2C%0A%0AI%20hope%20you%20are%20doing%20well.%0A%0AMay%20I%20kindly%20ask%20you%20to%20review%20my%20Form%20of%20Presence%20for%20Danger%20Pay%20payments%20and%2C%20if%20everything%20is%20in%20order%2C%20confirm%20my%20presence%20in%20the%20country%20for%20the%20indicated%20days.%0A%0AI%20would%20be%20most%20grateful%20for%20your%20time%20and%20assistance%20with%20this%20matter.%0A%0AThank%20you%20very%20much%20for%20your%20support%20and%20cooperation.%0A%0AKind%20regards%2C%0A${mainData.value.name?.replace(/ /g, '%20')}`)

const reversedName = computed(() => {
  const name = mainData.value.name ?? '';
  const i = name.lastIndexOf(' ');
  return i === -1 ? name : `${name.slice(i + 1)} ${name.slice(0, i)}`;  
})

const emails = {
  'UKRDN, Dnipro, Ukraine': 'grechko@unhcr.org;ukrkipay@unhcr.org',
  'UKRKH, Kharkiv, Ukraine': 'grechko@unhcr.org;ukrkipay@unhcr.org',
  'UKRKI, Kyiv, Ukraine': 'savchenk@unhcr.org;ukrkipay@unhcr.org',
  'UKRLV, Lviv, Ukraine': 'baryshev@unhcr.org;ukrkipay@unhcr.org',
  'UKROD, Odesa, Ukraine': 'kupar@unhcr.org;ukrkipay@unhcr.org'
}

const financeEmail = computed(() => emails[mainData.value.dutyStation as keyof typeof emails])

const formatDate = (month?: string): string => {
  const [y, m] = month?.split('-') ?? []
  if (y === undefined || m === undefined) return 'Undefined month'
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(y), Number(m) - 1, 1))
}

const emailSubject = computed(() => {
  return [
    mainData.value.dutyStation,
    reversedName.value,
    mainData.value.employeeId,
    'DP ' + formatDate(mainData.value.month)
  ].filter(Boolean).join(' - ').replace(/ /g, '%20')
})

const financeMessage = computed(() => `
mailto:${financeEmail.value}?subject=${emailSubject.value}&body=Dear%20Finance%20Unit%2C%0D%0A%0D%0AI%20hope%20this%20message%20finds%20you%20well.%0D%0A%0D%0APlease%20find%20attached%20my%20completed%20Form%20of%20Presence%20in%20the%20Country%20for%20your%20kind%20review%20and%20processing%20of%20my%20Danger%20Pay%20entitlement%2C%20in%20accordance%20with%20the%20applicable%20rules%20and%20regulations.%0D%0A%0D%0AI%20would%20be%20most%20grateful%20if%20you%20could%20kindly%20review%20the%20attached%20document%20and%20proceed%20with%20the%20necessary%20arrangements%2C%20as%20applicable.%0D%0A%0D%0AThank%20you%20very%20much%20for%20your%20time%2C%20assistance%2C%20and%20continued%20support.%0D%0A%0D%0AKind%20regards%2C%0D%0A${mainData.value.name}`)

</script>
<style>
input[readonly] {
  padding-top: 0;  
}
.v-input--readonly .v-field__input {
  padding-top: 0;  
}
</style>