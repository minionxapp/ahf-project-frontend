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
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText rows="5" id="name" v-model.trim="props.item.name" required="false" fluid />
                    <small v-if="submitted && !props.item.name" class="text-red-500">name is required.</small>
                </div>
                <div>
                    <label for="kode" class="block font-bold mb-3">Kode</label>
                    <InputText rows="5" id="kode" v-model.trim="props.item.kode" required="false" fluid />
                    <small v-if="submitted && !props.item.kode" class="text-red-500">kode is required.</small>
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

// Menerima props dari parent
const props = defineProps({
    visible: Boolean,
    item: Object
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
        dialogHeader.value = newItem.id ? 'Edit Table_coba' : 'New Table_coba';
    }
}, { immediate: true });

// Watcher untuk reset state submitted saat dialog ditutup
watch(() => props.visible, (newVal) => {
    if (!newVal) {
        submitted.value = false;
    }
});

// Fungsi untuk menutup dialog
// const closeDialog = () => {
//     emit('update:visible', false);
// };

const closeDialog = () => {
    // Panggil emit untuk memberitahu parent agar mengubah nilai visible menjadi false
    emit('update:visible', false);
};

// Fungsi untuk menangani submit form
const handleSubmit = () => {
    submitted.value = true;
    // Lakukan validasi sederhana
    if (props.item.name) {
        // Kirim event 'save' ke parent dengan data form
        emit('save', props.item);
        closeDialog();
    }
};

</script>



<!-- //tambahan untuk select option
// const yesNo = ref([{ name: 'Yes', code: 'Y' }, { name: 'No', code: 'N' }])
//<Select id="aktive" v-model="item.aktive" :options="yesNo" optionLabel="name"
//optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->