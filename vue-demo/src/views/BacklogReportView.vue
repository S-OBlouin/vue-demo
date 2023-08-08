<template>
    <main class="flex flex-col flex-grow">
        <div v-if="selectMiner" class="w-full h-full fixed flex min-h-screen justify-center p-0 justify-items-center">
            <div class="bg-gray-600/50 z-30 flex justify-center flex-grow">
                <div class=" bg-white h-fit w-60 z-50 top-5 right-1/2 absolute rounded">
                    <div class="flex justify-between bg-slate-100">
                        <p class=" font-semibold p-2 rounded">Select Miners</p>
                        <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer"
                            @click="openMiners">close</span>
                    </div>
                    <div class="max-h-72 overflow-y-auto">
                        <div v-for="miner in this.miners" :key="miner" class="border p-2">
                            <label class="flex justify-between">
                                <span class="ml-1 overflow-x-hidden">{{ miner }}</span>
                                <input type="checkbox" name="miners" :value="miner" v-model="minersName">
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center justify-center my-1">
                        <button @click="openMiners" class="px-1 py-0.5 m-1 bg-orange-400 rounded">{{ buttonText }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-2 mt-2 flex border-b border-gray-500 h-fit justify-between">
            <div class="flex">
                <div class="my-4 mx-3 flex flex-col">
                    <label class="mb-2">
                        <p>From :</p>
                        <input type="date" id="start"
                            class=" w-48 bg-gray-300 border-b border-black min-w-fit rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0"
                            v-model="dateStart">
                    </label>
                    <label class="mb-6">
                        <p>To :</p>
                        <input type="date" id="end"
                            class="w-48 bg-gray-300 border-b border-black min-w-fit  rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0"
                            v-model="dateEnd">
                    </label>
                    <label>
                        <input type="number" placeholder="SAR Min (5 digits)" class=" bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800" step="0.00001" v-model="sarMin">
                    </label>
                </div>
                <div class="my-4 mx-3 flex flex-col">
                    <label class="mb-2">
                        <p>&nbsp;</p>
                        <input type="time"
                        class=" w-48 bg-gray-300 border-b border-black min-w-fit rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0" v-model="timeStart">
                    </label>
                    <label class="mb-6">
                        <p>&nbsp;</p>
                        <input type="time"
                        class="w-48 bg-gray-300 border-b border-black min-w-fit rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0" v-model="timeEnd">
                    </label>
                    <label>
                        <input type="number" placeholder="SAR Max (5 digits)" class=" bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800" step="0.00001" v-model="sarMax">
                    </label>
                </div>
            </div>
            <div class="my-4 mx-3 flex flex-col">
                <p>&nbsp;</p>
                <label class="mb-2" :class="selectMiner ? '' : 'relative'" @click="openMiners">
                    <input type="text" placeholder="Miner Name" class="w-48 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800 truncate pr-8" v-model="minersName" disabled ><span v-if="!selectMiner" class="material-symbols-outlined absolute right-0.5">expand_more</span>
                </label>
                <p>&nbsp;</p>
                <label>
                    <input type="text" placeholder="Display ID" class="w-48 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800" v-model="displayId">
                </label>
                <p>&nbsp;</p>
                <label>
                    <input type="text" placeholder="Label" class="w-48 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800" v-model="label">
                </label>
            </div>
            <div class="my-4 mx-3 flex flex-col">
                <button class=" text-lg bg-white p-1 border-yellow-600 border text-yellow-600 my-1 hover:bg-yellow-600 hover:text-white hover:transition-all hover:delay-50" @click="getReports">Search</button>
            </div>
        </div>
        <section v-if="this.reports.length > 0" class="m-1 mt-3 px-5 flex flex-col">
            <table class="table">
                <thead>
                    <tr class="flex justify-between border-b border-slate-500 text-sm">
                        <th class=" w-1/12 text-sm mx-1">Created At</th>
                        <th class=" w-1/12 text-sm mx-1">Miner Name</th>
                        <th class=" w-1/12 text-sm mx-1">Display ID</th>
                        <th class=" w-[5%] text-sm mx-1">Alert ID</th>
                        <th class=" w-1/12 text-sm mx-1">Customer ID</th>
                        <th class=" w-1/12 text-sm mx-1">Customer Name</th>
                        <th class=" w-[5%] text-sm mx-1">Label</th>
                        <th class=" w-1/12 text-sm mx-1">SAR Probability</th>
                        <th class=" w-1/12 text-sm mx-1">Type 1</th>
                        <th class=" w-1/12 text-sm mx-1">Type 2</th>
                        <th class=" w-[5%] text-sm mx-1">Filter</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in this.reports" class="flex justify-between truncate border-b border-slate-500 text-sm" :key="report.runId">
                        <td class=" w-1/12 text-sm mx-1">{{ formatDateTime(report.createdAt) }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.minerName }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.displayId }}</td>
                        <td class=" w-[5%] text-sm mx-1 truncate">{{ report.alertId }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.customerId }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.customerName }}</td>
                        <td class=" w-[5%] text-sm mx-1 truncate">{{ report.label }}</td>
                        <td class=" w-1/12 text-sm truncate mx-1">{{ report.probabilityOfSar }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.type1 }}</td>
                        <td class=" w-1/12 text-sm mx-1">{{ report.type2 }}</td>
                        <td class=" w-[5%]text-sm mx-1"><button><button class=" bg-white p-1 border-yellow-600 border text-yellow-600 my-1 hover:bg-yellow-600 hover:text-white hover:transition-all hover:delay-50" @click="getReports">Filter</button></button></td>
                    </tr>
                </tbody>
            </table>
        </section>
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
            reports: [],
            dateEnd: ref(''),
            dateStart: ref(''),
            timeStart: ref('00:00'),
            timeEnd: ref('23:59'),
            sarMax: ref(''),
            sarMin: ref(''),
            minersName: ref([]),
            displayId: ref(''),
            label: ref(''),
            selectMiner: false,
            buttonText: 'Select',
            count: ref(0),
            numberPage: ref(0),
        }
    },
    created(){
        const currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        let day = currentDate.getDate().toString().padStart(2, '0')
        this.dateEnd = `${year}-${month}-${day}`
        const yesterdayDate = new Date(currentDate);
        yesterdayDate.setDate(currentDate.getDate() - 1);
        year = yesterdayDate.getFullYear();
        month = (yesterdayDate.getMonth() + 1).toString().padStart(2, '0');
        day = yesterdayDate.getDate().toString().padStart(2, '0');
        this.dateStart = `${year}-${month}-${day}`
    },
    async mounted () {
        try {
            const res = await BacklogReportDataServices.getBacklogMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
        } catch (error) {
            console.error(error)
        }
    }, 
    methods: {
        openMiners () {
            if(document.body.classList.contains('overflow-hidden')){
                document.body.classList.remove('overflow-hidden')
            }else{
                document.body.classList.add('overflow-hidden')
            }
            this.selectMiner = !this.selectMiner
        },
        async getReports(){
            try {
                if(this.minersName.length == 0){
                    this.minersName = null
                }
                let data = JSON.stringify({
                    "displayId": this.displayId,
                    "endDate": this.dateEnd,
                    "endTime": this.timeEnd,
                    "excelMultiple": 0,
                    "label": this.label,
                    "minerNames": this.minersName,
                    "page": 0,
                    "probabilityOfSarMax": this.sarMax || null,
                    "probabilityOfSarMin": this.sarMin || null,
                    "startDate": this.dateStart,
                    "startTime": this.timeStart
                })
                const res = await BacklogReportDataServices.getBacklogResult(data, this.store.token)
                this.reports = JSON.parse(JSON.stringify(res.data.item1))
                this.count = JSON.parse(JSON.stringify(res.data.item2))
                this.numberPage = Math.ceil(this.count / 10)

                if(this.minersName == null){
                    this.minersName = []
                }
                console.log(this.reports)
            } catch (error) {
                console.error(error)
            }
        },
        formatDateTime (isoDate) {
            if (isoDate) {
                const date = new Date(isoDate);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${day}/${month}/${year}, ${hours}:${minutes}`;
            } else {
                return ''
            }
        }
    },
}
</script>