import { DEFAULT_SORTING, filters } from '~shared'
import type { TFilterKey, TSortingKey, IFilterValue } from '~shared'

export const useFiltersStore = defineStore('filters', () => {
    const filtersState = useLocalStorage<Record<TFilterKey, any[]>>('filters', {
        ...Object.keys(filters).reduce((acc, filter) => ({ ...acc, [filter]: [] }), {} as Record<TFilterKey, any[]>)
    })
    const sortState = useLocalStorage<TSortingKey>('sort', DEFAULT_SORTING)
    const updateFilter = (key: TFilterKey, val: IFilterValue[]) => (filtersState.value[key] = [...val])
    const updateSort = (val: TSortingKey) => (sortState.value = val)

    return { filtersState, sortState, updateFilter, updateSort }
})
