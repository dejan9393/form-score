import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('form-score-card')
export class FormScoreCard extends LitElement {
  @property({type: String})
  title = '';

  static styles = css`
    :host {
      font-family: Roboto, sans-serif;
    }

    #container {
      padding: 16px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    #title {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-size: 1.25rem;
      line-height: 2rem;
      font-weight: 500;
      letter-spacing: .0125em;
      text-decoration: inherit;
      text-transform: inherit;
    }
  `;

  render() {
    return html`
      <div id="container">
        ${this.title ? html`<div id="title">${this.title}</div>` : null}
        <slot></slot>
      </div>
    `;
  }
}
