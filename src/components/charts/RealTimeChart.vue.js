import { computed, onBeforeUnmount, ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
const canvas = ref(null);
const hover = ref(null);
let frame = 0;
let ro = null;
const empty = computed(() => props.points.length < 2 || props.datasets.length === 0);
function scale(value, min, max, height) {
    if (max === min)
        return height / 2;
    return height - ((value - min) / (max - min)) * height;
}
function draw() {
    const target = canvas.value;
    if (!target)
        return;
    const rect = target.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    target.width = Math.max(1, Math.floor(rect.width * dpr));
    target.height = Math.max(1, Math.floor(rect.height * dpr));
    const ctx = target.getContext('2d');
    if (!ctx)
        return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    const pad = { top: 18, right: 18, bottom: 28, left: 42 };
    const width = rect.width - pad.left - pad.right;
    const height = rect.height - pad.top - pad.bottom;
    const sampleEvery = Math.max(1, Math.floor(props.points.length / 360));
    const points = props.points.filter((_, index) => index % sampleEvery === 0);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid');
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
        const y = pad.top + (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + width, y);
        ctx.stroke();
    }
    props.datasets.forEach((dataset, datasetIndex) => {
        const values = points.map((point) => Number(point[dataset.id]));
        const min = Math.min(...values);
        const max = Math.max(...values);
        const rangePadding = Math.max(1, (max - min) * 0.12);
        const adjustedMin = min - rangePadding;
        const adjustedMax = max + rangePadding;
        if (props.kind === 'bar') {
            const barWidth = Math.max(2, width / Math.max(1, points.length) / props.datasets.length);
            ctx.fillStyle = dataset.color;
            ctx.globalAlpha = 0.64;
            points.forEach((point, index) => {
                const x = pad.left + (index / Math.max(1, points.length - 1)) * width + datasetIndex * barWidth;
                const y = pad.top + scale(Number(point[dataset.id]), adjustedMin, adjustedMax, height);
                ctx.fillRect(x, y, barWidth, pad.top + height - y);
            });
            ctx.globalAlpha = 1;
            return;
        }
        const path = new Path2D();
        points.forEach((point, index) => {
            const x = pad.left + (index / Math.max(1, points.length - 1)) * width;
            const y = pad.top + scale(Number(point[dataset.id]), adjustedMin, adjustedMax, height);
            if (index === 0)
                path.moveTo(x, y);
            else
                path.lineTo(x, y);
        });
        if (props.kind === 'area') {
            const area = new Path2D(path);
            area.lineTo(pad.left + width, pad.top + height);
            area.lineTo(pad.left, pad.top + height);
            area.closePath();
            const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + height);
            gradient.addColorStop(0, `${dataset.color}66`);
            gradient.addColorStop(1, `${dataset.color}08`);
            ctx.fillStyle = gradient;
            ctx.fill(area);
        }
        ctx.strokeStyle = dataset.color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.stroke(path);
    });
    if (hover.value) {
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted');
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(hover.value.x, pad.top);
        ctx.lineTo(hover.value.x, pad.top + height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}
function scheduleDraw() {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(draw);
}
function inspect(event) {
    const target = canvas.value;
    if (!target || props.points.length === 0)
        return;
    const rect = target.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 42) / Math.max(1, rect.width - 60)));
    const index = Math.min(props.points.length - 1, Math.max(0, Math.round(ratio * (props.points.length - 1))));
    hover.value = { x: event.clientX - rect.left, y: event.clientY - rect.top, point: props.points[index] };
    emit('inspect', props.points[index]);
    scheduleDraw();
}
function leave() {
    hover.value = null;
    emit('inspect', null);
    scheduleDraw();
}
watch(() => [props.points, props.datasets, props.kind], scheduleDraw, { deep: false, immediate: true });
watch(canvas, (target) => {
    if (!target)
        return;
    ro = new ResizeObserver(scheduleDraw);
    ro.observe(target);
});
onBeforeUnmount(() => {
    window.cancelAnimationFrame(frame);
    ro?.disconnect();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "panel chart-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.points.length.toLocaleString());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "legend" },
});
for (const [dataset] of __VLS_getVForSourceType((__VLS_ctx.datasets))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (dataset.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ style: ({ background: dataset.color }) },
    });
    (dataset.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-wrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ...{ onMousemove: (__VLS_ctx.inspect) },
    ...{ onMouseleave: (__VLS_ctx.leave) },
    ref: "canvas",
});
/** @type {typeof __VLS_ctx.canvas} */ ;
if (__VLS_ctx.empty) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty-state" },
    });
}
if (__VLS_ctx.hover) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tooltip" },
        ...{ style: ({ left: `${__VLS_ctx.hover.x + 12}px`, top: `${__VLS_ctx.hover.y + 12}px` }) },
    });
    (new Date(__VLS_ctx.hover.point.timestamp).toLocaleTimeString());
}
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
/** @type {__VLS_StyleScopedClasses['legend']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            canvas: canvas,
            hover: hover,
            empty: empty,
            inspect: inspect,
            leave: leave,
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
