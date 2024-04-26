<script setup lang="ts">
import type { AirPriceProps } from '~shared'
import { formatCurrency } from '~shared'

const props = defineProps<AirPriceProps>()
const price = computed(() => formatCurrency(props.price))
</script>

<template>
    <span>{{ price }}</span>
</template>

<style scoped lang="postcss">
span {
    @apply text-sky-500 text-2xl font-semibold leading-normal;
}
</style>
