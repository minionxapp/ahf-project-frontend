<script setup>
import custumFetch from '@/api';
import { onMounted, ref } from 'vue';
//untuk tab
import { useAuthStore } from '@/stores/authStores';
const dropdownProjectItems = ref([]);
const dropdownProjectItem = ref(null);
const dropdownTableItems = ref([]);
const dropdownTableItem = ref(null);
const result = ref([])
const resultFront = ref([])

// import custumFetch from '@/api';
// import { onMounted, ref } from 'vue';
//untuk tab
// import { useAuthStore } from '@/stores/authStores';
import { FrontFormDialogV2, FrontTableV2, FrontViewV2, Index } from '@/stores/frontendStoresV2';



async function onChange() {
    dropdownTableItems.value = null
    await getTablesByProject((this.dropdownProjectItem).id)

}
const autStores = useAuthStore();
const { currentUser, currentToken, getToken } = autStores

async function onTableChange() {
}

async function getTablesByProject(value) {
    try {
        const { data } = await custumFetch.get("/dev_tablexs/projectid/" + value,
            {
                withCredentials: true,
                headers: {
                    "X-API-TOKEN": await getToken()
                },
            }
        )
        dropdownTableItems.value = data.data
    } catch (error) {
        console.log(error)
    }
}

//membuat script tanpa membuat file
const submit = async () => {
    if (dropdownTableItem.value && dropdownTableItem.value) {
        const tableId = ((dropdownTableItem.value).id)
        try {
            const { data } = await custumFetch.get("/dev/schema/" + tableId + "?createFile=false",
                {
                    withCredentials: true,
                    headers: {
                        "X-API-TOKEN": await getToken()
                    },
                }
            )
            result.value = data.data

        } catch (error) {
            console.log(error)
        }
        console.log(result.value.addFileContent)
        await front()
    } else {
        alert("Project/Table belum dipilih")
    }
}


//ADD colom
//membuat script tanpa membuat file
const submitAdd = async () => {
    if (dropdownTableItem.value && dropdownTableItem.value) {
        const tableId = ((dropdownTableItem.value).id)
        try {
            const { data } = await custumFetch.get("/dev/schema/" + tableId + "?createFile=false",
                {
                    withCredentials: true,
                    headers: {
                        "X-API-TOKEN": await getToken()
                    },
                }
            )
            result.value = data.data
            result.value.schema = data.data.addFileContent
            result.value.model = data.data.newModelContent
            // newModelContent

        } catch (error) {
            console.log(error)
        }
        console.log(result.value.addFileContent)
        await front()
    } else {
        alert("Project/Table belum dipilih")
    }
}


//membuat file 
const submit2 = async () => {
    if (dropdownTableItem.value && dropdownTableItem.value) {
        const tableId = ((dropdownTableItem.value).id)
        try {
            const { data } = await custumFetch.get("/dev/schema/" + tableId + "?createFile=true",
                {
                    withCredentials: true,
                    headers: {
                        "X-API-TOKEN": await getToken()
                    },
                }
            )
            result.value = data.data
            alert("Create Success.......")
        } catch (error) {
            console.log(error)
        }
    } else {
        alert("Project/Table belum dipilih")
    }
}
const allProjects = async () => {
    try {
        // const { data } = await custumFetch.get("/dev_projects/",
        const { data } = await custumFetch.get("/dev_projects/?create_by=" + currentUser.username,
            {
                withCredentials: true,
                headers: {
                    "X-API-TOKEN": await getToken()
                },
            }
        )
        dropdownProjectItems.value = data.data
    } catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    await allProjects()
})


//=====================================
const front = async () => {

    if (dropdownTableItem.value && dropdownTableItem.value) {
        const tableId = ((dropdownTableItem.value).id)
        const tableName = ((dropdownTableItem.value).name)

        resultFront.value.front = await FrontViewV2(tableId, tableName)
        // console.log(resultFront.value.front)
        resultFront.value.index = await Index(tableId, tableName)
        resultFront.value.table = await FrontTableV2(tableId, tableName)
        resultFront.value.formDialog = await FrontFormDialogV2(tableId, tableName)
    } else {
        alert("Project/Table belum dipilih")
    }
}
</script>



<template>
    <Fluid>
        <div class="">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Project Name</div>
                <div class="flex flex-wrap items-start gap-4">
                    <div class="field">
                        <label for="project" class="sr-only">Project</label>
                        <Select id="state" v-model="dropdownProjectItem" :options="dropdownProjectItems"
                            optionLabel="name" placeholder="Select Project" class="w-full"
                            @change="onChange()"></Select>
                    </div>
                    <div class="field">
                        <label for="table" class="sr-only">Table</label>
                        <Select id="state" v-model="dropdownTableItem" :options="dropdownTableItems" optionLabel="name"
                            placeholder="Select Table" class="w-full" @change="onTableChange()"></Select>
                    </div>
                    <Button label="Back Script" :fluid="false" @click="submit()"></Button>
                    <Button label="Back File" :fluid="false" @click="submit2()"></Button>
                    <Button label="Front" :fluid="false" @click="front()"></Button>
                    <Button label="Add" :fluid="false" @click="submitAdd()"></Button>
                </div>
                <Tabs value="0">
                    <TabList>
                        <Tab value="0">Schema</Tab>
                        <Tab value="1">Model</Tab>
                        <Tab value="2">Validation</Tab>
                        <Tab value="3">Service</Tab>
                        <Tab value="4">Controller</Tab>
                        <Tab value="5">Route</Tab>
                        <Tab value="6">Util Test</Tab>
                        <Tab value="7">Test</Tab>
                        <Tab value="8">File</Tab>
                        <Tab value="20">||||||</Tab>
                        <Tab value="9">F_VIEW</Tab>
                        <Tab value="10">F_TABLE</Tab>
                        <Tab value="11">F_DIALOG</Tab>
                        <Tab value="12">F_FILE</Tab>
                        <Tab value="21">||||||</Tab>
                        <Tab value="22">Add Column</Tab>

                    </TabList>
                    <TabPanels>
                        <TabPanel value="0">
                            <pre>
                                <code> {{ result.schema }} </code>
                            </pre>
                        </TabPanel>
                        <TabPanel value="1">
                            <pre>
                            <code>
                                {{ result.model }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="2">
                            <pre>
                            <code>
                                {{ result.validate }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="3">
                            <pre>
                            <code>
                                {{ result.service }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="4">
                            <pre>
                            <code>
                                {{ result.controller }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="5">
                            <pre>
                            <code>
                                {{ result.route }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="6">
                            <pre>
                            <code>
                                {{ result.utiltest }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="7">
                            <pre>
                            <code>
                                {{ result.test }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="8">
                            <pre>
                            <code>
                                {{ result.file }}
                            </code>
                        </pre>
                        </TabPanel>

                        <TabPanel value="9">
                            <pre>
                            <code>
                                {{ resultFront.front }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="10">
                            <pre>
                            <code>
                                {{ resultFront.table }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="11">
                            <pre>
                            <code>
                                {{ resultFront.formDialog }}
                            </code>
                        </pre>
                        </TabPanel>
                        <TabPanel value="12">
                            <pre>
                            <code>
                                {{ resultFront.index }}
                            </code>
                        </pre>
                        </TabPanel>

                        <!--  -->
                        <TabPanel value="22">
                            <pre>
                            <code>
                                {{ result.addFileContent }}
                            </code>
                        </pre>
                        </TabPanel>


                    </TabPanels>
                </Tabs>
            </div>

        </div>
    </Fluid>
</template>