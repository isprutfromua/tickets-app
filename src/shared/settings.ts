import { ITicket, TSortingKey } from './types.ts'

export const filters = {
    transfers: {
        label: 'Transfers count',
        values: [
            {
                value: 'all',
                label: 'All',
            },
            {
                value: 0,
                label: 'No transfers',
            },
            {
                value: 1,
                label: '1 transfer',
            },
            {
                value: 2,
                label: '2 transfers',
            },
            {
                value: 3,
                label: '3 transfers',
            },
        ],
    },
    price: {
        label: 'Price',
        values: [
            {
                value: 'from10kto30k',
                label: '10 000 - 30 000',
            },
            {
                value: 'from30kto50k',
                label: '30 000 - 50 000',
            },
            {
                value: 'from50k',
                label: '50 000+',
            },
        ],
    },
}
export const filterFuncs = {
    // TODO: change type
    transfers: (ticket: ITicket, keys: Array<number | 'all'>) => {
        if (keys.includes('all') || keys.length === 0) return true
        if (keys.includes(0) && ticket.maxStops === 0) return true
        if (keys.includes(1) && ticket.maxStops === 1) return true
        if (keys.includes(2) && ticket.maxStops === 2) return true
        if (keys.includes(3) && ticket.maxStops === 3) return true

        return false
    },
    price: (ticket: ITicket, keys: string[]) => {
        if (keys.length === 0) return true

        if (keys.includes('from10kto30k') && ticket.price >= 10_000 && ticket.price <= 30_000) return true
        if (keys.includes('from30kto50k') && ticket.price >= 30_000 && ticket.price <= 50_000) return true
        if (keys.includes('from50k') && ticket.price >= 50_000) return true

        return false
    },
}

export const sortingRules = [
    {
        label: 'Fastest',
        value: 'fast',
    },
    {
        label: 'Low cost',
        value: 'low',
    },
    {
        label: 'Optimal',
        value: 'optimal',
    },
] as const
export const sortingFuncs: Record<TSortingKey, (a: ITicket, b: ITicket) => number> = {
    fast: (a, b) => a.lowestDuration - b.lowestDuration,
    low: (a, b) => a.price - b.price,
    optimal: (a, b) => a.optimality - b.optimality,
}
export const DEFAULT_SORTING: TSortingKey = 'fast'
export const CURRENCY = 'UAH'
export const LOCALE = 'uk-UA'
