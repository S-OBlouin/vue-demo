<template>
    <div class="flex flex-row h-screen flex-grow bg-gray-300">
        <div v-if="crmOpen" class="  w-full h-full fixed flex justify-center p-0 ">
            <div class="bg-gray-600/50 z-30 relative flex justify-center flex-grow">
                <div class=" bg-white h-fit w-60 z-50 top-5 left-[34rem] absolute rounded">
                    <div class="flex justify-between bg-slate-100">
                        <p class=" font-semibold p-2 rounded">Add CRM Features</p>
                        <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer" @click="closeCRM">close</span>
                    </div>
                    <div class="max-h-72 overflow-y-auto">
                        <div v-for="feature in this.features" class="border p-2">
                            <label class="flex justify-between">
                                <span class="ml-1 overflow-x-hidden">{{ feature.crmName }}</span>
                                <input type="checkbox" name="features" :value="feature.crmName" v-model="selectedFeatures">
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center justify-center my-1">
                        <button @click="addFeatures" class="px-1 py-0.5 m-1 bg-orange-400 rounded">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col bg-white w-1/6 rounded shadow max-h-72 m-6">
            <p class="bg-slate-100 font-semibold p-2 rounded">Select Miner</p>
            <div class="max-h-52 overflow-y-auto">
                <div v-for="miner in miners" class="border p-2">
                    <label class="flex justify-between">
                        <span class="ml-1 overflow-x-hidden">{{ miner.name }}</span>
                        <input type="radio" :value="miner" v-model="selectedMiner" class="mr-1">
                    </label>
                </div>
            </div>
            <div class="flex items-center justify-center ">
                <button @click="showFeatures" class="px-1 py-0.5 m-1 bg-orange-400 rounded">Select</button>
            </div>
        </div>
        <div>
            
        </div>
        <div v-if="this.showFeature" class="flex flex-col bg-white w-1/6 rounded shadow max-h-72 mx-3 my-6">
            <div class="flex bg-slate-100 p-2 justify-center items-center">
                <button class="px-1 py-0.5 m-1 bg-orange-400 rounded" @click="showCRM">CRM Features</button>
                <button class="px-1 py-0.5 m-1 bg-orange-400 rounded">TRX Features</button>
            </div>
            <div class="max-h-52 overflow-y-auto min-h-[11rem]">
                <div v-for="feature in this.crmfeature" class="border p-2">
                    <label class="flex justify-between">
                        <span class="ml-1 overflow-x-hidden">{{ feature }}</span>
                        <input type="checkbox" name="feature" :id=feature :value="feature" v-model="checkedFeature">
                    </label>
                </div>
            </div>
            <div class="flex items-center justify-center ">
                <button @click="delFeature" class="px-1 py-0.5 m-1 bg-orange-400 rounded">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
import MinerDataServices from '@/services/MinerDataServices.js'
import { useUserStore } from '@/stores/UserStore';
export default {
    setup () {
        const store = useUserStore()

        return { store }
    },
    name: 'SuspectMinerTraining',
    data () {
        return {
            miners: [],
            features: [],
            crmfeature: [],
            selectedMiner: "",
            selectedFeatures: [],
            checkedFeature: [],
            statuses: [],
            showFeature: false,
            crmOpen: false,
        }
    },
    async mounted () {
        try {
            const res = await MinerDataServices.getMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        async showFeatures () {
            const res = await MinerDataServices.getStatuses(this.store.token)
            this.statuses = JSON.parse(JSON.stringify(res.data))
            this.crmfeature = []
            const feature = this.selectedMiner.crmFeatures.split(',')
            feature.forEach(element => {
                element = element.replaceAll(/['"]+/g, '')
                element = element.replaceAll(/\[/g, '')
                element = element.replaceAll(/\]/g, '')
                this.crmfeature.push(element)
            });
            this.showFeature = true
            console.log(this.statuses)
        },
        async showCRM(){
            const res2 = await MinerDataServices.getFeatures(this.store.token)
            this.features = JSON.parse(JSON.stringify(res2.data))
            this.crmOpen = !this.crmOpen
        },
        closeCRM(){
            this.crmOpen = !this.crmOpen
        },
        addFeatures(){
            this.selectedFeatures.forEach(e =>{
                if(this.crmfeature.includes(e)){

                } else {
                    this.crmfeature.push(e)
                }
            })
            this.crmOpen = !this.crmOpen
        },
        delFeature(){
            this.crmfeature = this.crmfeature.filter((e) => {
                return !this.checkedFeature.includes(e)
            })
            this.checkedFeature = []
        }
    }
}
</script>