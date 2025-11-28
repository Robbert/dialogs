customElements.define(
  'live-countdown',
  class LiveCountdownElement extends HTMLElement {
    start = 0;
    end = 0;
    delta = 0;
    progress = 0;
    constructor() {
      super();
      this.start = Date.now();
      // Convert `seconds` to milliseconds
      this.duration = Number.parseInt(this.getAttribute('seconds'), 10) * 1000;
      setInterval(() => {
        this.tick();
        this.render();
      }, 1000);
    }
    tick() {
      this.now = Date.now();
      this.delta = this.now - this.start;
      this.progress = Math.min(this.delta, this.duration);
      this.countdown = this.duration - this.progress;
    }
    render() {
      this.innerHTML = `${Math.round(this.countdown / 1000)} seconden`;
    }
  },
);
