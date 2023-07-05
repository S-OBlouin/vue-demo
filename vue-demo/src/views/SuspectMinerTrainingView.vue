<template>
    <div class="flex flex-col h-screen flex-grow bg-gray-300 p-6">
        <div>
            <div class="flex flex-col bg-white w-1/6 rounded shadow">
                <p class="bg-slate-100 font-semibold p-2 rounded">Select Miner</p>
                <div v-for="miner in miners" class="border p-2">
                    <label class="flex justify-between">
                        <span class="ml-1">{{ miner }}</span>
                        <input type="radio" :value="miner" v-model="selectedMiner" class="mr-1">
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SuspectMinerTraining',
    data () {
        return {
            miners: ['Miner 1', 'Miner 2', 'Minnnnneeeerrrrr'],
            selectedMiner: ""
        }
    }
}
</script>