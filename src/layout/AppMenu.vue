<script setup>
import { ref } from 'vue';

import { onMounted } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Logout', icon: 'pi pi-sign-out', to: '/logout', visible: true }
        ]
    },
    {
        label: 'Admin',
        visible: true,
        items: [
            {
                label: 'Parameter', items: [
                    { label: 'Seq', icon: 'pi pi-fw pi-sort-numeric-down', to: { name: 'seq' } },
                    { label: 'Akademi', icon: 'pi pi-building-columns', to: { name: 'akademi' } },
                    { label: 'Job Family', icon: 'pi pi-list', to: { name: 'jobfamily' } },
                    { label: 'Sub Job Family', icon: 'pi pi-list-check', to: { name: 'subjobfamily' } },
                    { label: 'User Akademi', icon: 'pi pi-address-book', to: { name: 'userakademi' } },
                    { label: 'Level', icon: 'pi pi-sort-alt-slash', to: { name: 'level' } },
                    { label: 'Tipe Training', icon: 'pi pi-briefcase', to: { name: 'tipetraining' } },
                    { label: 'Divisi', icon: 'pi pi-book', to: { name: 'divisi' } },
                    { label: 'Departement', icon: 'pi pi-fw pi-car', to: { name: 'divisidept' } }
                ]
            },
            {
                label: 'User & Group', items: [
                    { label: 'User', icon: 'pi pi-fw pi-user-plus', to: { name: 'user' } },
                    { label: 'Group', icon: 'pi pi-fw pi-users', to: { name: 'group' } },
                    { label: 'User Direktory', icon: 'pi pi-fw pi-folder-open', to: { name: 'dev_direktori' } },
                    { label: 'User Project', icon: 'pi pi-fw pi-file-edit', to: { name: 'Userproject' } }
                ]
            },
            // {
            //     label: 'Job & Kompetensi', items: [
            //         { label: 'Job Family', icon: 'pi pi-fw pi-briefcase', to: { name: 'Jobfamily' } },
            //         { label: 'Sub Job Family', icon: 'pi pi-fw pi-paperclip', to: { name: 'Subjobfamily' } },
            //         { label: 'Kompetensi', icon: 'pi pi-fw pi-key', to: { name: 'Kompetensi' } },
            //         { label: 'Kompetensi Level', icon: 'pi pi-fw pi-clock', to: { name: 'Kompetensilevel' } }
            //         // { label: 'Sub Kompetensi', icon: 'pi pi-fw pi-file-check', to: { name: 'Subkompetensi' } }

            //     ]
            // },

            // { label: 'Akademi', icon: 'pi pi-fw pi-building-columns', to: { name: 'akademi' } },
            // { label: 'User Akademi', icon: 'pi pi-fw pi-graduation-cap', to: { name: 'Userakademi' } }
        ]
    },
    // {
    //     label: 'Event',
    //     items: [
    //         {
    //             label: 'Learning', items: [
    //                 { label: 'Training', icon: 'pi pi-fw pi-book', to: { name: 'Training' } },
    //                 { label: 'Trainingchecklist', icon: 'pi pi-fw pi-car', to: { name: 'Trainingchecklist' } }
    //             ]
    //         },

    //     ]
    // },
    {
        label: 'Development',
        items: [{ label: 'Project', icon: 'pi pi-fw pi-folder-plus', to: '/dev/project' },
        { label: 'Table', icon: 'pi pi-fw pi-table', to: '/dev/table' },
        { label: 'Table Kolom', icon: 'pi pi-fw pi-objects-column', to: '/dev/tablekolom' },
        { label: 'Backend', icon: 'pi pi-fw pi-barcode ', to: '/dev' },
        { label: 'Frontend', icon: 'pi pi-fw pi-code', to: { name: 'front' } },
        { label: 'Frontendv2', icon: 'pi pi-fw pi-code', to: { name: 'frontnew' } },
        { label: 'Table Coba', icon: 'pi pi-fw pi-car', to: { name: 'tablecoba' } }

            // { label: 'Coba', icon: 'pi pi-fw pi-car', to: { name: 'coba' } },
            // { label: 'dev_direktori', icon: 'pi pi-fw pi-car', to: { name: 'dev_direktori' } },
            // { label: 'group', icon: 'pi pi-fw pi-car', to: { name: 'group' } },
            // { label: 'testaja', icon: 'pi pi-fw pi-car', to: { name: 'testaja' } }
        ]
    },
    {
        label: 'Test',
        items: [
            {
                label: 'Coba', icon: 'pi pi-fw pi-clipboard', items: [
                    // { label: 'dev_direktori', icon: 'pi pi-fw pi-folder-open', to: { name: 'dev_direktori' } },
                    // { label: 'group', icon: 'pi pi-fw pi-users', to: { name: 'group' } },
                    // { label: 'Brand', icon: 'pi pi-fw pi-car', to: { name: 'brand' } },

                    // { label: 'testaja', icon: 'pi pi-fw pi-car', to: { name: 'testaja' } },
                    // { label: 'user', icon: 'pi pi-fw pi-user', to: { name: 'user' } }
                    // { label: 'pmakai', icon: 'pi pi-fw pi-car', to: { name: 'pmakai' } },
                    // { label: 'Kosong', icon: 'pi pi-fw pi-car', to: { name: 'Kosong' } }

                ]
            },
        ]
    },
    // {
    //     label: 'UI Components',
    //     items: [
    //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
    //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
    //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
    //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
    //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
    //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
    //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
    //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
    //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
    //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
    //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
    //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
    //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
    //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
    //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
    //     ]
    // },
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     to: '/pages',
    //     active: false,
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             items: [
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         }
    //     ]
    // },
    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Submenu 2',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 2.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-book',
    //             to: '/documentation'
    //         },
    //         {
    //             label: 'View Source',
    //             icon: 'pi pi-fw pi-github',
    //             url: 'https://github.com/primefaces/sakai-vue',
    //             target: '_blank'
    //         }
    //     ]
    // }
]);


onMounted(async () => {
    // console.log((model))

})
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>

        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
