<template>
    <div class="flex flex-row flex-grow">
        <div v-if="crmOpen" class="  w-full h-full fixed flex justify-center p-0 justify-items-center">
            <div class="bg-gray-600/50 z-30 relative flex justify-center flex-grow">
                <div class=" bg-white h-fit w-60 z-50 top-5 absolute rounded">
                    <div class="flex justify-between bg-slate-100">
                        <p class=" font-semibold p-2 rounded">Add CRM Features</p>
                        <span class="material-symbols-outlined rounded p-1 flex items-center cursor-pointer"
                            @click="closeCRM">close</span>
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
                <button @click="showFeatures(); showSettings();"
                    class="px-1 py-0.5 m-1 bg-orange-400 rounded">Select</button>
            </div>
        </div>
        <div v-if="this.showFeature">
            <div class="flex flex-col bg-white min-w-[24rem] rounded shadow max-h-72 m-6">
                <p class="bg-slate-100 font-semibold p-2 rounded">Status</p>
                <div class="max-h-64">
                    <div v-for="status in this.statuses.statuses" :key="status" class="border p-2 flex justify-between">
                        <label class="flex justify-between">
                            <span class="ml-1 overflow-x-hidden">{{ status }}</span>
                        </label>
                        <div v-if="status == '2'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SAR2" :v-model="selectedStatus"
                                    :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.Clear2" :v-model="selectedStatus"
                                    :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.Unknown2"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <div v-if="status == '4'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SAR4" :v-model="selectedStatus"
                                    :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.Clear4" :v-model="selectedStatus"
                                    :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.Unknown4"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <div v-if="status == '6'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SAR6" :v-model="selectedStatus"
                                    :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.Clear6" :v-model="selectedStatus"
                                    :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.Unknown6"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <div v-if="status == '9'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SAR9" :v-model="selectedStatus"
                                    :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.Clear9" :v-model="selectedStatus"
                                    :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.Unknown9"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <div v-if="status == 'RED'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SARRED" :v-model="selectedStatus"
                                    :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.ClearRED"
                                    :v-model="selectedStatus" :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.UnknownRED"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <div v-if="status == 'TAMAMLANDI'">
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR.SARTAMAMLANDI"
                                    :v-model="selectedStatus" :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear.ClearTAMAMLANDI"
                                    :v-model="selectedStatus" :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown.UnknownTAMAMLANDI"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div>
                        <!-- <div>
                            <label class="mr-2">
                                <span>SAR</span>
                                <input type="radio" :name="status" :checked="checkedSAR[`SAR + ${status}`]"
                                    :v-model="selectedStatus" :value="1">
                            </label>
                            <label class="mr-2">
                                <span>Clear</span>
                                <input type="radio" :name="status" :checked="checkedClear[`Clear + ${status}`]"
                                    :v-model="selectedStatus" :value="2">
                            </label>
                            <label class="mr-2">
                                <span>Unknown</span>
                                <input type="radio" :name="status" :checked="checkedUnknown[`Unknown + ${status}`]"
                                    :v-model="selectedStatus" :value="3">
                            </label>
                        </div> -->
                    </div>
                </div>
            </div>
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
            <div class="flex items-end justify-center ">
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
            selectedStatus: [],
            checkedStatus: [],
            checkedSAR: {
                SAR2: false,
                SAR4: false,
                SAR6: false,
                SAR9: false,
                SARRED: false,
                SARTAMAMLANDI: false,
            },
            checkedClear: {
                Clear2: false,
                Clear4: false,
                Clear6: false,
                Clear9: false,
                ClearRED: false,
                ClearTAMAMLANDI: false,
            },
            checkedUnknown: {
                Unknown2: false,
                Unknown4: false,
                Unknown6: false,
                Unknown9: false,
                UnknownRED: false,
                UnknownTAMAMLANDI: false,
            },
            showFeature: false,
            crmOpen: false,
        }
    },
    async mounted () {
        try {
            const res = await MinerDataServices.getMiners(this.store.token)
            this.miners = JSON.parse(JSON.stringify(res.data))
            this.miners = this.miners.filter(miner => miner.statuses !== null && miner.name != 'Sanction Matcher')
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        async showFeatures () {
            this.crmfeature = []
            const feature = this.selectedMiner.crmFeatures.split(',')
            feature.forEach(element => {
                element = element.replaceAll(/['"]+/g, '')
                element = element.replaceAll(/\[/g, '')
                element = element.replaceAll(/\]/g, '')
                this.crmfeature.push(element)
            });
            this.showFeature = true
        },
        async showSettings () {
            this.checkedSAR = [{
                SAR2: false,
                SAR4: false,
                SAR6: false,
                SAR9: false,
                SARRED: false,
                SARTAMAMLANDI: false,
            }],
                this.checkedClear = {
                    Clear2: false,
                    Clear4: false,
                    Clear6: false,
                    Clear9: false,
                    ClearRED: false,
                    ClearTAMAMLANDI: false,
                },
                this.checkedUnknown = {
                    Unknown2: false,
                    Unknown4: false,
                    Unknown6: false,
                    Unknown9: false,
                    UnknownRED: false,
                    UnknownTAMAMLANDI: false,
                }
            const res = await MinerDataServices.getStatuses(this.store.token)
            this.statuses = JSON.parse(JSON.stringify(res.data))
            const status = this.selectedMiner.statuses.split(',')
            status.forEach(element => {
                element = element.replaceAll(/['"]+/g, '')
                element = element.replaceAll(/\{/g, '')
                element = element.replaceAll(/\}/g, '')
                this.checkedStatus.push(element)
            });
            this.checkedStatus.forEach(e => {
                if (e.includes('2')) {
                    if (e.includes('0')) {
                        this.checkedClear.Clear2 = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SAR2 = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.Unknown2 = true
                    }
                }
                if (e.includes('4')) {
                    if (e.includes('0')) {
                        this.checkedClear.Clear4 = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SAR4 = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.Unknown4 = true
                    }
                }
                if (e.includes('6')) {
                    if (e.includes('0')) {
                        this.checkedClear.Clear6 = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SAR6 = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.Unknown6 = true
                    }
                }
                if (e.includes('9')) {
                    if (e.includes('0')) {
                        this.checkedClear.Clear9 = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SAR9 = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.Unknown9 = true
                    }
                }
                if (e.includes('RED')) {
                    if (e.includes('0')) {
                        this.checkedClear.ClearRed = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SARRed = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.UnknownRED = true
                    }
                }
                if (e.includes('TAMAMLANDI')) {
                    if (e.includes('0')) {
                        this.checkedClear.ClearTAMAMLANDI = true
                    } else if (e.includes('1')) {
                        this.checkedSAR.SARTAMAMLANDI = true
                    } else if (e.includes('3')) {
                        this.checkedUnknown.UnknownTAMAMLANDI = true
                    }
                }
            })
        },
        async showCRM () {
            const res2 = await MinerDataServices.getFeatures(this.store.token)
            this.features = JSON.parse(JSON.stringify(res2.data))
            this.crmOpen = !this.crmOpen
        },
        closeCRM () {
            this.crmOpen = !this.crmOpen
        },
        addFeatures () {
            this.selectedFeatures.forEach(e => {
                if (this.crmfeature.includes(e)) {

                } else {
                    this.crmfeature.push(e)
                }
            })
            this.crmOpen = !this.crmOpen
        },
        delFeature () {
            this.crmfeature = this.crmfeature.filter((e) => {
                return !this.checkedFeature.includes(e)
            })
            this.checkedFeature = []
        }
    }
}
</script>