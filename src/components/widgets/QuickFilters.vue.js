const __VLS_props = defineProps();
const emit = defineEmits();
const ranges = [
    { label: '1m', value: 60 },
    { label: '5m', value: 300 },
    { label: '15m', value: 900 },
    { label: '1h', value: 3600 }
];
const chartKinds = [
    { label: 'Line', value: 'line' },
    { label: 'Area', value: 'area' },
    { label: 'Bar', value: 'bar' }
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.paused ? __VLS_ctx.emit('resume') : __VLS_ctx.emit('pause');
        } },
    ...{ class: "primary" },
    type: "button",
});
(__VLS_ctx.paused ? 'Resume' : 'Pause');
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('retry');
        } },
    ...{ class: "ghost" },
    type: "button",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "segmented" },
    'aria-label': "Time range",
});
for (const [range] of __VLS_getVForSourceType((__VLS_ctx.ranges))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.emit('range', range.value);
            } },
        key: (range.value),
        type: "button",
        ...{ class: ({ active: __VLS_ctx.timeRange === range.value }) },
    });
    (range.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "segmented" },
    'aria-label': "Chart type",
});
for (const [kind] of __VLS_getVForSourceType((__VLS_ctx.chartKinds))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.emit('chart', kind.value);
            } },
        key: (kind.value),
        type: "button",
        ...{ class: ({ active: __VLS_ctx.chartKind === kind.value }) },
    });
    (kind.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('theme', __VLS_ctx.theme === 'dark' ? 'light' : 'dark');
        } },
    ...{ class: "ghost" },
    type: "button",
});
(__VLS_ctx.theme === 'dark' ? 'Light' : 'Dark');
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['segmented']} */ ;
/** @type {__VLS_StyleScopedClasses['segmented']} */ ;
/** @type {__VLS_StyleScopedClasses['ghost']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            emit: emit,
            ranges: ranges,
            chartKinds: chartKinds,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
