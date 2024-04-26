<script setup lang="ts">
import type { AirFilterProps, TFilterKeys } from '~shared'
import { useFiltersStore } from '../store/filtersStore'

const props = defineProps<AirFilterProps>()
const isExpanded = ref(false)
const filterStore = useFiltersStore()
const filtersStorage = useLocalStorage('filters', {} as Record<TFilterKeys, []>)
const modelValue = ref(filtersStorage.value[props.filterKey] || [])
watch(modelValue, () => filterStore.updateFilter(props.filterKey, modelValue.value))
</script>

<template>
    <div class="bg-white shadow-md rounded">
        <fieldset class="md:pb-5" :class="{ 'pb-5': !isExpanded }">
            <legend
                class="p-5 text-neutral-600 text-xs font-semibold uppercase leading-3 tracking-wide w-full flex items-center justify-between cursor-pointer md:cursor-auto"
                @click="isExpanded = !isExpanded"
            >
                {{ filter.label }}

                <button class="appearance-none cursor-pointer md:hidden">
                    <span class="sr-only">Expand section</span>
                    <IconArrow class="w-4 h-4 fill-gray-500" :class="{ 'rotate-180': isExpanded }" />
                </button>
            </legend>

            <div class="md:block" :class="{ hidden: isExpanded }">
                <div
                    v-for="filterValue in filter.values"
                    :key="filterValue.value"
                    class="cursor-pointer hover:bg-sky-50 focus-within:bg-sky-50 px-5 py-2.5 relative transition-colors"
                >
                    <AirCheckbox
                        v-model="modelValue"
                        :value="filterValue.value"
                        :label="filterValue.label"
                        style="--icon-shift: 24px"
                    />
                </div>
            </div>
        </fieldset>
    </div>
</template>
../store/filtersStore
