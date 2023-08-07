<template>
    <main class="flex flex-grow">
        <div class="mx-2 mt-2 flex">
            <div class="my-4 mx-2 flex flex-col">
                <label>
                    <p>From :</p>
                    <input type="date"
                        class=" w-28 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0"
                        v-model="dateYesterday">
                </label>
                <label>
                    <p>To :</p>
                    <input type="date"
                        class=" w-28 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0"
                        v-model="dateToday">
                </label>
            </div>
            <div class="my-4 mx-2 flex flex-col">
                <label>
                    <p>&nbsp;</p>
                    <input type="time"
                        class=" w-28 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0">
                </label>
                <label>
                    <p>&nbsp;</p>
                    <input type="time"
                        class=" w-28 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0">
                </label>
            </div>
        </div>
    </main>
</template>

<script>
import BacklogReportDataServices from '@/services/BacklogReportDataServices';
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';
export default {
    name: 'BacklogReportView',
    setup () {
        const store = useUserStore()

        return { store }
    },
    data () {
        return {
            miners: [],
            dateToday: ref(""),
            dateYesterday: ref(""),
        }
    },
    async mounted () {
        try {
            const res = await BacklogReportDataServices.getBacklogMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
            const currentDate = new Date()
            let year = currentDate.getFullYear()
            let month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
            let day = currentDate.getDate().toString().padStart(2, '0')
            this.dateToday = `${day}/${month}/${year}`
            const yesterdayDate = new Date(currentDate);
            yesterdayDate.setDate(currentDate.getDate() - 1);
            year = yesterdayDate.getFullYear();
            month = (yesterdayDate.getMonth() + 1).toString().padStart(2, '0');
            day = yesterdayDate.getDate().toString().padStart(2, '0');
            this.dateYesterday = `${day}/${month}/${year}`
            console.log(this.dateToday, this.dateYesterday)
        } catch (error) {
            console.error(error)
        }
    }
}
</script>