import { filters, sortingRules } from './settings.ts'

export interface IFilterValue {
    value: string | number
    label: string
}
export interface IFilter {
    label: string
    values: IFilterValue[]
}
export interface AirFilterProps {
    filter: IFilter
    filterKey: TFilterKey
}
export interface AirCheckboxProps {
    modelValue: [] | boolean
    value: string | number
    label: string
}
export interface AirPriceProps {
    price: number
}
export interface AirSortingProps {
    options: Readonly<ISortOption[]>
}
export interface AirTicketProps {
    ticket: ITicket
}
export interface ISortOption {
    label: string
    value: string
}
export type TSortingKey = (typeof sortingRules)[number]['value']
export type TFilterKey = keyof typeof filters
interface ISegment {
    origin: string
    destination: string
    date: string
    stops: string[]
    duration: number
}
export interface ITicket {
    price: number
    carrier: string
    segments: [SegmentFrom: ISegment, SegmentTo: ISegment]
    // extra
    lowestDuration: number
    optimality: number
    maxStops: number
}
