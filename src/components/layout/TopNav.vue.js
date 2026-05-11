const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/settings', label: 'Settings' }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "topnav" },
    'aria-label': "Primary",
});
for (const [link] of __VLS_getVForSourceType((__VLS_ctx.links))) {
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (link.path),
        to: (link.path),
    }));
    const __VLS_2 = __VLS_1({
        key: (link.path),
        to: (link.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (link.label);
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['topnav']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            links: links,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
