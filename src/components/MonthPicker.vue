<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="tonal" color="blue-darken-4">
        {{ buttonName }}
      </v-btn>
    </template>
    <v-card>
      <v-month-picker v-model="model" />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VMonthPicker } from 'vuetify/labs/VMonthPicker'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const model = computed<string | undefined>({
  get: () => props.modelValue,
  set: (val?: string) => emit('update:modelValue', val)
})

const buttonName = computed(() => {
  const [y, m] = model.value?.split('-') ?? []
  if (y === undefined || m === undefined) return 'Select month'
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(y), Number(m) - 1, 1))
})
</script>