<!--Version V2
Divisi_deptFormDialog.vue-->

<template>
    <Dialog :visible="visible" :style="{ width: '450px' }" :header="dialogHeader" :modal="true" :closable=false>
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
                    <label for="divisi_kode" class="block font-bold mb-3">Divisi_kode</label>
                    <!-- <InputText rows="5" id="divisi_kode" v-model.trim="props.item.divisi_kode" required="false" fluid /> -->
                    <Select id="divisi_kode" v-model="props.item.divisi_kode" :options="divisis" optionLabel="nama"
                        optionValue="kode" placeholder="Divisi" class="w-full" @change="setDivisiName()"></Select>
                    <small v-if="submitted && !props.item.divisi_kode" class="text-red-500">divisi_kode is
                        required.</small>
                </div>
                <div hidden>
                    <label for="divisi_name" class="block font-bold mb-3">Divisi_name</label>
                    <InputText rows="5" id="divisi_name" v-model.trim="props.item.divisi_name" required="false" fluid />
                    <small v-if="submitted && !props.item.divisi_name" class="text-red-500">divisi_name is
                        required.</small>
                </div>
                <div>
                    <label for="aktive" class="block font-bold mb-3">Aktive</label>
                    <!-- <InputText rows="5" id="aktive" v-model.trim="props.item.aktive" required="false" fluid /> -->
                    <Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
                        optionValue="code" placeholder="Aktive" class="w-full"></Select>
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
    divisis: {
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
        dialogHeader.value = newItem.id ? 'Edit Divisi_dept' : 'New Divisi_dept';
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

const setDivisiName = () => {
    const foundDivisi = props.divisis.find(jf => jf.kode === props.item.divisi_kode)
    props.item.divisi_name = foundDivisi.nama
    // console.log(foundDivisi.nama)
}

</script>



<!-- //tambahan untuk select option
<Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->