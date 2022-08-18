<script lang="ts" setup>
import { PropType, defineProps } from 'vue';


defineProps({
    message: {
        type: String as PropType<string>,
        default: 'This is a notification'
    },
    color: {
        type: String as PropType<'is-info' | 'is-danger'>,
        default: 'is-info'
    }
})

const handleDelete = () => {
}
</script>

<template>
    <div class="notification is-light"
    :class="color">
        <button class="delete"
        @click="handleDelete"></button>
        {{message}}
    </div>
</template>