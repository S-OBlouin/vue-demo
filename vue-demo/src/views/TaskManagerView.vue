<template>
    <main class="h-screen flex flex-grow flex-col">
        <div v-if="selectMiner" class="w-full h-full fixed flex justify-center p-0 justify-items-center">
            <div class="bg-gray-600/50 z-30 relative flex justify-center flex-grow">
                <div class=" bg-white h-fit w-60 z-50 top-5 right-1/2 absolute rounded">
                    <div class="flex justify-between bg-slate-100">
                        <p class=" font-semibold p-2 rounded">Select Miners</p>
                        <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer"
                            @click="openMiners">close</span>
                    </div>
                    <div class="max-h-72 overflow-y-auto">
                        <div v-for="miner in this.miners" :key="miner.id" class="border p-2">
                            <label class="flex justify-between">
                                <span class="ml-1 overflow-x-hidden">{{ miner.name }}</span>
                                <input type="checkbox" name="miners" :value="miner.name" v-model="selectedMiners" checked>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center justify-center my-1">
                        <button @click="checked" class="px-1 py-0.5 m-1 bg-orange-400 rounded">{{ buttonText }}</button>
                    </div>
                </div>
            </div>
        </div>
        <header class="flex flex-row justify-between h-fit mt-2 mx-2">
            <div class="flex flex-row">
                <label>
                    <input type="text" v-model="username" class=" mx-1 my-1 p-0.5 border-black border-b"
                        placeholder="Username">
                </label>
                <label class="relative" @click="openMiners">
                    <input type="text" v-model="selectedMiners"
                        class=" mx-1 my-1 p-0.5 pr-5 border-black border-b truncate pointer-events-none" disabled>
                    <span class="material-symbols-outlined absolute p-0.5 top-1 right-0.5">expand_more</span>
                </label>
                <div v-if="error" class="flex items-center ml-2">
                    <p class=" text-red-600 text-lg font-bold">{{ errorMessage }}</p>
                </div>
            </div>
            <div>
                <button
                    class=" bg-white p-1 border-yellow-600 border text-yellow-600 mx-3 my-1 hover:bg-yellow-600 hover:text-white hover:transition-all hover:delay-50"
                    @click="refresh">Refresh</button>
            </div>
        </header>
        <section class="m-1 px-10 flex flex-col">
            <table class=" table-fixed text-center">
                <thead>
                    <tr class="flex justify-around border-b border-slate-500 text-sm">
                        <th class=" w-1/12">Status</th>
                        <th class=" w-1/6">Miner Name</th>
                        <th class=" w-1/12 truncate">User</th>
                        <th class=" w-1/6 truncate">Miner Type</th>
                        <th class=" w-1/12 truncate">Error ID</th>
                        <th class=" w-1/6 truncate">Run Start</th>
                        <th class=" w-1/6 truncate">Run End</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in this.activities"
                        class="flex justify-around truncate border-b border-slate-500 text-sm" :key="activity.runId">
                        <td class=" w-1/12 truncate px-1 py-1">{{ activity.status }}</td>
                        <td class=" w-1/6 truncate px-1 py-1">{{ activity.miner?.name || activity.linkMiner?.name }}</td>
                        <td class=" w-1/12 truncate px-1 py-1">{{ activity.username }}</td>
                        <td class=" w-1/6 truncate px-1 py-1">{{ activity.moduleType }}</td>
                        <td class=" w-1/12 max-w-prose truncate px-1 py-1">{{ activity.errorDescription || '' }}</td>
                        <td class=" w-1/6 truncate px-1 py-1">{{ formatDateTime(activity.startDate) }}</td>
                        <td class=" w-1/6 truncate px-1 py-1">{{ formatDateTime(activity.endDate) }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex flex-row-reverse">
                <div class="flex">
                    <p>Page </p> <span class="material-symbols-outlined text-lg font-bold cursor-pointer"
                        @click="goBack">chevron_left</span><span>{{
                            this.page + 1 }} </span><span class="material-symbols-outlined text-lg font-bold cursor-pointer"
                        @click="goForward">chevron_right</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import MinerDataServices from '@/services/MinerDataServices.js'
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';
export default {
    name: 'TaskManagerView',
    setup () {
        const store = useUserStore()

        return { store }
    },
    data () {
        return {
            miners: [],
            statusList: [],
            minersId: [],
            activities: [],
            page: ref(0),
            date: ref(null),
            username: ref(''),
            selectedMiners: [],
            numberPage: 0,
            selectMiner: false,
            buttonText: 'Deselect All',
            errorMessage: '',
            error: false,
        }
    },
    async created () {
        try {
            const status = await MinerDataServices.getStatusList(this.store.token)
            this.statusList = JSON.parse(JSON.stringify(status.data))
            const response = await MinerDataServices.getMinerList(this.store.token)
            this.miners = JSON.parse(JSON.stringify(response.data))
            this.miners.forEach(miner => {
                this.minersId.push(miner.id)
                this.selectedMiners.push(miner.name)
            })
            if (this.minersId) {
                let data = JSON.stringify({
                    "page": 0,
                    "username": "",
                    "miners": this.minersId,
                    "date": null
                });
                const res = await MinerDataServices.getActivities(data, this.store.token)
                this.activities = JSON.parse(JSON.stringify(res.data.data))
                this.count = JSON.parse(JSON.stringify(res.data.count))
                this.numberPage = Math.ceil(this.count / 20)
                this.activities.forEach(activity => {
                    if (activity.status == 0) {
                        activity.status = this.statusList[0].name
                    } else if (activity.status == 1) {
                        activity.status = this.statusList[1].name
                    } else if (activity.status == 2) {
                        activity.status = this.statusList[2].name
                    } else if (activity.status == 3) {
                        activity.status = this.statusList[3].name
                    } else if (activity.status == 4) {
                        activity.status = this.statusList[4].name
                    }
                })
                console.log(this.activities)
            }
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        openMiners () {
            this.selectMiner = !this.selectMiner
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
        checked () {
            if (this.buttonText == 'Deselect All') {
                this.selectedMiners = []
                this.buttonText = 'Select All'
            } else {
                this.buttonText = 'Deselect All'
                this.miners.forEach(miner => {
                    this.selectedMiners.push(miner.name)
                });
            }
        },
        async goBack () {
            if (this.page > 0) {
                this.page = this.page - 1
                let data = JSON.stringify({
                    "page": this.page,
                    "username": this.username,
                    "miners": this.minersId,
                    "date": this.date
                });
                const res = await MinerDataServices.getActivities(data, this.store.token)
                this.activities = JSON.parse(JSON.stringify(res.data.data))
                this.activities.forEach(activity => {
                    if (activity.status == 0) {
                        activity.status = this.statusList[0].name
                    } else if (activity.status == 1) {
                        activity.status = this.statusList[1].name
                    } else if (activity.status == 2) {
                        activity.status = this.statusList[2].name
                    } else if (activity.status == 3) {
                        activity.status = this.statusList[3].name
                    } else if (activity.status == 4) {
                        activity.status = this.statusList[4].name
                    }
                })
            }
        },
        async goForward () {
            if (this.numberPage > this.page + 1) {
                this.page = this.page + 1
                let data = JSON.stringify({
                    "page": this.page,
                    "username": this.username,
                    "miners": this.minersId,
                    "date": this.date
                });
                const res = await MinerDataServices.getActivities(data, this.store.token)
                this.activities = JSON.parse(JSON.stringify(res.data.data))
                this.activities.forEach(activity => {
                    if (activity.status == 0) {
                        activity.status = this.statusList[0].name
                    } else if (activity.status == 1) {
                        activity.status = this.statusList[1].name
                    } else if (activity.status == 2) {
                        activity.status = this.statusList[2].name
                    } else if (activity.status == 3) {
                        activity.status = this.statusList[3].name
                    } else if (activity.status == 4) {
                        activity.status = this.statusList[4].name
                    }
                })
            }
        },
        async refresh () {
            try {
                this.minersId = []
                this.page = 0
                const selminers = this.miners.filter((m) => this.selectedMiners.includes(m.name))
                selminers.forEach((e) => {
                    this.minersId.push(e.id)
                })
                let data = JSON.stringify({
                    "page": this.page,
                    "username": this.username,
                    "miners": this.minersId,
                    "date": this.date
                });
                const res = await MinerDataServices.getActivities(data, this.store.token)
                this.activities = JSON.parse(JSON.stringify(res.data.data))
                this.count = JSON.parse(JSON.stringify(res.data.count))
                this.numberPage = Math.ceil(this.count / 20)
                console.log(this.numberPage)
                if (this.activities.length == 0) {
                    this.error = true
                    this.errorMessage = 'No data was found'
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>