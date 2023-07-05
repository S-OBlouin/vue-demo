<template>
    <nav class="flex flex-col bg-yellow-500 px-2 pt-2 transition-all delay-100 " :class="isOpen ? 'w-56 ' : 'w-32'">
        <div class="flex justify-center items-center">
            <router-link to="/" @click="this.userStore.pageName = 'Home'"><img src="@/assets/img/icon.png" alt="Home Icon"
                    class=" h-14 ml-2" /></router-link>
        </div>
        <div class="flex flex-row justify-between">
            <p class="px-4 py-3 mt-3 font-semibold">Menu</p>
            <p class="material-symbols-outlined pr-2 py-3 mt-3 cursor-pointer" @click="closeMenu">menu</p>
        </div>
        <div v-for="button in buttonVisibility">
            <div v-if="button.number == 1" class=" px-4 py-3 mt-4 flex"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <span @mouseenter="hoverName(button)" @mouseleave="closeHover"
                    class="material-symbols-outlined justify-center items-center mr-1"
                    :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">group</span>
                <router-link to="#"
                    :class="isOpen ? '' : ' hidden rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">{{
                        button.name }}</router-link>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
            </div>
            <div v-if="button.number == 2" @click="openSubMenu(button)" :key="button.number" class="px-4 py-3 mt-4 flex "
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span @mouseenter="hoverName(button)" @mouseleave="closeHover" class="material-symbols-outlined mr-1"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">menu_book</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                    <p
                        :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                        {{
                            button.name }}
                    </p>
                </div>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 2">
                <div v-if="button.number === 3" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 4" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 5" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
            <div v-if="button.number == 6" @click="openSubMenu(button)" :key="button.number"
                class="px-4 py-3 mt-4 flex relative group"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span @mouseenter="hoverName(button)" @mouseleave="closeHover" class="material-symbols-outlined mr-1"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">domino_mask</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                    <p
                        :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                        {{
                            button.name }}
                    </p>
                </div>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 6">
                <div v-if="button.number === 7" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="/suspect-miner/training" @click="this.userStore.pageName = button.name"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 8" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 9" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 10" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
            <div v-if="button.number == 11" @click="openSubMenu(button)" :key="button.number" class="px-4 py-3 mt-4 flex "
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span @mouseenter="hoverName(button)" @mouseleave="closeHover" class="material-symbols-outlined mr-1"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">link</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                </div>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 11">
                <div v-if="button.number === 12" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
            <div v-if="button.number == 13" class=" px-4 py-3 mt-4 flex"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <span @mouseenter="hoverName(button)" @mouseleave="closeHover" class="material-symbols-outlined mr-1"
                    :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">task</span>
                <router-link to="#" :class="isOpen ? '' : ' hidden truncate'">{{
                    button.name }}</router-link>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
            </div>
            <div v-if="button.number == 14" class=" px-4 py-3 mt-4 flex"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <span @mouseenter="hoverName(button)" @mouseleave="closeHover" class="material-symbols-outlined mr-1"
                    :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">book</span>
                <router-link to="#" :class="isOpen ? '' : 'hidden truncate'">{{
                    button.name }}</router-link>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
            </div>
            <div v-if="button.number == 15" @click="openSubMenu(button)" :key="button.number" class="px-4 py-3 mt-4 flex "
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span class="material-symbols-outlined mr-1" @mouseenter="hoverName(button)" @mouseleave="closeHover"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">gavel</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                </div>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 15">
                <div v-if="button.number === 16" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 17" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 18" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 19" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 20" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
            <div v-if="button.number == 21" @click="openSubMenu(button)" :key="button.number"
                class="px-4 py-3 mt-4 flex items-center"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span class="material-symbols-outlined mr-1" @mouseenter="hoverName(button)" @mouseleave="closeHover"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">build</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                </div>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="button.number == 22" @click="openSubMenu(button)" :key="button.number" class="px-4 py-3 mt-4 flex"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100 '">
                <div class="flex justify-center items-center">
                    <span class="material-symbols-outlined mr-1" @mouseenter="hoverName(button)" @mouseleave="closeHover"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">settings</span>
                    <span :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</span>
                    <p
                        :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                        {{
                            button.name }}
                    </p>
                </div>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 22">
                <div v-if="button.number === 23" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
            <div v-if="button.number == 24" class=" px-4 py-3 mt-4"
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex justify-center items-center">
                    <span class="material-symbols-outlined mr-1" @mouseenter="hoverName(button)" @mouseleave="closeHover"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">folder_managed</span>
                    <router-link to="#" :class="isOpen ? '' : ' hidden truncate'">{{
                        button.name }}</router-link>
                    <p
                        :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                        {{
                            button.name }}
                    </p>
                </div>
            </div>
            <div v-if="button.number == 25" @click="openSubMenu(button)" :key="button.number" class="px-4 py-3 mt-4 flex "
                :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100 flex-row justify-between' : 'flex justify-center items-center transition-all delay-100'">
                <div class="flex items-center justify-center">
                    <span class="material-symbols-outlined mr-1" @mouseenter="hoverName(button)" @mouseleave="closeHover"
                        :class="isOpen ? '' : 'hover:bg-yellow-700 hover:text-white hover:rounded hover:px-2 transition-all delay-100'">description</span>
                    <span :class="isOpen ? '' : 'hidden truncate'">{{
                        button.name }}</span>
                </div>
                <p
                    :class="isHover && activeButton == button ? ' absolute z-10 visible bg-yellow-300 shadow-lg left-[132px] rounded py-1 px-1' : 'hidden'">
                    {{
                        button.name }}
                </p>
                <span class="material-symbols-outlined"
                    :class="subMenuOpen && activeButton === button ? 'rotate-90 ease-in-out duration-500' : 'ease-in-out duration-500', isOpen ? '' : 'hidden'">chevron_right</span>
            </div>
            <div v-if="subMenuOpen && activeButton.number == 25">
                <div v-if="button.number === 26" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 27" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
                <div v-if="button.number === 28" class="px-4 py-3 mt-4"
                    :class="isOpen ? 'rounded hover:bg-yellow-700 transition-all delay-100' : 'flex justify-center items-center transition-all delay-100'">
                    <router-link to="#"
                        :class="isOpen ? '' : 'rounded-full bg-yellow-700 text-transparent hover:text-white hover:rounded hover:px-2 transition-all delay-100 truncate'">
                        {{ button.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import APIDataServices from '@/services/APIDataServices.js'
export default {
    setup () {
        const userStore = useUserStore()
        return { userStore }
    },
    data () {
        return {
            buttons: [],
            buttonVisibility: [],
            isOpen: ref(true),
            subMenuOpen: ref(false),
            activeButton: null,
            isHover: ref(false)
        }
    },
    async mounted () {
        try {
            if (this.userStore.token) {
                const response = await APIDataServices.getButtonVisibility(this.userStore.token)
                this.buttons = JSON.parse(JSON.stringify(response.data))
                this.buttons.forEach(button => {
                    if (button == 19) {
                        this.buttonVisibility.push({ number: 1, name: 'Know Your Customer', link: 'knowCustomer' })
                    } else if (button == 1) {
                        this.buttonVisibility.push({ number: 2, name: 'Active Learner', link: '' })
                        this.buttonVisibility.push({ number: 3, name: 'Test', link: 'test' })
                        this.buttonVisibility.push({ number: 4, name: 'Test Builder', link: 'testBuilder' })
                    } else if (button == 16) {
                        this.buttonVisibility.push({ number: 5, name: 'Incorporation', link: 'incorporation' })
                    } else if (button == 10) {
                        this.buttonVisibility.push({ number: 6, name: 'Suspect Miner', link: '' })
                        this.buttonVisibility.push({ number: 7, name: 'Miner Training', link: 'suspectMinerTraining' })
                    } else if (button == 6) {
                        this.buttonVisibility.push({ number: 8, name: 'Miner Scheduling', link: 'minerScheduling' })
                    } else if (button == 8) {
                        this.buttonVisibility.push({ number: 9, name: 'Suspect Listing', link: 'suspectListing' })
                    } else if (button == 5) {
                        this.buttonVisibility.push({ number: 10, name: 'Backlog Miner', link: 'backlogMiner' })
                    } else if (button == 12) {
                        this.buttonVisibility.push({ number: 11, name: 'Link Miner', link: '' })
                        this.buttonVisibility.push({ number: 12, name: 'Miner Training', link: 'linkMinerTraining' })
                    } else if (button == 4) {
                        this.buttonVisibility.push({ number: 13, name: 'Task Manager', link: 'taskManager' })
                    } else if (button == 3) {
                        this.buttonVisibility.push({ number: 14, name: 'Activity Log', link: 'activityLog' })
                    } else if (button == 15) {
                        this.buttonVisibility.push({ number: 15, name: 'Sanction Miner', link: '' })
                        this.buttonVisibility.push({ number: 16, name: 'Run Sanction Miner', link: 'sanctionMiner' })
                        this.buttonVisibility.push({ number: 17, name: 'Run Sanction Giden Swift', link: 'gidenSwift' })
                    } else if (button == 17) {
                        this.buttonVisibility.push({ number: 18, name: 'Run Sanction Matcher', link: 'sanctionMatcher' })
                    } else if (button == 18) {
                        this.buttonVisibility.push({ number: 19, name: 'Run Sanction Matcher Inc', link: 'sanctionMatcherInc' })
                    } else if (button == 2) {
                        this.buttonVisibility.push({ number: 20, name: 'Run Sanction Matcher with Params', link: 'sanctionMatcherParams' })
                    } else if (button == 9) {
                        this.buttonVisibility.push({ number: 21, name: 'Case Management', link: '' })
                    } else if (button == 11) {
                        this.buttonVisibility.push({ number: 22, name: 'Settings', link: '' })
                        this.buttonVisibility.push({ number: 23, name: 'Risk Settings', link: 'riskSettings' })
                    } else if (button == 7) {
                        this.buttonVisibility.push({ number: 24, name: 'System Management', link: 'systemManagement' })
                    } else if (button == 14) {
                        this.buttonVisibility.push({ number: 25, name: 'Reports', link: '' })
                        this.buttonVisibility.push({ number: 26, name: 'Sanction Scan Reports', link: 'sanctionScanReports' })
                    } else if (button == 13) {
                        this.buttonVisibility.push({ number: 27, name: 'NRT Reports', link: 'nrtReports' })
                    } else if (button == 20) {
                        this.buttonVisibility.push({ number: 28, name: 'Backlog Result Report', link: 'backlogResultReport' })
                    }
                });
                this.buttonVisibility = this.buttonVisibility.sort((b1, b2) => (b1.number > b2.number) ? 1 : (b1.number < b2.number) ? -1 : 0)
            }
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        closeMenu () {
            this.isOpen = !this.isOpen
            if (this.subMenuOpen == true) {
                this.subMenuOpen = false
            }
        },
        openSubMenu (button) {
            if (this.isOpen === true) {
                if (this.activeButton === button) {
                    this.subMenuOpen = !this.subMenuOpen;
                } else {
                    this.subMenuOpen = true;
                    this.activeButton = button;
                }
            } else if (this.isOpen === false) {
                this.isHover = false
                this.isOpen = true
                this.subMenuOpen = true
                this.activeButton = button
            }
        },
        hoverName (button) {
            if (this.isOpen === false) {
                this.activeButton = button
                this.isHover = true
            }
        },
        closeHover () {
            if (this.isOpen === false) {
                this.activeButton = null
                this.isHover = false
            }
        }
    }
}
</script>