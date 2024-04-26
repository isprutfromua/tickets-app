<script setup lang="ts">
import type { AirCheckboxProps } from '~shared'

const props = defineProps<AirCheckboxProps>()
const emit = defineEmits<{
    'update:modelValue': [value: [] | boolean]
}>()
const id = computed(() => ['checkbox', props.label.replace(/\s/g, ''), Math.random().toString().slice(2, 8)].join('_'))
const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <label>
        <input class="peer" type="checkbox" v-model="model" :value="value" :id="id" />
        <span>{{ label }}</span>
        <IconCheck class="absolute left-[--icon-shift] fill-sky-500 pointer-events-none hidden peer-checked:block" />
    </label>
</template>

<style scoped lang="postcss">
input {
    @apply shrink-0 appearance-none w-5 h-5 rounded-sm border border-slate-400 bg-white transition-colors;
    @apply checked:border-sky-500 checked:border-2 checked:text-sky-500;
    @apply focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-300;
}

label {
    @apply flex items-center gap-x-2.5 select-none cursor-pointer;
    @apply text-neutral-600 text-xs font-normal leading-tight cursor-pointer w-full;
    @apply after:absolute after:inset-0;
}
</style>
