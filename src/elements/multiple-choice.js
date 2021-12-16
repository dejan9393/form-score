import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/mwc-formfield';
import '@material/mwc-radio';
let MultipleChoice = class MultipleChoice extends LitElement {
    constructor() {
        super(...arguments);
        this.options = [];
        this.value = 0;
    }
    onChange(e) {
        this.value = parseFloat(e.target.value);
        this.dispatchEvent(new CustomEvent('value-changed', {
            detail: {
                value: this.value,
            },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      ${this.options.map(option => html `<mwc-formfield label="${option.label}">
          <mwc-radio name="values" value="${option.value}" @change="${this.onChange}" .checked="${this.value === option.value}"></mwc-radio>
        </mwc-formfield>`)}
    `;
    }
};
MultipleChoice.styles = css `
    :host {
      display: flex;
      flex-direction: column;
    }
  `;
__decorate([
    property({ type: Array })
], MultipleChoice.prototype, "options", void 0);
__decorate([
    property({ type: Number })
], MultipleChoice.prototype, "value", void 0);
MultipleChoice = __decorate([
    customElement('multiple-choice')
], MultipleChoice);
export { MultipleChoice };
//# sourceMappingURL=multiple-choice.js.map