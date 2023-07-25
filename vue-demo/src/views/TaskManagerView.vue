<template>
    <main class="h-screen flex flex-grow">
        <div v-if="selectMiner" class="  w-full h-full fixed flex justify-center p-0 justify-items-center">
            <div class="bg-gray-600/50 z-30 relative flex justify-center flex-grow">
                <div class=" bg-white h-fit w-60 z-50 top-5 absolute rounded">
                    <div class="flex justify-between bg-slate-100">
                        <p class=" font-semibold p-2 rounded">Select Miners</p>
                        <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer"
                            @click="openMiners">close</span>
                    </div>
                    <div class="max-h-72 overflow-y-auto">
                        <div v-for="miner in this.miners" class="border p-2">
                            <label class="flex justify-between">
                                <span class="ml-1 overflow-x-hidden">{{ miner.name }}</span>
                                <input type="checkbox" name="miners" :value="miner.name" v-model="selectedMiners" checked>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center justify-center my-1">
                        <button @click="checked" class="px-1 py-0.5 m-1 bg-orange-400 rounded">{{buttonText}}</button>
                    </div>
                </div>
            </div>
        </div>
        <header class="flex flex-row justify-between w-full h-fit mt-2 mx-2">
            <div class="flex flex-row">
                <label>
                    <input type="text" v-model="username" class=" mx-1 my-1 p-0.5 border-black border-b" placeholder="Username">
                </label>
                <label class="relative" @click="openMiners">
                    <input type="text" v-model="selectedMiners" :class="selectMiner ? 'disabled' : ''" class=" mx-1 my-1 p-0.5 pr-5 border-black border-b truncate ">
                    <span class="material-symbols-outlined absolute p-0.5 top-1 right-0.5">expand_more</span>
                </label>
            </div>
            <div>
                <button class=" bg-white p-1 border-yellow-500 border text-yellow-500 mx-3 my-1 hover:bg-yellow-500 hover:text-white hover:transition-all hover:delay-50">Refresh</button>
            </div>
        </header>
    </main>
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
            minersId: [],
            activities: [],
            page: 0,
            username: '',
            selectedMiners: [],
            selectMiner: false,
            buttonText: 'Deselect All',
        }
    },
    async mounted () {
        try {
            const response = await MinerDataServices.getMinerList(this.store.token)
            this.miners = JSON.parse(JSON.stringify(response.data))
            this.miners.forEach(miner => {
                const minerId = miner.id
                const minerName = miner.name
                this.minersId.push(minerId)
                this.selectedMiners.push(minerName)
            })
            console.log(this.miners)
            if (this.minersId) {
                let data = JSON.stringify({
                "page": 0,
                "username": "",
                "miners": this.minersId,
                "date": null
                });
                const res = await MinerDataServices.getActivities(data, this.store.token)
                this.activities = JSON.parse(JSON.stringify(res.data))
                console.log(this.activities)
            }
            } catch (error) {
                console.log(error)
            }
    },
    methods: {
        openMiners(){
            this.selectMiner = !this.selectMiner
        }
    }
}
</script>