<script lang="ts" setup>
import { PropType, defineProps } from 'vue';


defineProps({
    errorMessage: {
        type: String as PropType<string>,
        default: 'An error has occured'
    },
    isLoadingError: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})
</script>

<template>
    <div class="is-flex is-justify-content-center">
        <span v-if="!isLoadingError"
        class="icon is-size-1">
            <i class="fas fa-spinner fa-pulse"></i>
        </span>
        <p v-else class="has-text-danger is-size-4">
            {{errorMessage}}
        </p>
    </div>
</template>