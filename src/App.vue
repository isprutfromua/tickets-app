<script setup lang="ts">
import { filters, sortingRules } from './shared/settings.ts'
</script>

<template>
    <div class="bg-slate-100 flex flex-col py-4 md:py-8 min-w-80 px-5 h-screen">
        <AirLogo class="self-center mb-3" width="60" height="60" />
        <Suspense>
            <AirTicketsProvider v-slot="slotProps">
                <div class="grid md:grid-cols-9 gap-5 max-w-3xl mx-auto w-full items-start">
                    <aside class="md:col-span-3 space-y-5 md:sticky md:top-10">
                        <AirFilter v-for="(filter, key) in filters" :filter="filter" :filterKey="key" />
                    </aside>
                    <div class="md:col-span-6 space-y-5">
                        <AirSorting :options="sortingRules" />
                        <div class="space-y-5">
                            <AirTicketsList
                                :tickets="slotProps.tickets"
                                :isAllTicketsLoaded="slotProps.stop"
                                @fetch:click="() => slotProps.fetchData(false)"
                            />
                        </div>
                    </div>
                </div>
            </AirTicketsProvider>
            <template #fallback>
                <AirSkeleton />
            </template>
        </Suspense>
    </div>
</template>
