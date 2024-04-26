import { IMAGE_BASE_URL } from './constants.ts'
import { CURRENCY, LOCALE } from './settings.ts'

export function getImgUrl(img: string) {
    return IMAGE_BASE_URL.replace('{0}', img)
}
export function formatCurrency(amount: number, currencyCode: string = CURRENCY, locale: string = LOCALE): string {
    try {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        return formatter.format(amount)
    } catch (error) {
        console.error('Error formatting currency:', error)
        return '' // Return an empty string in case of error
    }
}

export function formatTimeRange(date: string, duration: number) {
    try {
        if (!date || !duration) {
            return ''
        }

        const ONE_MINUTE = 60_000
        const startTime = new Date(date)
        const endTime = new Date(startTime.getTime() + duration * ONE_MINUTE)

        const formatTime = (time: Date) => {
            const hours = time.getHours().toString().padStart(2, '0')
            const minutes = time.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
        }

        const startTimeFormatted = formatTime(startTime)
        const endTimeFormatted = formatTime(endTime)

        return `${startTimeFormatted} – ${endTimeFormatted}`
    } catch {
        return ''
    }
}

export function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
}
