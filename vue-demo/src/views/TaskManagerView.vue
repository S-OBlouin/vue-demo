<template>
    <h1>hi</h1>
</template>

<script>
import MinerDataServices from '@/services/MinerDataServices.js'
import { useUserStore } from '@/stores/UserStore';
export default{
    name:'TaskManagerView',
    setup(){
        const store = useUserStore()

        return { store }
    },
    data(){
        return {
            miners: [],
            activities: [],
        }
    },
    async beforeMount(){
        const res = await MinerDataServices.getMinerList(this.store.token)
        this.miners = JSON.parse(JSON.stringify(res.data))
    },
    async mounted(){
        const res = await MinerDataServices.getActivities({
            page: 0,
            miners: this.miners,
            username: '',
            date: null
        })
        this.activities = JSON.parse(JSON.stringify(res.data))
        console.log(this.activities)
    },
}
</script>