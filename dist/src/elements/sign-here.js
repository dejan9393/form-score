import { __decorate } from "tslib";
import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import SignaturePad from 'signature_pad';
let SignHere = class SignHere extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Width of the signature pad in pixels
         */
        this.width = 360;
        /**
         * Height of the signature pad in pixels
         */
        this.height = 180;
        /**
         * Radius of a single dot
         */
        this.dotSize = 0;
        /**
         * Minimum width of a line. Defaults to 0.5
         */
        this.minWidth = 0.5;
        /**
         * Maximum width of a line. Defaults to 2.5
         */
        this.maxWidth = 2.5;
        /**
         * Draw the next point at most once per every x milliseconds.
         * Set it to 0 to turn off throttling.
         * Defaults to 16.
         */
        this.throttle = 16;
        /**
         * Add the next point only if the previous one is farther than x pixels.
         * Defaults to 5.
         */
        this.minDistance = 5;
        /**
         * Color used to clear the background.
         * Can be any color format accepted by context.fillStyle.
         * Defaults to "rgba(0,0,0,0)" (transparent black).
         * Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white)
         * if you'd like to save signatures as JPEG images.
         */
        this.backgroundColor = 'rgb(255, 255, 255)';
        /**
         * Color used to draw the lines.
         * Can be any color format accepted by context.fillStyle.
         * Defaults to "black".
         */
        this.penColor = 'rgb(0, 0, 0)';
        /**
         * Weight used to modify new velocity based on the previous velocity. Defaults to 0.7
         */
        this.velocityFilterWeight = 0.7;
        /**
         * toDataUrl encoding format
         */
        this.type = 'image/png';
        /**
         * toDataUrl encoding image quality between 0 and 1
         */
        this.encoderOptions = 0.85;
        /**
         * Data uri encoded image data
         */
        this.image = '';
        /**
         * Indicates if the signature pad is currently active
         */
        this.active = false;
    }
    render() {
        return html `
      <canvas id="canvas" part="canvas"></canvas>`;
    }
    willUpdate(changedProps) {
        super.willUpdate(changedProps);
        const signaturePadProperties = [
            'dotSize',
            'minWidth',
            'maxWidth',
            'backgroundColor',
            'penColor',
            'velocityFilterWeight',
        ];
        const dimensionProps = [
            'width',
            'height',
        ];
        if (!this.signaturePad) {
            return;
        }
        signaturePadProperties.forEach(prop => {
            if (!changedProps.has(prop)) {
                return;
            }
            this.signaturePad[prop] = changedProps.get(prop);
        });
        dimensionProps.forEach(prop => {
            if (!changedProps.has(prop)) {
                return;
            }
            this.setCanvasDimensions();
        });
        if (changedProps.has('type') || changedProps.has('encoderOptions')) {
            this.encodeImage();
        }
    }
    get empty() {
        return this.signaturePad.isEmpty();
    }
    get canvas() {
        return this.shadowRoot.querySelector('#canvas');
    }
    firstUpdated(changedProps) {
        super.firstUpdated(changedProps);
        this.setCanvasDimensions();
        this.signaturePad = new SignaturePad(this.canvas, {
            dotSize: this.dotSize,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            backgroundColor: this.backgroundColor,
            penColor: this.penColor,
            velocityFilterWeight: this.velocityFilterWeight,
        });
        this.signaturePad.addEventListener('beginStroke', () => this.active = true);
        this.signaturePad.addEventListener('endStroke', () => this.active = false);
        this.signaturePad.clear();
        if (this.image) {
            this.signaturePad.fromDataURL(this.image);
        }
    }
    setCanvasDimensions() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = this.canvas;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';
        canvas.width = this.width * ratio;
        canvas.height = this.height * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        this.clear();
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.signaturePad) {
            this.signaturePad.on();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.signaturePad.off();
    }
    /**
     * Clears the image
     */
    clear() {
        if (!this.signaturePad) {
            return;
        }
        this.signaturePad.clear();
        this.encodeImage();
    }
    /**
     * Encodes the image using the type and encoderOptions (quality) defined.
     * The encoded image is available in the `image` property.
     */
    encodeImage() {
        this.image = this.empty ? '' : this.canvas.toDataURL(this.type, this.encoderOptions);
    }
};
__decorate([
    property({ type: Number })
], SignHere.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "height", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "dotSize", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "maxWidth", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "throttle", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "minDistance", void 0);
__decorate([
    property({ type: String })
], SignHere.prototype, "backgroundColor", void 0);
__decorate([
    property({ type: String })
], SignHere.prototype, "penColor", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "velocityFilterWeight", void 0);
__decorate([
    property({ type: String })
], SignHere.prototype, "type", void 0);
__decorate([
    property({ type: Number })
], SignHere.prototype, "encoderOptions", void 0);
__decorate([
    property({ type: String })
], SignHere.prototype, "image", void 0);
__decorate([
    property({ type: Boolean, state: true })
], SignHere.prototype, "active", void 0);
SignHere = __decorate([
    customElement('sign-here')
], SignHere);
export { SignHere };
//# sourceMappingURL=sign-here.js.map