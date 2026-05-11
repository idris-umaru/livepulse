import LineChart from '../components/charts/LineChart.vue';
import { useTelemetryStore } from '../stores/useTelemetryStore';
const store = useTelemetryStore();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
/** @type {[typeof LineChart, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(LineChart, new LineChart({
    title: "Telemetry Trend",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.store.selectedDatasetOptions),
}));
const __VLS_1 = __VLS_0({
    title: "Telemetry Trend",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.store.selectedDatasetOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LineChart: LineChart,
            store: store,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
