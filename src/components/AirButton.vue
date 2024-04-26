<template>
    <button class="bg-sky-500 w-full py-3.5 px-5 rounded-md hover:bg-sky-600 transition-colors text-xs">
        <span class="text-center text-white font-semibold uppercase leading-tight tracking-wide">
            <slot></slot>
        </span>
    </button>
</template>

<style scoped lang="postcss">
button {
    @apply focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-blue-300;
}
</style>
