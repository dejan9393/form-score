import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import "./elements/multiple-choice";
import '@material/mwc-button';
import './elements/form-score-card';
import './elements/sign-here';
export class FormScore extends LitElement {
    constructor() {
        super(...arguments);
        this.result = '';
        this.extraMsg = '';
        this.questions = [];
        this.title = '';
    }
    async connectedCallback() {
        var _a;
        super.connectedCallback();
        const formConfig = await this.loadFormConfig();
        this.title = (_a = formConfig.title) !== null && _a !== void 0 ? _a : "Form";
        this.questions = formConfig.questions;
    }
    loadFormConfig() {
        return fetch("questions.json").then(response => response.json());
    }
    get multipleChoiceElements() {
        return Array.from(this.shadowRoot.querySelectorAll('multiple-choice'));
    }
    calculateScore() {
        const multipleChoices = this.multipleChoiceElements;
        return multipleChoices.reduce((acc, val) => acc + val.value, 0);
    }
    showResults() {
        const score = this.calculateScore();
        if (score > 11 && score < 21) {
            this.extraMsg = "That means you're a gemini";
        }
        else if (score > 20) {
            this.extraMsg = "That means you're an aquarius";
        }
        else {
            this.extraMsg = "That means you tested positive for being INCREDIBLE 😎";
        }
        this.result = `You scored: ${score}`;
    }
    render() {
        return html `
      <h2 style="margin-bottom: 32px;">${this.title}</h2>
      <form-score-card outlined>
        ${this.questions.map(question => {
            var _a;
            return html `
            <div class="question-container">
              <h5>${question.title}</h5>
              <span class="md-body-text">${(_a = question.description) !== null && _a !== void 0 ? _a : null}</span>
              <multiple-choice .options="${question.answers}" value=""></multiple-choice>
            </div>
          `;
        })}

        <span>By signing here, I acknowledge that my answers are truthful and accurate</span>
        <sign-here width="420"></sign-here>

        <mwc-button raised @click=${this.showResults} label="Calculate score"></mwc-button>

        ${this.result ?
            html `<h5 style="margin-top: 16px;">${this.result}</h5>
          <span class="md-body-text">${this.extraMsg}</span>`
            : null}
      </form-score-card>
    `;
    }
}
FormScore.styles = css `
    :host {
      min-height: 100vh;
      font-family: Roboto, sans-serif;
      color: #1a2b42;
      margin: 0 auto;
      background-color: var(--form-score-background-color);
      display: flex;
      flex-direction: column;
      width: 630px;
      margin: 0 auto;
    }

    span, .md-body-text {
      -webkit-font-smoothing: antialiased;
      font-size: .875rem;
      line-height: 1.25rem;
      font-weight: 400;
      opacity: .6;
      letter-spacing: .02em;
    }

    .question-container {
      margin-bottom: 8px;
    }

    h1 {
      margin: 8px 0;
      font-size: 96px;
      letter-spacing: -1.5px;
      font-weight: 100;
    }

    h2 {
      margin: 8px 0;
      font-size: 60px;
      letter-spacing: -0.5px;
      font-weight: 100;
    }

    h3 {
      margin: 8px 0;
      font-size: 48px;
      font-weight: normal;
    }

    h4 {
      margin: 8px 0;
      font-size: 34px;
      font-weight: normal;
      letter-spacing: 0.25px;
    }

    h5 {
      margin: 8px 0;
      font-size: 24px;
      font-weight: normal;
    }

    h6 {
      margin: 8px 0;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.15px;
    }

    sign-here::part(canvas) {
      border: 1px solid black;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  `;
__decorate([
    property({ type: String })
], FormScore.prototype, "result", void 0);
__decorate([
    property({ type: String })
], FormScore.prototype, "extraMsg", void 0);
__decorate([
    property({ type: Array })
], FormScore.prototype, "questions", void 0);
__decorate([
    property({ type: String })
], FormScore.prototype, "title", void 0);
//# sourceMappingURL=FormScore.js.map