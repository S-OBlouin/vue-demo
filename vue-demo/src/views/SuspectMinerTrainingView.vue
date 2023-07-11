<template>
    <div class="flex flex-row h-screen flex-grow bg-gray-300 p-6">
        <div class="flex flex-col bg-white w-1/6 rounded shadow max-h-72 mx-3">
            <p class="bg-slate-100 font-semibold p-2 rounded">Select Miner</p>
            <div class="max-h-52 overflow-y-scroll">
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
        <div v-if="this.showFeature" class="flex flex-col bg-white w-1/6 rounded shadow max-h-72 mx-3">
            <div v-for="feature in this.selectedMiner.crmFeatures">
                <label>
                    <span>{{ }}</span>
                    <input type="checkbox" name="feature" :id=feature>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import MinerDataServices from '@/services/MinerDataServices.js'
import { useUserStore } from '@/stores/UserStore';
export default {
    setup(){
        const store = useUserStore()

        return { store }
    },
    name: 'SuspectMinerTraining',
    data () {
        return {
            miners: [],
            features: [],
            feature: [],
            selectedMiner: "",
            selectedFeatures: [],
            showFeature: false,
        }
    },
    async mounted(){
        try {
            const res = await MinerDataServices.getMiners(this.store.token)
            const res2 = await MinerDataServices.getMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
            this.features = JSON.parse(JSON.stringify(res2.data))
        } catch (error) {
            console.error(error)
        }
    },
    methods:{
        showFeatures(){
            this.feature = this.selectedMiner.crmFeatures.replaceAll(/\"+/gm, '')
            this.feature = this.selectedMiner.crmFeatures.split(',')
            this.feature.forEach(element => {
                console.log(element)
                element.replaceAll(/\"+/gm, '')
                console.log(element)
            });
            console.log(this.feature)
        }
    }
}
</script>