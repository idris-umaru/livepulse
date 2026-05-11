import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import ActivityFeed from '../components/widgets/ActivityFeed.vue';
import AreaChart from '../components/charts/AreaChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import DatasetToggles from '../components/widgets/DatasetToggles.vue';
import MetricCard from '../components/common/MetricCard.vue';
import QuickFilters from '../components/widgets/QuickFilters.vue';
import RealTimeChart from '../components/charts/RealTimeChart.vue';
import { formatMetric } from '../lib/formatters';
import { useTelemetryStore } from '../stores/useTelemetryStore';
const store = useTelemetryStore();
const metricCards = computed(() => {
    const points = store.visiblePoints;
    const latest = points[points.length - 1];
    const previous = points[Math.max(0, points.length - 8)];
    if (!latest)
        return [];
    const card = (label, key, unit, inverse = false) => {
        const value = Number(latest[key]);
        const old = Number(previous?.[key] ?? value);
        const delta = old === 0 ? 0 : ((value - old) / old) * 100;
        const good = inverse ? delta < 0 : delta > 0;
        const tone = Math.abs(delta) < 1 ? 'neutral' : good ? 'good' : delta > 12 ? 'bad' : 'warn';
        return {
            label,
            value: formatMetric(value, key === 'errorRate' ? 2 : 1),
            unit,
            delta: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`,
            tone
        };
    };
    return [
        card('Throughput', 'throughput', 'req/s'),
        card('Latency', 'latency', 'ms', true),
        card('Error Rate', 'errorRate', '%', true),
        card('CPU Load', 'cpu', '%', true)
    ];
});
const barDatasets = computed(() => store.datasets.filter((dataset) => ['attacks', 'errorRate', 'memory'].includes(dataset.id)));
const areaDatasets = computed(() => store.datasets.filter((dataset) => ['cpu', 'memory'].includes(dataset.id)));
onMounted(() => {
    document.documentElement.dataset.theme = store.theme;
    store.connect();
});
onBeforeUnmount(store.disconnect);
watch(() => store.theme, (theme) => {
    document.documentElement.dataset.theme = theme;
}, { immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof QuickFilters, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(QuickFilters, new QuickFilters({
    ...{ 'onPause': {} },
    ...{ 'onResume': {} },
    ...{ 'onRetry': {} },
    ...{ 'onRange': {} },
    ...{ 'onChart': {} },
    ...{ 'onTheme': {} },
    paused: (__VLS_ctx.store.paused),
    status: (__VLS_ctx.store.status),
    timeRange: (__VLS_ctx.store.timeRange),
    chartKind: (__VLS_ctx.store.chartKind),
    theme: (__VLS_ctx.store.theme),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onPause': {} },
    ...{ 'onResume': {} },
    ...{ 'onRetry': {} },
    ...{ 'onRange': {} },
    ...{ 'onChart': {} },
    ...{ 'onTheme': {} },
    paused: (__VLS_ctx.store.paused),
    status: (__VLS_ctx.store.status),
    timeRange: (__VLS_ctx.store.timeRange),
    chartKind: (__VLS_ctx.store.chartKind),
    theme: (__VLS_ctx.store.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onPause: (__VLS_ctx.store.pause)
};
const __VLS_7 = {
    onResume: (__VLS_ctx.store.resume)
};
const __VLS_8 = {
    onRetry: (__VLS_ctx.store.retry)
};
const __VLS_9 = {
    onRange: (__VLS_ctx.store.setRange)
};
const __VLS_10 = {
    onChart: (__VLS_ctx.store.setChartKind)
};
const __VLS_11 = {
    onTheme: (__VLS_ctx.store.setTheme)
};
var __VLS_2;
if (__VLS_ctx.store.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "notice" },
    });
    (__VLS_ctx.store.error);
    (__VLS_ctx.store.malformedCount);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "metrics-grid" },
});
for (const [metric] of __VLS_getVForSourceType((__VLS_ctx.metricCards))) {
    /** @type {[typeof MetricCard, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(MetricCard, new MetricCard({
        key: (metric.label),
        label: (metric.label),
        value: (metric.value),
        unit: (metric.unit),
        delta: (metric.delta),
        tone: (metric.tone),
    }));
    const __VLS_13 = __VLS_12({
        key: (metric.label),
        label: (metric.label),
        value: (metric.value),
        unit: (metric.unit),
        delta: (metric.delta),
        tone: (metric.tone),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "dashboard-grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-column" },
});
/** @type {[typeof RealTimeChart, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(RealTimeChart, new RealTimeChart({
    title: "Streaming Performance",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.store.selectedDatasetOptions),
    kind: (__VLS_ctx.store.chartKind),
}));
const __VLS_16 = __VLS_15({
    title: "Streaming Performance",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.store.selectedDatasetOptions),
    kind: (__VLS_ctx.store.chartKind),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "split-grid" },
});
/** @type {[typeof AreaChart, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(AreaChart, new AreaChart({
    title: "Resource Saturation",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.areaDatasets),
}));
const __VLS_19 = __VLS_18({
    title: "Resource Saturation",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.areaDatasets),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
/** @type {[typeof BarChart, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(BarChart, new BarChart({
    title: "Risk Distribution",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.barDatasets),
}));
const __VLS_22 = __VLS_21({
    title: "Risk Distribution",
    points: (__VLS_ctx.store.visiblePoints),
    datasets: (__VLS_ctx.barDatasets),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "side-column" },
});
/** @type {[typeof DatasetToggles, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(DatasetToggles, new DatasetToggles({
    ...{ 'onToggle': {} },
    datasets: (__VLS_ctx.store.datasets),
    selected: (__VLS_ctx.store.selectedDatasets),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onToggle': {} },
    datasets: (__VLS_ctx.store.datasets),
    selected: (__VLS_ctx.store.selectedDatasets),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onToggle: (__VLS_ctx.store.toggleDataset)
};
var __VLS_26;
/** @type {[typeof ActivityFeed, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(ActivityFeed, new ActivityFeed({
    ...{ 'onQuery': {} },
    ...{ 'onSeverity': {} },
    events: (__VLS_ctx.store.filteredEvents),
    query: (__VLS_ctx.store.query),
    severity: (__VLS_ctx.store.severity),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onQuery': {} },
    ...{ 'onSeverity': {} },
    events: (__VLS_ctx.store.filteredEvents),
    query: (__VLS_ctx.store.query),
    severity: (__VLS_ctx.store.severity),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
let __VLS_36;
const __VLS_37 = {
    onQuery: (...[$event]) => {
        __VLS_ctx.store.query = $event;
    }
};
const __VLS_38 = {
    onSeverity: (...[$event]) => {
        __VLS_ctx.store.severity = $event;
    }
};
var __VLS_33;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['metrics-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['main-column']} */ ;
/** @type {__VLS_StyleScopedClasses['split-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['side-column']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ActivityFeed: ActivityFeed,
            AreaChart: AreaChart,
            BarChart: BarChart,
            DatasetToggles: DatasetToggles,
            MetricCard: MetricCard,
            QuickFilters: QuickFilters,
            RealTimeChart: RealTimeChart,
            store: store,
            metricCards: metricCards,
            barDatasets: barDatasets,
            areaDatasets: areaDatasets,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
