<!--Version V2
KompetensiFormDialog.vue-->

<template>
    <Dialog :visible="visible" :style="{ width: '50%' }" :header="dialogHeader" :modal="true" :closable=false>
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-6">
                <AlertMessage v-if="errorAlert" :message="errorMsg" />
                <div>
                    <InputText id="id" v-model.trim="item.id" required="false" :invalid="submitted && !item.id" fluid
                        readonly="true" hidden />
                </div>

                <div class="flex flex-wrap gap-2 mb-2">
                    <div class="flex flex-col grow basis-0 gap-2">
                        <label for="kode_jf" class="block font-bold mb-1">Kode Job Family</label>
                        <Select id="kode_jf" v-model="props.item.kode_jf" :options="props.jobfamilys" optionLabel="nama"
                            optionValue="kode" placeholder="Job Family" class="w-full" @change="setNamaJF()"></Select>
                        <small v-if="submitted && !props.item.kode_jf" class="text-red-500">kode_jf is
                            required.</small>
                    </div>

                    <div class="flex flex-col grow basis-0 gap-2 mb">
                        <label for="kode_jf" class="block font-bold mb-1">Kode Sub Job Family</label>
                        <Select id="kode_sjf" v-model="props.item.kode_sjf" :options="props.subjobfamilys.value"
                            optionLabel="nama" optionValue="kode" placeholder="Sub Job Family" class="w-full"
                            @change="setNamaSJF()"></Select>
                        <small v-if="submitted && !props.item.kode_sjf" class="text-red-500">Kode_sjf is
                            required.</small>
                    </div>
                </div>

                <div>
                    <label for="kode" class="block font-bold mb-1">Kode</label>
                    <InputText rows="5" id="kode" v-model.trim="props.item.kode" required="false" fluid
                        readonly="true" />
                    <small v-if="submitted && !props.item.kode" class="text-red-500">kode is required.</small>
                </div>
                <div>
                    <label for="nama" class="block font-bold mb-3">Nama</label>
                    <InputText rows="5" id="nama" v-model.trim="props.item.nama" required="false" fluid />
                    <small v-if="submitted && !props.item.nama" class="text-red-500">nama is required.</small>
                </div>

                <div hidden>
                    <label for="nama_jf" class="block font-bold mb-3">Nama_jf</label>
                    <InputText rows="5" id="nama_jf" v-model.trim="props.item.nama_jf" required="false" fluid />
                    <small v-if="submitted && !props.item.nama_jf" class="text-red-500">nama_jf is required.</small>
                </div>

                <div hidden>
                    <label for="nama_sjf" class="block font-bold mb-3">Nama_sjf</label>
                    <InputText rows="5" id="nama_sjf" v-model.trim="props.item.nama_sjf" required="false" fluid />
                    <small v-if="submitted && !props.item.nama_sjf" class="text-red-500">nama_sjf is required.</small>
                </div>
                <div>
                    <label for="aktive" class="block font-bold mb-3">Aktive</label>
                    <!-- <InputText rows="5" id="aktive" v-model.trim="props.item.aktive" required="false" fluid /> -->
                    <Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
                        optionValue="code" placeholder="Aktive" class="w-full"></Select>
                    <small v-if="submitted && !props.item.aktive" class="text-red-500">aktive is required.</small>
                </div>
                <div>
                    <label for="urutan" class="block font-bold mb-3">Urutan</label>
                    <InputNumber :showIcon="true" :showButtonBar="true" rows="5" id="urutan"
                        v-model.trim="props.item.urutan" required="false" fluid showButtons mode="decimal">
                    </InputNumber>
                    <small v-if="submitted && !props.item.urutan" class="text-red-500">urutan is required.</small>
                </div>


                <div>
                    <label for="desc" class="block font-bold mb-3">Desc</label>
                    <InputText rows="5" id="desc" v-model.trim="props.item.desc" required="false" fluid />
                    <small v-if="submitted && !props.item.desc" class="text-red-500">desc is required.</small>
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
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { defineEmits, defineProps, ref, watch } from 'vue';
import AlertMessage from '../components/AlertMessage.vue';

import { useAuthStore } from '@/stores/authStores';
const autStores = useAuthStore();
const { getToken } = autStores;

const errorAlert = ref("")
const errorMsg = ref(false)
const item = ref({});

const yesNo = ref([{ name: 'Yes', code: 'Y' }, { name: 'No', code: 'N' }])
// Menerima props dari parent
const props = defineProps({
    visible: Boolean,
    item: Object,
    jobfamilys: {
        type: Array,
        required: true
    },
    subjobfamilys: {
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
        dialogHeader.value = newItem.id ? 'Edit Kompetensi' : 'New Kompetensi';
    }
}, { immediate: true });

// Watcher untuk reset state submitted saat dialog ditutup
watch(() => props.visible, (newVal) => {
    if (!newVal) {
        submitted.value = false;
    }
});

watch(() => props.subjobfamilys, () => {
    searchDataSubJobFamily(props.item.kode_jf)
})

const closeDialog = () => {
    // Panggil emit untuk memberitahu parent agar mengubah nilai visible menjadi false
    emit('update:visible', false);
};

// Fungsi untuk menangani submit form
const handleSubmit = () => {
    submitted.value = true;
    // Lakukan validasi sederhana
    if (props.item.nama) {
        emit('save', props.item);
    }
};

const setNamaJF = async () => {
    const foundJF = await props.jobfamilys.find(jf => jf.kode === props.item.kode_jf)
    props.item.nama_jf = foundJF.nama
    props.item.kode_sjf = null
    await searchDataSubJobFamily(foundJF.kode)
    props.item.nama_sjf = null
    props.item.kode = props.item.kode_jf + "-"

}


const setNamaSJF = async () => {
    const foundSJF = await props.subjobfamilys.value.find(jf => jf.kode === props.item.kode_sjf)
    props.item.nama_sjf = foundSJF.nama
    props.item.kode = props.item.kode_jf + "-" + props.item.kode_sjf + '-'
}


// onMounted(async () => {
//     alert("onMounted.....")
// });


//const subjobfamilys = ref([])
const searchDataSubJobFamily = async (kode_jf) => {
    try {
        const { data } = await custumFetch.get(`/subjobfamilys/kode_jf/` + kode_jf, {
            withCredentials: true,
            headers: { "X-API-TOKEN": await getToken() },
        });
        props.subjobfamilys.value = await data.data;
        // console.log(props.subjobfamilys.value)
    } catch (error) {
        console.error(error);
    }
};
</script>



<!-- //tambahan untuk select option
<Select id="aktive" v-model="props.item.aktive" :options="yesNo" optionLabel="name"
optionValue="code" placeholder="Aktive" class="w-full"></Select>
-->