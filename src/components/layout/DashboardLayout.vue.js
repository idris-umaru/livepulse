import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import TopNav from './TopNav.vue';
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "app-shell" },
});
/** @type {[typeof TopNav, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TopNav, new TopNav({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof Header, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Header, new Header({
    status: (__VLS_ctx.status),
}));
const __VLS_4 = __VLS_3({
    status: (__VLS_ctx.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "layout-grid" },
});
/** @type {[typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(Sidebar, new Sidebar({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "layout-content" },
});
var __VLS_9 = {};
/** @type {__VLS_StyleScopedClasses['app-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['layout-content']} */ ;
// @ts-ignore
var __VLS_10 = __VLS_9;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Header: Header,
            Sidebar: Sidebar,
            TopNav: TopNav,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
