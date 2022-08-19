<script lang="ts" setup>
import { PropType, defineProps } from 'vue';


const props = defineProps({
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
    <!--
        Generic "loading" component
    -->
    <div class="is-flex is-justify-content-center">
        <span v-if="!props.isLoadingError"
        class="icon is-size-1">
            <i class="fas fa-spinner fa-pulse"></i>
        </span>
        <p v-else class="has-text-danger is-size-4">
            {{props.errorMessage}}
        </p>
    </div>
</template>