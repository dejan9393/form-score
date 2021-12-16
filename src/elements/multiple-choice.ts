import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@material/mwc-formfield';
import '@material/mwc-radio';

type Option = {
  label: string;
  value: number;
}

@customElement('multiple-choice')
export class MultipleChoice extends LitElement {
  @property({type: Array})
  options: Option[] = [];

  @property({type: Number})
  value: number = 0;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
  `;

  onChange(e: any) {
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
    return html`
      ${this.options.map(option =>
        html`<mwc-formfield label="${option.label}">
          <mwc-radio name="values" value="${option.value}" @change="${this.onChange}" .checked="${true}"></mwc-radio>
        </mwc-formfield>`
      )}
    `;
  }
}
