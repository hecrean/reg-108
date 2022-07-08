const cssLabel = (summary: string, detail: string): HTMLElement => {
	const container = document.createElement('div');
	container.setAttribute('class', 'three-label-container');
	container.innerHTML = /*html*/ `
  <details class='three-label-details'>
  <summary class='three-label-summary'>${summary}</summary>
  ${detail}
  </details>`;
	return container;
};

export { cssLabel };
