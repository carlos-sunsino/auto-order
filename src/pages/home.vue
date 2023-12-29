<template lang="pug">
p {{ member }}
</template>

<script setup>
import { inject, onMounted } from 'vue'
const { member } = inject('datas')

onMounted(() => {
	console.log(member)
})
</script>

<style lang="scss" scoped></style>
