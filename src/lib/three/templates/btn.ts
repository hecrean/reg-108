// Import stylesheets
import styles from './btn.module.scss';

type CssLabelTemplate =
	`<details class=${string}><summary class=${string}>${string}</summary>${string}</details>`;

const cssLabel = (summary: string, details: string) => {
	const template: CssLabelTemplate = `<details class=${styles.css_label_detail}><summary class=${styles.css_label_summary}>${summary}</summary>${details}</details>`;
	const container = document.createElement('div');
	container.innerHTML = template;
	return container;
};

export { cssLabel };
