<script setup lang="ts">
import type { AirSortingProps, TSortingKey } from '~shared'
import { DEFAULT_SORTING } from '~shared'
import { useFiltersStore } from '../store/filtersStore'

defineProps<AirSortingProps>()
const sort = useLocalStorage<TSortingKey>('sort', DEFAULT_SORTING)

const filterStore = useFiltersStore()
watch(sort, () => filterStore.updateSort(sort.value))
</script>

<template>
    <fieldset>
        <label v-for="(option, index) in options" :key="[option.value, index].join('_')">
            <input type="radio" :value="option.value" name="sorting" v-model="sort" class="sr-only peer" />
            <span>{{ option.label }}</span>
        </label>
    </fieldset>
</template>

<style scoped lang="postcss">
fieldset {
    @apply rounded border border-slate-300 flex items-center;
    @apply text-center text-neutral-600 text-xs font-semibold uppercase leading-tight tracking-wide;
    @apply overflow-hidden relative;
}

span {
    @apply p-4 border-r border-slate-300 block bg-white;
    @apply peer-checked:bg-sky-500 peer-checked:text-white transition-colors;
    @apply peer-focus:bg-sky-600;
    @apply cursor-pointer;
}

label {
    @apply grow;

    &:last-child span {
        @apply border-r-0;
    }
}
</style>
../store/filtersStore
