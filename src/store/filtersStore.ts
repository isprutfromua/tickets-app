import { DEFAULT_SORTING, filters } from '~shared'
import type { TFilterKeys, TSortingKey } from '~shared'

export const useFiltersStore = defineStore('filters', () => {
    const filtersState = useLocalStorage<Record<TFilterKeys, any[]>>('filters', {
        ...Object.keys(filters).reduce((acc, filter) => ({ ...acc, [filter]: [] }), {} as Record<TFilterKeys, any[]>),
    })
    const sortState = useLocalStorage<TSortingKey>('sort', DEFAULT_SORTING)
    const updateFilter = (key, val) => (filtersState.value[key] = [...val])
    const updateSort = (val: TSortingKey) => (sortState.value = val)

    return { filtersState, sortState, updateFilter, updateSort }
})
