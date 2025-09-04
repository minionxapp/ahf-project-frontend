<!--Version V2
LevelFormDialog.vue-->

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
                    <label for="kode" class="block font-bold mb-3">Kode</label>
                    <InputText rows="5" id="kode" v-model.trim="props.item.kode" required="false" fluid />
                    <small v-if="submitted && !props.item.kode" class="text-red-500">kode is required.</small>
                </div>
                <div>
                    <label for="nama" class="block font-bold mb-3">Nama</label>
                    <InputText rows="5" id="nama" v-model.trim="props.item.nama" required="false" fluid />
                    <small v-if="submitted && !props.item.nama" class="text-red-500">nama is required.</small>
                </div>
                <div>
                    <label for="aktive" class="block font-bold mb-3">Aktive</label>
                    <Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
                        optionValue="code" placeholder="Aktive" class="w-full"></Select>
                    <!-- <InputText rows="5" id="aktive" v-model.trim="props.item.aktive" required="false" fluid /> -->
                    <small v-if="submitted && !props.item.aktive" class="text-red-500">aktive is required.</small>
                </div>
                <div>
                    <label for="urutan" class="block font-bold mb-3">Urutan</label>
                    <InputNumber :showIcon="true" :showButtonBar="true" rows="5" id="urutan"
                        v-model.trim="props.item.urutan" required="false" fluid showButtons mode="decimal">
                    </InputNumber>
                    <small v-if="submitted && !props.item.urutan" class="text-red-500">urutan is required.</small>
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
        dialogHeader.value = newItem.id ? 'Edit Level' : 'New Level';
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
    if (props.item.nama) {
        // Kirim event 'save' ke parent dengan data form
        emit('save', props.item);
        //closeDialog();
    }
};

</script>



<!-- //tambahan untuk select option
<Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->