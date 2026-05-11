import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import SettingsView from '../views/SettingsView.vue';
export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: DashboardView },
        { path: '/analytics', name: 'analytics', component: AnalyticsView },
        { path: '/settings', name: 'settings', component: SettingsView }
    ]
});
