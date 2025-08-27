<template>
    <Dialog :visible="visible" :style="{ width: '450px' }" :header="dialogHeader" :modal="true">
        <!-- <Dialog v-model:visible="formDialog" :style="{ width: '550px' }" header="seq Details" :modal="true"></Dialog> -->
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-6">
                <AlertMessage v-if="errorAlert" :message="errorMsg" />
                <div>
                    <InputText id="id" v-model.trim="item.id" required="false" :invalid="submitted && !item.id" fluid
                        readonly="true" hidden />
                </div>
                <div>
                    <label for="project_id" class="block font-bold mb-3">Project_id</label>
                    <Select id="aktive" v-model="item.project_id" :options="projects" optionLabel="name"
                        optionValue="id" placeholder="Project Name" class="w-full">
                    </Select>
                    <small v-if="submitted && !item.project_id" class="text-red-500">project_id is required.</small>
                </div>


                <div>
                    <label for="username" class="block font-bold mb-3">Username</label>
                    <InputText rows="5" id="username" v-model.trim="item.username" required="false" fluid />
                    <small v-if="submitted && (!item.username || !userAda)" class="text-red-500">username is required
                        /tidak ditemukan.</small>
                </div>
                <div>
                    <label for="status" class="block font-bold mb-3">Status</label>
                    <Select id="status" v-model="item.status" :options="yesNo" optionLabel="name" optionValue="code"
                        placeholder="Status" class="w-full"></Select>
                    <small v-if="submitted && !item.status" class="text-red-500">status is required.</small>
                </div>
                <div class="flex justify-content-end gap-2 mt-4">
                    <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" />
                    <Button type="submit" label="Submit" />
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup>

import custumFetch from '@/api';
import { useAuthStore } from '@/stores/authStores';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { defineEmits, defineProps, ref, watch } from 'vue';
import AlertMessage from '../components/AlertMessage.vue';


const autStores = useAuthStore();
const { currentUser, currentToken, getToken } = autStores

const errorAlert = ref("")
const errorMsg = ref(false)
const userAda = ref(false)

const yesNo = ref([{ name: 'Yes', code: 'Y' }, { name: 'No', code: 'N' }])
// Menerima props dari parent
const props = defineProps({
    visible: Boolean,
    item: Object,
    projects: Object
});

//  Mendefinisikan event yang akan dikirim ke parent
const emit = defineEmits(['update:visible', 'save']); // Event untuk memberitahu parent bahwa `visible` harus diubah

// State reaktif
const formData = ref({}); // Data form yang diisi pengguna
const submitted = ref(false); // Status submit untuk validasi
const dialogHeader = ref(''); // Judul dialog (New/Edit)

// Watcher untuk memantau perubahan props.item
// Saat item berubah, salin data ke formData dan perbarui judul dialog
watch(() => props.item, (newItem) => {
    if (newItem) {
        formData.value = { ...newItem };
        dialogHeader.value = newItem.id ? 'Edit User_project' : 'New User_project';
    }
}, { immediate: true });

// Watcher untuk reset state submitted saat dialog ditutup
watch(() => props.visible, (newVal) => {
    if (!newVal) {
        submitted.value = false;
    }
});

const closeDialog = () => {
    // Panggil emit untuk memberitahu parent agar mengubah nilai visible menjadi false
    emit('update:visible', false);
};


// Fungsi untuk menangani submit form
const handleSubmit = async () => {
    submitted.value = true;
    await searchDataUsername();
    // Lakukan validasi sederhana
    if (props.item.project_id && userAda.value) {
        // Kirim event 'save' ke parent dengan data form
        emit('save', props.item);
        closeDialog();
    }
};

//cek user name
const searchDataUsername = async () => {
    try {
        const { data } = await custumFetch.get("/users/" + props.item.username,
            {
                withCredentials: true,
                headers: {
                    "X-API-TOKEN": await getToken()
                },
            }
        )
        // console.log(data.data)
        props.item.username = data.data.username
        userAda.value = true
    } catch (error) {
        userAda.value = false
        console.log(error)
    }
}

//cek user project sudah ada atau belu


</script>



<!-- //tambahan untuk select option
// const yesNo = ref([{ name: 'Yes', code: 'Y' }, { name: 'No', code: 'N' }])
//<Select id="aktive" v-model="item.aktive" :options="yesNo" optionLabel="name"
//optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->