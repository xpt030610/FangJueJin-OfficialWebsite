import { marked } from 'marked';

export default defineNuxtPlugin((app) => {
    app.markdownToHtml = (markdown) => {
        return marked(markdown, { sanitize: true });
    };
});
