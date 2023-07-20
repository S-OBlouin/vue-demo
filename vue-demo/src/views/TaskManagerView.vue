<template>
    <button @click="activity" class="border bg-red-500">hi</button>
</template>

<script>
import MinerDataServices from '@/services/MinerDataServices.js'
import { useUserStore } from '@/stores/UserStore';
export default {
    name: 'TaskManagerView',
    setup () {
        const store = useUserStore()

        return { store }
    },
    data () {
        return {
            miners: [],
            activities: [],
        }
    },
    async beforeMount () {
        const res = await MinerDataServices.getMinerList(this.store.token)
        this.miners = JSON.parse(JSON.stringify(res.data))
        console.log(this.miners)
    },
    async mounted () {

    },
    methods: {
        async activity () {
            const res = await MinerDataServices.getActivities(JSON.stringify({
                page: 0,
                miners: this.miners,
                username: "",
                date: null
            }), this.store.token)
            this.activities = JSON.parse(JSON.stringify(res.data))
            console.log(this.activities)
        }
    }
}
</script>