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
        <div v-if="openFilter" class="w-full h-full fixed flex justify-center p-0">
            <div class="bg-gray-600/50 z-30 fixed h-full w-full"></div>
            <div class=" bg-white h-fit z-50 absolute mx-auto mt-5 rounded p-1">
                <div class="flex justify-between bg-slate-100 px-1 pt-1">
                    <p class=" font-semibold p-2 rounded">Filters</p>
                    <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer"
                        @click="openDialogFilter">close</span>
                </div>
                <div class=" max-h-96 max-w-prose overflow-auto p-2 overflow-y-auto">
                    <p class=" break-words">{{ filter }}</p>
                </div>
                <div v-if="this.errorId" class="flex flex-col items-center justify-center my-1">
                    <Transition>
                        <p v-if="alertMessage" class=" text-green-600 font-semibold">{{ alertMessage }}</p>
                    </Transition>
                    <button @click="copyToClipboard" class="px-1 py-0.5 m-1 bg-orange-400 rounded">Copy Error ID</button>
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
                <label class="mb-2" :class="selectMiner || openFilter ? '' : 'relative'" @click="openMiners">
                    <input type="text" placeholder="Miner Name" class="w-48 bg-gray-300 border-b border-black rounded-t focus:bg-white focus:transition-colors focus:ease-in focus:outline-none focus:ring-0 placeholder:text-gray-800 truncate pr-8" v-model="minersName" disabled ><span v-if="!selectMiner && !openFilter" class="material-symbols-outlined absolute right-0.5">expand_more</span>
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
                <button class=" text-lg bg-white p-1 border-yellow-600 border text-yellow-600 mx-3 my-1 hover:bg-yellow-600 hover:text-white hover:transition-all hover:delay-50" @click="reset">Reset</button>
            </div>
        </div>
        <section v-if="this.reports.length > 0" class="m-1 mt-3 px-5 flex flex-col">

            <!-- <div class="text-center text-sm">
                <div class=" grid grid-cols-11 mb-2 justify-center gap-2 font-semibold border-b border-slate-500">
                    <div class="flex justify-center group"><p>Created At</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Miner Name</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Display ID</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Alert ID</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Customer ID</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Customer Name</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Label</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>SAR Probability</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Type 1</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div class="flex justify-center group"><p>Type 2</p><span class="material-symbols-outlined invisible group-hover:visible">expand_more</span></div>
                    <div><p>Filter</p></div>
                </div>
                <div v-for="report in this.reports" class=" grid grid-cols-11 gap-2 border-b border-slate-500">
                    <div>{{ formatDateTime(report.createdAt) }}</div>
                    <div>{{ report.minerName }}</div>
                    <div>{{ report.displayId }}</div>
                    <div>{{ report.alertId }}</div>
                    <div>{{ report.customerId }}</div>
                    <div>{{ report.customerName }}</div>
                    <div>{{ report.label }}</div>
                    <div class="truncate">{{ report.probabilityOfSar }}</div>
                    <div>{{ report.type1 }}</div>
                    <div>{{ report.type2 }}</div>
                    <div><button class=" bg-white p-1 border-yellow-600 border text-yellow-600 my-1 hover:bg-yellow-600 hover:text-white hover:transition-all hover:delay-50" @click="openDialogFilter($event)" :data-filter=" report.filters">Show Filter</button></div>
                </div>
            </div>
            <div class="flex flex-row-reverse text-sm mt-2">
                <div class="flex">
                    <p class="flex items-center">Page {{ this.page + 1 }} of {{ this.numberPage }}</p>
                    <div class=" flex">
                        <span class="material-symbols-outlined text-lg font-bold cursor-pointer"
                            @click="goBack">chevron_left</span>
                        <span v-if="page + 1 < numberPage"
                            class="material-symbols-outlined text-lg font-bold cursor-pointer"
                            @click="goForward">chevron_right</span>
                    </div>
                </div>
                <div class=" mr-5 mt-1">
                    <p>{{ count }} Item(s)</p>
                </div>
            </div> -->
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
            page: ref(0),
            openFilter: false,
            filter:ref(''),
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
        },
        async goBack () {
            try {
                if(this.minersName.length == 0){
                    this.minersName = null
                }
                if (this.page > 0) {
                    this.page = this.page - 1
                    let data = JSON.stringify({
                    "displayId": this.displayId,
                    "endDate": this.dateEnd,
                    "endTime": this.timeEnd,
                    "excelMultiple": 0,
                    "label": this.label,
                    "minerNames": this.minersName,
                    "page": this.page,
                    "probabilityOfSarMax": this.sarMax || null,
                    "probabilityOfSarMin": this.sarMin || null,
                    "startDate": this.dateStart,
                    "startTime": this.timeStart
                    })
                    const res = await BacklogReportDataServices.getBacklogResult(data, this.store.token)
                    this.reports = JSON.parse(JSON.stringify(res.data.item1))
                }
                if(this.minersName == null){
                    this.minersName = []
                }
            } catch (error) {
                console.error(error)
            }
        },
        async goForward () {
            try {
                if(this.minersName.length == 0){
                    this.minersName = null
                }
                if (this.numberPage > this.page + 1) {
                this.page = this.page + 1
                let data = JSON.stringify({
                    "displayId": this.displayId,
                    "endDate": this.dateEnd,
                    "endTime": this.timeEnd,
                    "excelMultiple": 0,
                    "label": this.label,
                    "minerNames": this.minersName,
                    "page": this.page,
                    "probabilityOfSarMax": this.sarMax || null,
                    "probabilityOfSarMin": this.sarMin || null,
                    "startDate": this.dateStart,
                    "startTime": this.timeStart
                    })
                    const res = await BacklogReportDataServices.getBacklogResult(data, this.store.token)
                    this.reports = JSON.parse(JSON.stringify(res.data.item1))
                }
                if(this.minersName == null){
                    this.minersName = []
                }
            } catch (error) {
                console.error(error)
            }
        },
        openDialogFilter(event){
            if(document.body.classList.contains('overflow-hidden')){
                document.body.classList.remove('overflow-hidden')
            }else{
                document.body.classList.add('overflow-hidden')
            }
            if(this.filter.length == 0){
                this.filter = event.originalTarget.dataset.filter
            } else {
                this.filter = ''
            }
            this.openFilter = !this.openFilter
        },
        reset(){
            this.reports = []
            this.timeStart = '00:00'
            this.timeEnd = '23:59'
            this.sarMax = ''
            this.sarMin = ''
            this.minersName = []
            this.displayId = ''
            this.label = ''
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
        }
    },
}
</script>