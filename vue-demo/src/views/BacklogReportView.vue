<template>
    <h1>hi</h1>
</template>

<script>
import BacklogReportDataServices from '@/services/BacklogReportDataServices';
import { useUserStore } from '@/stores/UserStore';
export default {
    name: 'BacklogReportView',
    setup () {
        const store = useUserStore()

        return { store }
    },
    data(){
        return {
            miners: [],
        }
    },
    async mounted() {
        try {
            const res = await BacklogReportDataServices.getBacklogMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
            console.log(this.miners)
        } catch (error) {
            console.error(error)
        }
    }
}
</script>