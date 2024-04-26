<script setup lang="ts">
import type { ITicket, TSortingKey } from '~shared'
import { useFiltersStore } from '../store/filtersStore'
import { TICKETS_CHUNK_SIZE, filterFuncs, sortingFuncs } from '~shared'

const props = defineProps<{
    tickets: ITicket[]
    isAllTicketsLoaded: boolean
}>()
const filtersStore = useFiltersStore()
const filterRules = ref(filtersStore.filtersState)

const ticketsList = shallowRef<ITicket[]>([])
const rawTickets = computed(() => props.tickets)

watch(
    [filterRules, rawTickets],
    () => {
        let tempTickets = rawTickets.value

        if (filterRules.value.price.length) {
            tempTickets = tempTickets.filter((ticket) => filterFuncs['price'](ticket, filterRules.value.price))
        }

        if (filterRules.value.transfers.length) {
            tempTickets = tempTickets.filter((ticket) => filterFuncs['transfers'](ticket, filterRules.value.transfers))
        }

        ticketsList.value = [...tempTickets]
    },
    { deep: true, immediate: true }
)

const sortTickets = (rule: TSortingKey) => {
  let tempTickets = rawTickets.value
  tempTickets.sort(sortingFuncs[rule])
  ticketsList.value = [...tempTickets]
}

filtersStore.$onAction(({ name, after }) => {
    ticketsCount.value = TICKETS_CHUNK_SIZE

    if (name === 'updateSort') {
        after((result) => (sortTickets(result)))
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
    wrapperProps
} = useVirtualList(
    computed(() => ticketsList.value.slice(0, ticketsCount.value)),
    {
        itemHeight: 180
    }
)
</script>

<template>
    <template v-if="ticketsList.length">
        <div class="flex justify-between">
            <p>Total tickets: {{ ticketsList.length }}</p>
            <p>Displayed: {{ ticketsCount }}</p>
        </div>

        <div v-bind="containerProps" style="height: 70vh" class="scrollbar">
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
