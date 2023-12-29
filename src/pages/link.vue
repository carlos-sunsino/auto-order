<template lang="pug">
p.link {{ data.shareableUrl }}
</template>

<script setup>
import { onMounted } from 'vue'

const data = {
	id: 'd5b1f376aabf067ee81029147362f0a23451596a92f30e43f1b53e7ffac41d92',
	isOnGoing: true,
	isConfirmed: false,
	isCancelled: false,
	isGroupbuy: true,
	isMaster: true,
	shareableUrl: 'https://ddc.ai/ygav1d'
}

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
