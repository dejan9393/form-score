import {customElement, property} from "lit/decorators.js";
import {html, LitElement, PropertyValues} from "lit";
import SignaturePad from 'signature_pad';

@customElement('sign-here')
export class SignHere extends LitElement {
  /**
   * Width of the signature pad in pixels
   */
  @property({type: Number})
  width = 360;

  /**
   * Height of the signature pad in pixels
   */
  @property({type: Number})
  height = 180;

  /**
   * Radius of a single dot
   */
  @property({type: Number})
  dotSize = 0;

  /**
   * Minimum width of a line. Defaults to 0.5
   */
  @property({type: Number})
  minWidth = 0.5;

  /**
   * Maximum width of a line. Defaults to 2.5
   */
  @property({type: Number})
  maxWidth = 2.5;

  /**
   * Draw the next point at most once per every x milliseconds.
   * Set it to 0 to turn off throttling.
   * Defaults to 16.
   */
  @property({type: Number})
  throttle = 16;

  /**
   * Add the next point only if the previous one is farther than x pixels.
   * Defaults to 5.
   */
  @property({type: Number})
  minDistance = 5;

  /**
   * Color used to clear the background.
   * Can be any color format accepted by context.fillStyle.
   * Defaults to "rgba(0,0,0,0)" (transparent black).
   * Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white)
   * if you'd like to save signatures as JPEG images.
   */
  @property({type: String})
  backgroundColor = 'rgb(255, 255, 255)';

  /**
   * Color used to draw the lines.
   * Can be any color format accepted by context.fillStyle.
   * Defaults to "black".
   */
  @property({type: String})
  penColor = 'rgb(0, 0, 0)';

  /**
   * Weight used to modify new velocity based on the previous velocity. Defaults to 0.7
   */
  @property({type: Number})
  velocityFilterWeight = 0.7;

  /**
   * toDataUrl encoding format
   */
  @property({type: String})
  type = 'image/png';

  /**
   * toDataUrl encoding image quality between 0 and 1
   */
  @property({type: Number})
  encoderOptions = 0.85;

  /**
   * Data uri encoded image data
   */
  @property({type: String})
  image = '';

  /**
   * Indicates if the signature pad is currently active
   */
  @property({type: Boolean, state: true})
  protected active = false;

  protected signaturePad: any;

  render() {
    return html`
      <canvas id="canvas" part="canvas"></canvas>`;
  }

  willUpdate(changedProps: PropertyValues) {
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
    })

    if (changedProps.has('type') || changedProps.has('encoderOptions')) {
      this.encodeImage();
    }
  }

  get empty() {
    return this.signaturePad.isEmpty();
  }

  get canvas() {
    return this.shadowRoot!.querySelector('#canvas') as HTMLCanvasElement;
  }

  protected firstUpdated(changedProps: PropertyValues) {
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

    this.signaturePad.addEventListener('beginStroke', () =>
      this.active = true
    );

    this.signaturePad.addEventListener('endStroke', () =>
      this.active = false
    );

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
    canvas.getContext("2d")!.scale(ratio, ratio);

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
}
