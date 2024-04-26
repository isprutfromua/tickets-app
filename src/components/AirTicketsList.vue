<script setup lang="ts">
import type { ITicket } from '~shared'
import { useFiltersStore } from '../store/filtersStore'
import { TICKETS_CHUNK_SIZE, filterFuncs, sortingFuncs } from '~shared'

const props = defineProps<{
    tickets: ITicket[]
    isAllTicketsLoaded: boolean
}>()
const filtersStore = useFiltersStore()
const filterRules = filtersStore.filtersState
const sortRule = ref(filtersStore.sortState)

const ticketsList = shallowRef<ITicket[]>([])
const rawTickets = computed(() => props.tickets)

watch(
    [filterRules, sortRule, rawTickets],
    () => {
        let tempTickets = rawTickets.value

        if (filterRules.price.length) {
            tempTickets = tempTickets.filter((ticket) => filterFuncs['price'](ticket, filterRules.price))
        }

        if (filterRules.transfers.length) {
            tempTickets = tempTickets.filter((ticket) => filterFuncs['transfers'](ticket, filterRules.transfers))
        }

        if (sortRule.value) {
            tempTickets.sort(sortingFuncs[sortRule.value])
        }

        ticketsList.value = [...tempTickets]
    },
    { deep: true, immediate: true },
)

filtersStore.$onAction(({ name, after }) => {
    ticketsCount.value = TICKETS_CHUNK_SIZE
    if (name === 'updateSort') {
        after((result) => (sortRule.value = result))
    }
})

const ticketsCount = ref<number>(TICKETS_CHUNK_SIZE)
const displayMoreTickets = () => {
    if (ticketsCount.value + TICKETS_CHUNK_SIZE < ticketsList.value.length) {
        ticketsCount.value += TICKETS_CHUNK_SIZE
    } else {
        ticketsCount.value = ticketsList.value.length
    }

    nextTick(() => {
        scrollTo(ticketsCount.value)
    })
}
const displayLoadMore = computed(() => ticketsList.value.length > ticketsCount.value)
const isAllTicketsVisible = computed(() => ticketsList.value.length === ticketsCount.value)
const emit = defineEmits<{
    'fetch:click': []
}>()
const onFetchClick = () => {
    emit('fetch:click')
    displayMoreTickets()
}
const {
    list: virtualList,
    scrollTo,
    containerProps,
    wrapperProps,
} = useVirtualList(
    computed(() => ticketsList.value.slice(0, ticketsCount.value)),
    {
        itemHeight: 180,
    },
)
</script>

<template>
    <template v-if="ticketsList.length">
        <div class="flex justify-between">
            <p>Total tickets: {{ ticketsList.length }}</p>
            <p>Displayed: {{ ticketsCount }}</p>
        </div>

        <div v-bind="containerProps" style="height: 460px">
            <div v-bind="wrapperProps" class="space-y-5">
                <AirTicket
                    v-for="(ticket, index) in virtualList"
                    :key="index + ticket.data.carrier"
                    :ticket="ticket.data"
                    style="height: 180px"
                />
            </div>
        </div>

        <AirButton v-show="displayLoadMore" @click="displayMoreTickets">
            Show {{ TICKETS_CHUNK_SIZE }} more tickets
        </AirButton>

        <p v-if="isAllTicketsLoaded">All tickets loaded!</p>
        <AirButton v-show="isAllTicketsVisible" @click="onFetchClick">
            {{ isAllTicketsLoaded ? 'Try again' : 'Fetch more tickets' }}
        </AirButton>
    </template>
    <div v-else>No tickets found.</div>
</template>
