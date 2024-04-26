<script setup lang="ts">
import type { ITicket } from '~shared'

const worker = new Worker('worker.js')
const data = await fetch(import.meta.env.VITE_API_BASE_URL + '/search').then((res) => res.json())
let searchId = ''
if (data && data.searchId) {
    searchId = data.searchId
}

const tickets = shallowRef<ITicket[]>([])
const stop = ref<boolean>(false)
const error = ref()
const loading = ref(true)

const fetchData = (reset: boolean = true) => {
    if (reset) {
        loading.value = true
        error.value = ''
    }

    worker.postMessage(import.meta.env.VITE_API_BASE_URL + `/tickets?searchId=${searchId}`)
}

worker.onmessage = function (event) {
    const responseData = event.data

    if (responseData && 'tickets' in responseData) {
        tickets.value = [...tickets.value, ...responseData.tickets]
        stop.value = responseData.stop
    } else {
        error.value = responseData.error
    }

    loading.value = false
}

onBeforeMount(fetchData)
</script>

<template>
    <Transition>
        <slot
            :tickets="tickets"
            :error="error"
            :loading="loading"
            :fetchData="fetchData"
            :stop="stop"
            v-if="!error && !loading"
        ></slot>
        <section v-else-if="error">
            <h1>Error while fetching tickets.</h1>

            <AirButton @click="fetchData" class="text-base">Try again</AirButton>
        </section>
    </Transition>
</template>

<style scoped lang="postcss">
section {
    @apply max-w-md my-10 mx-auto text-2xl space-y-5 text-center font-bold;
}
</style>
