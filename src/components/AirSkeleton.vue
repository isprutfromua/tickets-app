<template>
    <div class="grid md:grid-cols-9 gap-5 max-w-3xl mx-auto w-full">
        <aside class="md:col-span-3 space-y-5">
            <div class="h-60 w-full bg-gray-200 animate-pulse hidden md:block"></div>

            <div class="h-60 w-full bg-gray-200 animate-pulse hidden md:block"></div>

            <div class="min-h-72 w-full bg-gray-200 animate-pulse md:hidden"></div>
            <div class="min-h-72 w-full bg-gray-200 animate-pulse md:hidden"></div>
        </aside>
        <div class="md:col-span-6 space-y-5">
            <div class="h-12 w-full bg-gray-200 animate-pulse"></div>
            <div class="space-y-5">
                <div v-for="(_, index) in 5" :key="index" class="h-48 w-full bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    </div>
</template>
