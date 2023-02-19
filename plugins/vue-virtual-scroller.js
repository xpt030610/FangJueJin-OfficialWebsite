import { createApp } from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default defineNuxtPlugin(({ app }) => {
    createApp(app).use(VueVirtualScroller);
});
// import VueVirtualScroller from 'vue-virtual-scroller'

// app.use(VueVirtualScroller)
