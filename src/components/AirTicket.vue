<script setup lang="ts">
import type { AirTicketProps } from '~shared'
import { formatTimeRange, getImgUrl, toHoursAndMinutes } from '~shared'

const props = defineProps<AirTicketProps>()
const ticket = toRef(() => props.ticket)
const ticketLogo = computed(() => getImgUrl(ticket.value.carrier))
</script>

<template>
    <section>
        <header>
            <AirPrice :price="ticket.price" />
            <img :src="ticketLogo" :alt="ticket.carrier" />
        </header>

        <main>
            <table v-for="segment in ticket.segments" :key="segment.origin">
                <tr>
                    <th>{{ segment.origin }} - {{ segment.destination }}</th>
                    <th>On the way</th>
                    <th>
                        {{ segment.stops.length }}
                        {{ segment.stops.length === 1 ? 'transfer' : 'transfers' }}
                    </th>
                </tr>
                <tr>
                    <td>
                        {{ formatTimeRange(segment.date, segment.duration) }}
                    </td>
                    <td>{{ toHoursAndMinutes(segment.duration) }}</td>
                    <td>{{ segment.stops.join(', ') }}</td>
                </tr>
            </table>
        </main>
    </section>
</template>

<style scoped lang="postcss">
section {
    @apply bg-white shadow-md rounded-md p-5;
}
header {
    @apply flex justify-between items-center mb-5;
}
main {
    @apply space-y-2.5;
}
img {
    @apply max-h-9;
}
table {
    @apply table-auto w-full text-left;
}
th {
    @apply w-1/3 text-gray-400 text-xs font-semibold uppercase leading-none tracking-wide pb-1;
}
td {
    @apply w-1/3 text-neutral-600 text-sm font-semibold leading-tight;
}
</style>
