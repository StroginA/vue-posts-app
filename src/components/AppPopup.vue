<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import store from '@/store';
import { PopupColor } from '@/types';


const props = defineProps({
    // matches id in the store array
    id: {
        type: Number as PropType<number>,
        default: -1
    },
    message: {
        type: String as PropType<string>,
        default: 'This is a notification'
    },
    color: {
        type: String as PropType<PopupColor>,
        default: 'is-info'
    }
});

const handleDelete = () => {
    store.dispatch('deletePopup', props.id)
}
</script>

<template>
    <div class="notification is-light"
    :class="props.color">
        <button class="delete"
        @click="handleDelete"></button>
        {{props.message}}
    </div>
</template>