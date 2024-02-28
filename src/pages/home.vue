<template lang="pug">
h3.title 作燴記帳
section
	.loadOrder
		input(type="text" v-model="orderId")
		button(@click="loadOrder()") 取得訂單

	table 
		thead
			th 顯示名稱
			th 訂單金額
			th 對應名稱
		tbody.member(v-for="item in order.value")
			td.userName {{ item.userName }}
			td.totalAmount {{ item.totalAmount }}
			td
				select.realName(v-model="item.realName")
					option(v-for="name in memberList" v-bind:value="name") {{ name }}
	button(@click="check()") 送出
	.result {{ orderResult }}
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
// const { member } = inject('datas')

const orderId = ref('')
const orderResult = ref('')
const memberList = [
	'Ariel',
	'Akai',
	'Cami',
	'Carlos',
	'Carol',
	'Chian',
	'Freda',
	'Jason',
	'Jessica',
	'Joe',
	'Kenny',
	'Kevin',
	'Mara',
	'Rayz',
	'William',
	'Yvonne',
	'Ziv',
	'Elena',
	'Ivy',
	'Johnson',
	'Joyce',
	'Lily',
	'Seta',
	'Claire',
	'Zoe',
	'Zona'
]

const check = async () => {
	let objectDate = new Date()
	let day = objectDate.getDate()
	let month = objectDate.getMonth()
	const result = {
		date: `${month + 1}/${day} 作燴`
	}
	memberList.map((member) => {
		result[member] = 0
		order.value.map((item) => {
			if (item.realName === member) {
				result[member] += Number(item.totalAmount)
			}
		})
	})

	await axios
		.post('https://hook.eu2.make.com/u2ytd6538n660g2psqg3dcreyygqnu7o', result)
		.then((res) => (orderResult.value = 'Result: ' + res.data))
}

const order = reactive({})

const loadOrder = async () => {
	await axios
		.get(
			`https://eats.quickclick.cc/apis/users/U021d4da73a3d0f2a9732c07879ace719/orders/${orderId.value}`
		)
		.then(
			(res) =>
				(order.value = res.data.orderSnapshot.subOrderList?.map((item) => ({
					userName: item.userName,
					totalAmount: item.totalAmount,
					realName:
						memberList.indexOf(item.userName.trim()) >= 0 ? item.userName.trim() : ''
				})))
		)
}
onMounted(async () => {
	await axios
		.get(
			'https://eats.quickclick.cc/apis/users/U021d4da73a3d0f2a9732c07879ace719/orders?p=zoheyeats&status=all'
		)
		.then((res) => {
			orderId.value = res.data[0].orderId
		})
	await loadOrder()
})
</script>

<style lang="scss" scoped>
.title {
	padding: 10px 20px;
}
section {
	padding: 0px 20px;
}
.loadOrder {
	margin-bottom: 20px;
}
table {
	margin-bottom: 5px;
	th {
		padding: 4px 8px;
	}
	td {
		padding: 4px 8px;
	}
}
button {
	border-radius: 4px;
	margin: 5px;
	padding: 4px 15px;
	color: #fff;
	font-weight: 600;
	background-color: #eb7d33;

	&:hover,
	&:active {
		background-color: #e48749;
	}
}
.result {
	padding: 10px 5px;
}
</style>
