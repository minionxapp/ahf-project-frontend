<template>
    <Dialog :visible="visible" :style="{ width: '450px' }" :header="dialogHeader" :modal="true">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-6">
                <AlertMessage v-if="errorAlert" :message="errorMsg" />
                <div>
                    <InputText id="id" v-model.trim="item.id" required="false" :invalid="submitted && !item.id" fluid
                        readonly="true" hidden />
                </div>
                <div>
                    <label for="username" class="block font-bold mb-3">Username</label>
                    <InputText rows="5" id="username" v-model.trim="props.item.username" required="false" fluid />
                    <small v-if="submitted && !props.item.username" class="text-red-500">username is required.</small>
                </div>
                <div>
                    <label for="kode_akademi" class="block font-bold mb-3">Kode_akademi</label>
                    <!-- <InputText rows="5" id="kode_akademi" v-model.trim="props.item.kode_akademi" required="false"
                        fluid /> -->
                    <Select id="kode_akademi" v-model="props.item.kode_akademi" :options="akademis" optionLabel="nama"
                        optionValue="kode" placeholder="Akademi" class="w-full"></Select>
                    <small v-if="submitted && !props.item.kode_akademi" class="text-red-500">kode_akademi is
                        required.</small>
                </div>
                <div>
                    <label for="aktive" class="block font-bold mb-3">Aktive</label>
                    <Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
                        optionValue="code" placeholder="Aktive" class="w-full"></Select>
                    <!-- <InputText rows="5" id="aktive" v-model.trim="props.item.aktive" required="false" fluid /> -->
                    <small v-if="submitted && !props.item.aktive" class="text-red-500">aktive is required.</small>
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

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { defineEmits, defineProps, ref, watch } from 'vue';
import AlertMessage from '../components/AlertMessage.vue';

const errorAlert = ref("")
const errorMsg = ref(false)
const item = ref({});

const yesNo = ref([{ name: 'Yes', code: 'Y' }, { name: 'No', code: 'N' }])
// Menerima props dari parent
const props = defineProps({
    visible: Boolean,
    item: Object,
    akademis: {
        type: Array,
        required: true
    },
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
        dialogHeader.value = newItem.id ? 'Edit User_akademi' : 'New User_akademi';
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
const handleSubmit = () => {
    submitted.value = true;
    // Lakukan validasi sederhana
    if (props.item.username) {
        // Kirim event 'save' ke parent dengan data form
        emit('save', props.item);
        // closeDialog();
    }
};

</script>



<!-- //tambahan untuk select option
<Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->