class ShadowComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.render();
        this._initialize();
    }

    _initialize() {
        // 註冊 postMessage 訊息處理器
        window.addEventListener("message", (event) => {
            // 處理從 <iframe> 來的訊息
            // console.log("接收到來自 iframe 的訊息：", event.data);
            if (event.data.type === "result") {
                const triggerButton = this.shadowRoot.querySelector(".ai-pd-container__trigger");
                if (event.data.value) {
                    triggerButton.classList.add("ai-pd-container__trigger--result");
                } else {
                    triggerButton.classList.remove("ai-pd-container__trigger--result");
                }
            }
            if (event.data.type === "closeModal") {
                if (event.data.value) {
                    const triggerButton = this.shadowRoot.querySelector(".ai-pd-container__trigger");
                    const inffitsCblocKoverlay = this.shadowRoot.querySelector("#inffits_cblock--pd--overlay");
                    if (triggerButton && inffitsCblocKoverlay) {
                        $(inffitsCblocKoverlay).fadeOut(); // 隱藏 overlay
                        triggerButton.classList.toggle("ai-pd-container__trigger--search");
                        triggerButton.classList.toggle("ai-pd-container__trigger--close");
                    }
                }
            }
        });
    }

    async render() {
        const shadow = this.shadowRoot;

        // 引入 Bootstrap CSS 和 jQuery，並附加至 shadow DOM
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';

        const jqScript = document.createElement('script');
        jqScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        jqScript.defer = true;

        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.defer = true;

        const customIframeStyle = document.createElement('style');
        customIframeStyle.textContent = `
        @charset "UTF-8";
/* figtree-latin-300-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 300;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-300-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-300-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-400-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-400-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-400-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-500-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-500-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-500-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-600-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 600;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-600-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-600-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-700-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-700-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-700-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-800-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 800;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-800-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-800-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* figtree-latin-900-normal */
@font-face {
  font-family: "Figtree";
  font-style: normal;
  font-display: swap;
  font-weight: 900;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-900-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/figtree@latest/latin-900-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-300-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 300;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-300-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-300-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-400-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-400-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-400-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-500-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-500-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-500-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-600-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 600;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-600-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-600-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-700-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-700-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-700-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-800-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 800;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-800-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-800-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* noto-sans-tc-latin-900-normal */
@font-face {
  font-family: "Noto Sans TC";
  font-style: normal;
  font-display: swap;
  font-weight: 900;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-900-normal.woff2) format("woff2"), url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-tc@latest/latin-900-normal.woff) format("woff");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
html,
body {
  box-shadow: none;
}

.ai-pd-container {
  position: relative;
}
@media screen and (min-width: 480px) {
  .ai-pd-container #inffits_cblock--pd {
    margin: 0 !important;
    top: unset !important;
    right: unset !important;
    left: 1vw !important;
  }
}
.ai-pd-container .ai-pd-container__trigger {
  z-index: 99999992;
  position: fixed;
  // left: 12px;
  // bottom: 12px;
  left: 16px;
  bottom: 80px;
  display: flex;
  box-sizing: border-box;
  padding: 14px;
  justify-content: center;
  margin: 0;
  align-items: center;
  flex-shrink: 0;
  border-radius: 21px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border: none;
}
.ai-pd-container .ai-pd-container__trigger:hover, .ai-pd-container .ai-pd-container__trigger:active {
  cursor: pointer;
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger {
    width: 70px;
    height: 70px;
    padding: 15px;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    -ms-border-radius: 25px;
    -o-border-radius: 25px;
    box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.18), 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
    -webkit-backdrop-filter: blur(40px);
            backdrop-filter: blur(40px);
    --webkit-backdrop-filter: blur(40px);
  }
}
.ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result):hover .ai-pd-container__icon, .ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result):active .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3305_2871)%22%3E%3Cpath%20d%3D%22M5.24895%2019.1485C7.59554%2025.3933%2014.5602%2028.5533%2020.8049%2026.2067C27.0496%2023.8602%2030.2097%2016.8955%2027.8631%2010.6508C25.5165%204.40604%2018.5519%201.24597%2012.3072%203.59256C6.06243%205.93914%202.90236%2012.9038%205.24895%2019.1485Z%22%20fill%3D%22url(%23paint0_linear_3305_2871)%22%2F%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%231E1E19%22%20stroke%3D%22%231E1E19%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear_3305_2871%22%20x1%3D%2212.3072%22%20y1%3D%223.59256%22%20x2%3D%2220.1721%22%20y2%3D%2224.5227%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23F9FE9F%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23CBE2E2%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0_3305_2871%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3Cg%20filter%3D%22url(%23filter0_b_3305_3475)%22%3E%3Cellipse%20cx%3D%2216.9998%22%20cy%3D%2215.8828%22%20rx%3D%2213.3714%22%20ry%3D%2213.3714%22%20fill%3D%22%23FCFCF8%22%20fill-opacity%3D%220.3%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%233C3C39%22%20stroke%3D%22%233C3C39%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_b_3305_3475%22%20x%3D%22-28.3716%22%20y%3D%22-29.4886%22%20width%3D%2290.7427%22%20height%3D%2290.7429%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2216%22%2F%3E%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3305_3475%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3305_3475%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.ai-pd-container .ai-pd-container__trigger .ai-pd-container__icon--alert {
  display: none;
}
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--search) .ai-pd-container__icon {
   background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3305_2871)%22%3E%3Cpath%20d%3D%22M5.24895%2019.1485C7.59554%2025.3933%2014.5602%2028.5533%2020.8049%2026.2067C27.0496%2023.8602%2030.2097%2016.8955%2027.8631%2010.6508C25.5165%204.40604%2018.5519%201.24597%2012.3072%203.59256C6.06243%205.93914%202.90236%2012.9038%205.24895%2019.1485Z%22%20fill%3D%22url(%23paint0_linear_3305_2871)%22%2F%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%231E1E19%22%20stroke%3D%22%231E1E19%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear_3305_2871%22%20x1%3D%2212.3072%22%20y1%3D%223.59256%22%20x2%3D%2220.1721%22%20y2%3D%2224.5227%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23F9FE9F%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23CBE2E2%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0_3305_2871%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--close) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3Cg%20filter%3D%22url(%23filter0_b_3305_3475)%22%3E%3Cellipse%20cx%3D%2216.9998%22%20cy%3D%2215.8828%22%20rx%3D%2213.3714%22%20ry%3D%2213.3714%22%20fill%3D%22%23FCFCF8%22%20fill-opacity%3D%220.3%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%233C3C39%22%20stroke%3D%22%233C3C39%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_b_3305_3475%22%20x%3D%22-28.3716%22%20y%3D%22-29.4886%22%20width%3D%2290.7427%22%20height%3D%2290.7429%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2216%22%2F%3E%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3305_3475%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3305_3475%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.ai-pd-container .ai-pd-container__trigger--result .ai-pd-container__icon--alert {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger--result .ai-pd-container__icon--alert {
    width: 20px;
    height: 20px;
  }
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) {
  background: rgba(255, 255, 255, 0.85);
  padding: 16px;
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) {
    padding: 21px;
  }
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result):hover .ai-pd-container__icon, .ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result):active .ai-pd-container__icon {
  opacity: 1;
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.5'%3e%3cpath d='M15 5L5 15' stroke='%233B3B32' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M5 5L15 15' stroke='%233B3B32' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e ");
  opacity: 0.5;
}
.ai-pd-container .ai-pd-container__trigger .ai-pd-container__icon {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease-out;
  -webkit-transition: opacity 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out;
  -ms-transition: opacity 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out;
}

#loadingbar_recom.mbinfo {
  width: 100%;
}
#loadingbar_recom.mbinfo .intro-modal__logo img {
  max-width: 106px;
}
@media screen and (min-width: 480px) {
  #loadingbar_recom.mbinfo .intro-modal__logo img {
    max-width: 135px;
  }
}

.intro-modal {
  position: relative;
  height: 100% !important;
}
.intro-modal .intro-content {
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  width: 100% !important;
  max-height: 355px;
}
@media screen and (min-width: 480px) {
  .intro-modal .intro-content {
    max-height: 480px;
  }
}
.intro-modal__logo {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.intro-modal__logo--inf {
  max-width: 80px;
  padding-top: 10vh;
}
@media screen and (min-width: 480px) {
  .intro-modal__logo--inf {
    max-width: 100px;
  }
}
.intro-modal__logo img {
  width: 100%;
  max-width: 112px;
  height: auto;
}
@media screen and (min-width: 480px) {
  .intro-modal__logo img {
    max-width: 142px;
  }
}
.intro-modal__title {
  color: #3b3b32;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.64px;
  font-family: "Chocolate Classical Sans", "Figtree";
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 0;
  color: #1e1e19;
  text-align: center;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 120% */
  letter-spacing: 0.6px;
}
@media screen and (min-width: 480px) {
  .intro-modal__title {
    color: #1e1e19;
    text-align: center;
    font-family: "Noto Sans TC", "Figtree", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 111.111% */
    letter-spacing: 1.44px;
  }
}
.intro-modal__btn--start {
  display: flex;
  height: 40px;
  padding: 10px 0;
  width: 150px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 100px !important;
  background: #1e1e19;
  color: #fcfcf8;
  text-align: center;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 17px; /* 113.333% */
  letter-spacing: 0.9px;
  position: relative;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
}
.intro-modal__btn--start:hover {
  background-color: #3c3c39;
  cursor: pointer;
}
.intro-modal__btn--start .intro-modal__btn--arrow {
  position: absolute;
  right: 10px;
}
@media screen and (min-width: 480px) {
  .intro-modal__btn--start {
    height: 45px;
    font-size: 17px;
    line-height: 19px; /* 111.765% */
    letter-spacing: 0.85px;
  }
}
.intro-modal__btn--start:active {
  box-shadow: none;
  transform: translateY(3px);
}
@media screen and (min-width: 480px) {
  .intro-modal__btn--start:active {
    transform: translateY(4px);
  }
}
.intro-modal__icon {
  margin: auto !important;
  width: 98%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
}
@media screen and (min-width: 480px) {
  .intro-modal__icon {
    width: 95%;
    margin-bottom: 12px !important;
  }
}
.intro-modal__icon--reminder {
  position: relative;
}
.intro-modal__icon--reminder .icon-reminder {
  position: relative;
  background-color: #f3f3ef;
  border-radius: 100%;
  display: flex;
  width: 36px;
  height: 36px;
  padding: 7.88px;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_50941)%22%3E%3Cpath%20d%3D%22M15.1607%2010.7192C15.7303%209.90444%2016.0625%208.91172%2016.0625%207.83594C16.0625%205.0397%2013.7962%202.77344%2011%202.77344C8.20376%202.77344%205.9375%205.0397%205.9375%207.83594C5.9375%208.91172%206.26973%209.90444%206.83926%2010.7192C6.9856%2010.9288%207.15962%2011.1661%207.34551%2011.4192C7.85571%2012.1193%208.46479%2012.9578%208.91963%2013.7844C9.33096%2014.5358%209.54058%2015.3189%209.64341%2016.0585L7.71729%2016.0625C7.63027%2015.5879%207.48394%2015.1251%207.25059%2014.698C6.85903%2013.9861%206.37256%2013.3177%205.88608%2012.6493C5.68042%2012.3685%205.47476%2012.0876%205.277%2011.8029C4.49785%2010.6796%204.03906%209.31118%204.03906%207.83594C4.03906%203.9916%207.15566%200.875%2011%200.875C14.8443%200.875%2017.9609%203.9916%2017.9609%207.83594C17.9609%209.31118%2017.5021%2010.6796%2016.719%2011.8029C16.5213%2012.0876%2016.3156%2012.3685%2016.11%2012.6493C15.6235%2013.3137%2015.137%2013.9821%2014.7455%2014.698C14.5121%2015.1251%2014.3658%2015.5879%2014.2788%2016.0625H12.3566C12.4594%2015.3229%2012.669%2014.5358%2013.0804%2013.7883C13.5352%2012.9617%2014.1443%2012.1232%2014.6545%2011.4232C14.8404%2011.1701%2015.0104%2010.9328%2015.1568%2010.7231L15.1607%2010.7192ZM11%205.9375C9.9519%205.9375%209.10156%206.78784%209.10156%207.83594C9.10156%208.18398%208.8168%208.46875%208.46875%208.46875C8.1207%208.46875%207.83594%208.18398%207.83594%207.83594C7.83594%206.08779%209.25186%204.67188%2011%204.67188C11.348%204.67188%2011.6328%204.95664%2011.6328%205.30469C11.6328%205.65273%2011.348%205.9375%2011%205.9375ZM11%2021.125C9.25186%2021.125%207.83594%2019.7091%207.83594%2017.9609V17.3281H14.1641V17.9609C14.1641%2019.7091%2012.7481%2021.125%2011%2021.125Z%22%20fill%3D%22%23D7D7D6%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_50941%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.intro-modal__icon--reminder .icon-reminder:hover {
  background-color: #e8e8e4;
}
.intro-modal__icon--reminder .icon-reminder:active {
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_47089)%22%3E%3Cpath%20d%3D%22M15.1607%2010.7192C15.7303%209.90444%2016.0625%208.91172%2016.0625%207.83594C16.0625%205.0397%2013.7962%202.77344%2011%202.77344C8.20376%202.77344%205.9375%205.0397%205.9375%207.83594C5.9375%208.91172%206.26973%209.90444%206.83926%2010.7192C6.9856%2010.9288%207.15962%2011.1661%207.34551%2011.4192C7.85571%2012.1193%208.46479%2012.9578%208.91963%2013.7844C9.33096%2014.5358%209.54058%2015.3189%209.64341%2016.0585L7.71729%2016.0625C7.63027%2015.5879%207.48394%2015.1251%207.25059%2014.698C6.85903%2013.9861%206.37256%2013.3177%205.88608%2012.6493C5.68042%2012.3685%205.47476%2012.0876%205.277%2011.8029C4.49785%2010.6796%204.03906%209.31118%204.03906%207.83594C4.03906%203.9916%207.15566%200.875%2011%200.875C14.8443%200.875%2017.9609%203.9916%2017.9609%207.83594C17.9609%209.31118%2017.5021%2010.6796%2016.719%2011.8029C16.5213%2012.0876%2016.3156%2012.3685%2016.11%2012.6493C15.6235%2013.3137%2015.137%2013.9821%2014.7455%2014.698C14.5121%2015.1251%2014.3658%2015.5879%2014.2788%2016.0625H12.3566C12.4594%2015.3229%2012.669%2014.5358%2013.0804%2013.7883C13.5352%2012.9617%2014.1443%2012.1232%2014.6545%2011.4232C14.8404%2011.1701%2015.0104%2010.9328%2015.1568%2010.7231L15.1607%2010.7192ZM11%205.9375C9.9519%205.9375%209.10156%206.78784%209.10156%207.83594C9.10156%208.18398%208.8168%208.46875%208.46875%208.46875C8.1207%208.46875%207.83594%208.18398%207.83594%207.83594C7.83594%206.08779%209.25186%204.67188%2011%204.67188C11.348%204.67188%2011.6328%204.95664%2011.6328%205.30469C11.6328%205.65273%2011.348%205.9375%2011%205.9375ZM11%2021.125C9.25186%2021.125%207.83594%2019.7091%207.83594%2017.9609V17.3281H14.1641V17.9609C14.1641%2019.7091%2012.7481%2021.125%2011%2021.125Z%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_47089%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.intro-modal__icon--reminder .icon-reminder.open {
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_47089)%22%3E%3Cpath%20d%3D%22M15.1607%2010.7192C15.7303%209.90444%2016.0625%208.91172%2016.0625%207.83594C16.0625%205.0397%2013.7962%202.77344%2011%202.77344C8.20376%202.77344%205.9375%205.0397%205.9375%207.83594C5.9375%208.91172%206.26973%209.90444%206.83926%2010.7192C6.9856%2010.9288%207.15962%2011.1661%207.34551%2011.4192C7.85571%2012.1193%208.46479%2012.9578%208.91963%2013.7844C9.33096%2014.5358%209.54058%2015.3189%209.64341%2016.0585L7.71729%2016.0625C7.63027%2015.5879%207.48394%2015.1251%207.25059%2014.698C6.85903%2013.9861%206.37256%2013.3177%205.88608%2012.6493C5.68042%2012.3685%205.47476%2012.0876%205.277%2011.8029C4.49785%2010.6796%204.03906%209.31118%204.03906%207.83594C4.03906%203.9916%207.15566%200.875%2011%200.875C14.8443%200.875%2017.9609%203.9916%2017.9609%207.83594C17.9609%209.31118%2017.5021%2010.6796%2016.719%2011.8029C16.5213%2012.0876%2016.3156%2012.3685%2016.11%2012.6493C15.6235%2013.3137%2015.137%2013.9821%2014.7455%2014.698C14.5121%2015.1251%2014.3658%2015.5879%2014.2788%2016.0625H12.3566C12.4594%2015.3229%2012.669%2014.5358%2013.0804%2013.7883C13.5352%2012.9617%2014.1443%2012.1232%2014.6545%2011.4232C14.8404%2011.1701%2015.0104%2010.9328%2015.1568%2010.7231L15.1607%2010.7192ZM11%205.9375C9.9519%205.9375%209.10156%206.78784%209.10156%207.83594C9.10156%208.18398%208.8168%208.46875%208.46875%208.46875C8.1207%208.46875%207.83594%208.18398%207.83594%207.83594C7.83594%206.08779%209.25186%204.67188%2011%204.67188C11.348%204.67188%2011.6328%204.95664%2011.6328%205.30469C11.6328%205.65273%2011.348%205.9375%2011%205.9375ZM11%2021.125C9.25186%2021.125%207.83594%2019.7091%207.83594%2017.9609V17.3281H14.1641V17.9609C14.1641%2019.7091%2012.7481%2021.125%2011%2021.125Z%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_47089%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.intro-modal__icon--reminder .text-reminder {
  /* Tool tip */
  position: absolute;
  right: 0px;
  top: -60px;
  box-sizing: border-box;
  display: flex;
  width: 280px;
  padding: 8px 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  background: #d9d9d9;
  box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12), 0px 0px 6px 0px rgba(0, 0, 0, 0.13);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);
  /* 預設隱藏 */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
}
.intro-modal__icon--reminder .text-reminder p {
  color: #3c3c39;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 14px;
  text-align: left;
  font-style: normal;
  font-weight: 700;
  line-height: 19px; /* 135.714% */
  letter-spacing: 0.56px;
}
.intro-modal__icon--reminder .text-reminder.visible {
  opacity: 1;
  visibility: visible;
}
.intro-modal__icon--inffits {
  position: relative;
}
.intro-modal__icon--inffits .icon-inffits {
  position: relative;
  background-color: #f3f3ef;
  border-radius: 100%;
  display: flex;
  width: 36px;
  height: 36px;
  padding: 7.88px;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_47382)%22%3E%3Cpath%20d%3D%22M6.17396%2012.4924C6.17396%2011.41%206.17396%2010.3891%206.17396%209.33034C7.19349%209.33034%208.21166%209.33034%209.25825%209.33034C9.26502%209.18692%209.27449%209.07935%209.27516%208.97111C9.27652%208.11733%209.30831%207.26152%209.26975%206.4091C9.14459%203.65698%2011.1464%201.6274%2013.4202%201.05438C16.0337%200.395443%2018.8304%201.59763%2019.9799%203.91C20.0692%204.08996%2020.1429%204.27736%2020.2451%204.50941C19.1396%204.85579%2018.0545%205.19608%2016.9463%205.54382C16.5729%204.82129%2015.962%204.46476%2015.1785%204.34907C13.8092%204.14679%2012.7214%205.06145%2012.7214%206.43277C12.7214%207.3542%2012.7227%208.27564%2012.7241%209.19707C12.7241%209.21871%2012.7315%209.24036%2012.7451%209.31411C13.2471%209.31411%2013.7599%209.31411%2014.2727%209.31411C14.778%209.31411%2015.2827%209.31411%2015.8097%209.31411C15.8097%2010.3735%2015.8097%2011.4107%2015.8097%2012.4735C14.7895%2012.4735%2013.7802%2012.4735%2012.7214%2012.4735C12.7214%2012.6162%2012.7214%2012.7346%2012.7214%2012.853C12.7214%2013.7744%2012.691%2014.6972%2012.7275%2015.6173C12.8276%2018.1502%2011.0734%2020.2055%208.80092%2020.8807C6.06301%2021.6946%203.09035%2020.4159%201.94837%2017.9236C1.8841%2017.7829%201.82998%2017.6367%201.75488%2017.4521C2.87251%2017.103%203.96848%2016.7606%205.05498%2016.4217C5.80525%2017.5414%206.9222%2017.9263%208.04185%2017.4629C8.82662%2017.1381%209.25419%2016.5428%209.2711%2015.6958C9.29208%2014.6411%209.27584%2013.5857%209.27584%2012.4931C8.24143%2012.4924%207.22393%2012.4924%206.17396%2012.4924Z%22%20fill%3D%22%23D7D7D6%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_47382%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.intro-modal__icon--inffits .icon-inffits:hover {
  background-color: #e8e8e4;
}
.intro-modal__icon--inffits .icon-inffits:active {
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_46362)%22%3E%3Cpath%20d%3D%22M6.17396%2012.4924C6.17396%2011.41%206.17396%2010.3891%206.17396%209.33034C7.19349%209.33034%208.21166%209.33034%209.25825%209.33034C9.26502%209.18692%209.27449%209.07935%209.27516%208.97111C9.27652%208.11733%209.30831%207.26152%209.26975%206.4091C9.14459%203.65698%2011.1464%201.6274%2013.4202%201.05438C16.0337%200.395443%2018.8304%201.59763%2019.9799%203.91C20.0692%204.08996%2020.1429%204.27736%2020.2451%204.50941C19.1396%204.85579%2018.0545%205.19608%2016.9463%205.54382C16.5729%204.82129%2015.962%204.46476%2015.1785%204.34907C13.8092%204.14679%2012.7214%205.06145%2012.7214%206.43277C12.7214%207.3542%2012.7227%208.27564%2012.7241%209.19707C12.7241%209.21871%2012.7315%209.24036%2012.7451%209.31411C13.2471%209.31411%2013.7599%209.31411%2014.2727%209.31411C14.778%209.31411%2015.2827%209.31411%2015.8097%209.31411C15.8097%2010.3735%2015.8097%2011.4107%2015.8097%2012.4735C14.7895%2012.4735%2013.7802%2012.4735%2012.7214%2012.4735C12.7214%2012.6162%2012.7214%2012.7346%2012.7214%2012.853C12.7214%2013.7744%2012.691%2014.6972%2012.7275%2015.6173C12.8276%2018.1502%2011.0734%2020.2055%208.80092%2020.8807C6.06301%2021.6946%203.09035%2020.4159%201.94837%2017.9236C1.8841%2017.7829%201.82998%2017.6367%201.75488%2017.4521C2.87251%2017.103%203.96848%2016.7606%205.05498%2016.4217C5.80525%2017.5414%206.9222%2017.9263%208.04185%2017.4629C8.82662%2017.1381%209.25419%2016.5428%209.2711%2015.6958C9.29208%2014.6411%209.27584%2013.5857%209.27584%2012.4931C8.24143%2012.4924%207.22393%2012.4924%206.17396%2012.4924Z%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_46362%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.intro-modal__icon--inffits .icon-inffits.open {
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3193_46362)%22%3E%3Cpath%20d%3D%22M6.17396%2012.4924C6.17396%2011.41%206.17396%2010.3891%206.17396%209.33034C7.19349%209.33034%208.21166%209.33034%209.25825%209.33034C9.26502%209.18692%209.27449%209.07935%209.27516%208.97111C9.27652%208.11733%209.30831%207.26152%209.26975%206.4091C9.14459%203.65698%2011.1464%201.6274%2013.4202%201.05438C16.0337%200.395443%2018.8304%201.59763%2019.9799%203.91C20.0692%204.08996%2020.1429%204.27736%2020.2451%204.50941C19.1396%204.85579%2018.0545%205.19608%2016.9463%205.54382C16.5729%204.82129%2015.962%204.46476%2015.1785%204.34907C13.8092%204.14679%2012.7214%205.06145%2012.7214%206.43277C12.7214%207.3542%2012.7227%208.27564%2012.7241%209.19707C12.7241%209.21871%2012.7315%209.24036%2012.7451%209.31411C13.2471%209.31411%2013.7599%209.31411%2014.2727%209.31411C14.778%209.31411%2015.2827%209.31411%2015.8097%209.31411C15.8097%2010.3735%2015.8097%2011.4107%2015.8097%2012.4735C14.7895%2012.4735%2013.7802%2012.4735%2012.7214%2012.4735C12.7214%2012.6162%2012.7214%2012.7346%2012.7214%2012.853C12.7214%2013.7744%2012.691%2014.6972%2012.7275%2015.6173C12.8276%2018.1502%2011.0734%2020.2055%208.80092%2020.8807C6.06301%2021.6946%203.09035%2020.4159%201.94837%2017.9236C1.8841%2017.7829%201.82998%2017.6367%201.75488%2017.4521C2.87251%2017.103%203.96848%2016.7606%205.05498%2016.4217C5.80525%2017.5414%206.9222%2017.9263%208.04185%2017.4629C8.82662%2017.1381%209.25419%2016.5428%209.2711%2015.6958C9.29208%2014.6411%209.27584%2013.5857%209.27584%2012.4931C8.24143%2012.4924%207.22393%2012.4924%206.17396%2012.4924Z%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_3193_46362%22%3E%3Crect%20width%3D%2220.25%22%20height%3D%2220.25%22%20fill%3D%22white%22%20transform%3D%22translate(0.875%200.875)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
.intro-modal__icon--inffits .text-inffits {
  /* Tool tip */
  position: absolute;
  left: 0px;
  top: -60px;
  box-sizing: border-box;
  display: flex;
  width: 274px;
  padding: 8px 13px;
  justify-content: center;
  align-items: center;
  text-align: left;
  gap: 10px;
  border-radius: 7px;
  background: #fff;
  box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12), 0px 0px 6px 0px rgba(0, 0, 0, 0.13);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);
  /* 預設隱藏 */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
}
.intro-modal__icon--inffits .text-inffits p {
  color: #3c3c39;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px; /* 135.714% */
  letter-spacing: 0.56px;
}
.intro-modal__icon--inffits .text-inffits p a {
  color: #0c8ce9;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.56px;
  text-decoration: none;
}
.intro-modal__icon--inffits .text-inffits.visible {
  opacity: 1;
  visibility: visible;
}

.container.back {
  box-shadow: none !important;
}

.container.mbinfo.animX {
  background-color: transparent !important;
  box-shadow: none !important;
}

.animFadeIn {
  animation: animFadeIn 1s ease-out;
}

.animFadeOut {
  animation: animFadeOut 5s ease-out;
}

.four-elements .axd_selection {
  box-sizing: border-box !important;
}

.four-elements .image-container {
  padding: 9px 20px !important;
  box-sizing: border-box;
}
.four-elements .image-container > div {
  position: relative;
  padding: 0 !important;
  padding-top: 100% !important;
}
.four-elements .image-container > div img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
}

.image-container {
  border-radius: 10px !important;
  background: #fff !important;
  padding: 8px !important;
  box-sizing: border-box;
  border: 0.5px solid rgba(59, 59, 50, 0.18) !important;
}
@media screen and (min-width: 480px) {
  .image-container {
    border-radius: 12px;
    border: 1px solid #edede9 !important;
    background: #fff;
  }
}
.image-container:hover {
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05);
  background: #f3f3ef !important;
}
.image-container:hover p {
  color: #1e1e19;
  text-align: center;
  /* Headline/CH */
  font-family: "Noto Sans TC";
  font-size: 15px;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 17px; /* 113.333% */
  letter-spacing: 0.9px;
}
.image-container:active {
  background: #f3f3ef !important;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12) !important;
}
.image-container:active p {
  color: #1e1e19;
  text-align: center;
  /* Headline/CH */
  font-family: "Noto Sans TC";
  font-size: 15px;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 17px; /* 113.333% */
  letter-spacing: 0.9px;
}
.image-container > div {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  overflow: hidden;
  border-radius: 8px !important;
  border: none;
}
.image-container > div img {
  box-sizing: border-box;
  border: none;
}
.image-container p {
  margin: 0;
  padding-top: 6px;
  cursor: pointer !important;
  color: #a3a39f;
  text-align: center;
  /* Body/CH */
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 15px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 17px !important;
  letter-spacing: 0.6px !important;
  white-space: nowrap; /* 強制文字不換行 */
  transition: color 0.3s ease-in-out !important;
}
@media screen and (min-width: 480px) {
  .image-container p {
    padding-top: 8px;
  }
}

.con-footer {
  position: absolute;
  z-index: 3;
  right: 14px;
  bottom: 8px;
}
@media screen and (min-width: 480px) {
  .con-footer {
    right: 16px;
    bottom: 12px;
  }
}
.con-footer .skip {
  display: block !important;
  width: -moz-fit-content;
  width: fit-content;
  box-sizing: border-box !important;
  cursor: pointer;
  transition: all 500ms ease-out;
  text-decoration: none;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.88px;
  color: rgba(59, 59, 50, 0.4);
  text-align: center;
}
@media screen and (min-width: 400px) {
  .con-footer .skip {
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 1.04px;
  }
}
.con-footer .skip:hover,
.con-footer .skip:active {
  color: #3b3b32;
  text-underline-offset: 4px;
  text-decoration: underline;
}

.footer {
  height: -moz-fit-content !important;
  height: fit-content !important;
}
.footer .result-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  padding: 0 14px;
  margin: 0 auto;
  gap: 0 10px;
  margin-bottom: 16px;
}
@media screen and (min-width: 480px) {
  .footer .result-actions {
    padding: 0 24px;
    row-gap: 14px;
    margin-bottom: 26px;
  }
}
.footer .result-actions #recommend-btn {
  border-radius: 100px;
  color: #fcfcf8;
  text-align: center;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px; /* 113.333% */
  letter-spacing: 0.9px;
  flex-grow: 1;
  height: 36px;
  background-color: #2da2fb;
  box-shadow: none;
  transition: all 300ms ease-out;
}
.footer .result-actions #recommend-btn:hover {
  background-color: #43adff;
}
@media screen and (min-width: 480px) {
  .footer .result-actions #recommend-btn {
    height: 45px;
  }
}
.footer .result-actions .icon--recom {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.94678%204V10H7.94678%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20d%3D%22M4.45678%2015.0001C5.10517%2016.8404%206.33411%2018.4203%207.95843%2019.5014C9.58275%2020.5826%2011.5145%2021.1067%2013.4625%2020.9945C15.4105%2020.8824%2017.2694%2020.1402%2018.7589%2018.8798C20.2485%2017.6194%2021.288%2015.909%2021.721%2014.0064C22.154%2012.1038%2021.9569%2010.112%2021.1594%208.33117C20.3619%206.55031%2019.0073%205.07687%2017.2996%204.13284C15.5919%203.18881%2013.6237%202.82533%2011.6915%203.09719C9.75923%203.36904%207.96769%204.26149%206.58678%205.64007L1.94678%2010.0001%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: center;
  transition: all 300ms ease-out;
  padding: 3px;
}
.footer button#startover {
  display: flex;
  max-width: -moz-fit-content;
  max-width: fit-content;
  align-items: center;
  margin: 0;
  padding: 0;
}
.footer .iconContainer--recom {
  background-color: #c4c4c3;
  border-radius: 100px;
  width: 32px !important;
  height: 32px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (min-width: 480px) {
  .footer .iconContainer--recom {
    width: 40px !important;
    height: 40px !important;
  }
}
.footer .iconContainer--recom:hover {
  background-color: #d7d7d6;
}
.footer #startover .icon--recom {
  box-shadow: none;
  width: 20px;
  height: 20px;
  transition: all 300ms ease-out;
}
@media screen and (min-width: 480px) {
  .footer #startover .icon--recom {
    width: 24px;
    height: 24px;
  }
}
.footer #startover .icon--recom .text--recom {
  color: rgba(59, 59, 50, 0.4);
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 123.077% */
  letter-spacing: 1.04px;
  transition: all 500ms ease-out;
}
.footer #startover .icon--recom:hover .icon--recom {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cg clip-path='url(%23clip0_584_2470)'%3E%3Cpath d='M3.43711 4.37495H4.8125C5.29648 4.37495 5.6875 4.76597 5.6875 5.24995C5.6875 5.73394 5.29648 6.12495 4.8125 6.12495H1.3125C0.828516 6.12495 0.4375 5.73394 0.4375 5.24995V1.74995C0.4375 1.26597 0.828516 0.874951 1.3125 0.874951C1.79648 0.874951 2.1875 1.26597 2.1875 1.74995V3.14995L2.66875 2.6687C5.06133 0.276123 8.93867 0.276123 11.3313 2.6687C13.7238 5.06128 13.7238 8.93862 11.3313 11.3312C8.93867 13.7238 5.06133 13.7238 2.66875 11.3312C2.32695 10.9894 2.32695 10.4343 2.66875 10.0925C3.01055 9.75073 3.56562 9.75073 3.90742 10.0925C5.61641 11.8015 8.38633 11.8015 10.0953 10.0925C11.8043 8.38355 11.8043 5.61362 10.0953 3.90464C8.38633 2.19565 5.61641 2.19565 3.90742 3.90464L3.43711 4.37495Z' fill='%233B3B32' fill-opacity='0.8'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_584_2470'%3E%3Crect width='14' height='14' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
}
.footer #startover .icon--recom:hover .text--recom {
  color: rgba(59, 59, 50, 0.8);
  text-underline-offset: 4px;
  text-decoration: underline;
}
.footer .c-recom {
  margin: auto !important;
  margin-right: 12px !important;
  display: flex !important;
  width: -moz-fit-content;
  width: fit-content;
  box-sizing: border-box !important;
  cursor: pointer;
  transition: all 500ms ease-out;
}
.footer img {
  display: block;
}

.c_header {
  padding: 14px 21px !important;
  max-height: 65px;
  box-sizing: border-box;
  border-bottom: 4px solid #f5f5f4;
}
@media screen and (min-width: 480px) {
  .c_header {
    padding: 21px 18px !important;
    max-height: 85px;
    box-sizing: border-box;
    border-bottom: 6px solid #f5f5f4;
  }
}
.c_header .type_backarrow {
  height: 21px;
  width: 21px;
  padding: 5px;
  box-sizing: border-box;
  background-color: #e8e8e4;
  transition: backgroundColor 300ms ease-out;
}
.c_header .type_backarrow:hover, .c_header .type_backarrow:active {
  background-color: #dadad6;
}
@media screen and (min-width: 480px) {
  .c_header .type_backarrow {
    padding: 0;
    background-color: white;
    height: 32px;
    width: 32px;
  }
  .c_header .type_backarrow:hover, .c_header .type_backarrow:active {
    background-color: white;
  }
}
.c_header .header-text span {
  color: #1e1e19;
  text-align: center;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-style: normal;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px; /* 120% */
  letter-spacing: 0.6px;
  margin-bottom: 0 !important;
  padding-bottom: 5px;
}
@media screen and (min-width: 480px) {
  .c_header .header-text span {
    text-align: center;
    font-size: 18px;
    line-height: 20px; /* 117.647% */
    letter-spacing: 1.44px;
    padding-bottom: 8px;
  }
}
.c_header .header-text p {
  color: #a3a39f;
  text-align: center;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
  letter-spacing: 0.84px;
}
@media screen and (min-width: 480px) {
  .c_header .header-text p {
    font-size: 16px;
    line-height: 18px; /* 112.5% */
    letter-spacing: 0.8px;
  }
}

#container-recom .c_header {
  max-height: 93px;
}

.loading-text {
  color: #787974;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 100% */
  letter-spacing: 0.6px;
}
@media screen and (min-width: 480px) {
  .loading-text {
    text-align: center;
    font-size: 18px;
    line-height: 21px; /* 116.667% */
    letter-spacing: 1.08px;
  }
}

@media (max-width: 400px) {
  #container-recom .three-elements .axd_selection {
    width: 37% !important;
    box-sizing: border-box;
  }
}
@media (max-width: 400px) {
  #container-recom .three-elements .axd_selection:first-child {
    margin-left: 45px;
  }
}
@media (max-width: 400px) {
  #container-recom .three-elements .axd_selection:last-child {
    margin-right: 45px;
  }
}

@media screen and (min-width: 480px) {
  #container-recom .axd_selection {
    padding: 12px;
  }
}

#container-recom .axd_selection {
  padding: 0 8px;
  padding-bottom: 8px;
  transform: scale(1);
}
@media screen and (min-width: 480px) {
  #container-recom .axd_selection {
    padding: 0 10px;
  }
  #container-recom .axd_selection img {
    padding-bottom: 8px;
  }
}

#container-recom .axd_selection:hover {
  transform: scale(1) !important;
  opacity: 1 !important;
  transition: opacity 0.3s ease-out;
  -webkit-transition: opacity 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out;
  -ms-transition: opacity 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out;
  cursor: pointer !important;
}
@media screen and (min-width: 480px) {
  #container-recom .axd_selection:hover img {
    animation: scaleDown 500ms ease-out both;
    animation-delay: 100ms;
    -webkit-animation: scaleDown 500ms ease-out both;
  }
}

a.update_delete {
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  /* 縮小動畫 */
}
a.update_delete img {
  aspect-ratio: 5/6;
  -o-object-fit: cover;
     object-fit: cover;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 12px;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  -ms-border-radius: 12px;
  -o-border-radius: 12px;
}
@media screen and (min-width: 480px) {
  a.update_delete img {
    height: 185px !important;
    border-radius: 0;
    padding: 0;
  }
}
a.update_delete p {
  cursor: pointer !important;
  padding: 0;
  margin: 0;
}
a.update_delete .item-title.line-ellipsis-2 {
  color: #3c3c39;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  letter-spacing: 1.3px;
  font-style: normal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  height: 2.8em;
  margin-bottom: 8px;
}
@media screen and (min-width: 480px) {
  a.update_delete .item-title.line-ellipsis-2 {
    margin-bottom: 14px;
    font-size: 15px;
    line-height: 20px; /* 133.333% */
    letter-spacing: 1.5px;
  }
}
a.update_delete .item-price {
  cursor: pointer !important;
  color: #eb7454;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
a.update_delete .recom-info {
  padding: 8px;
  cursor: pointer !important;
  padding-top: 0px;
}
a.update_delete .discount-content {
  cursor: pointer !important;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
a.update_delete .discount-content .item-price {
  color: #eb7454;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
a.update_delete .discount-content .item-price--original {
  color: #3b3b32;
  font-family: "Noto Sans TC", "Figtree", sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 11px;
  opacity: 0.3;
}
@keyframes scaleDown {
  0% {
    padding-bottom: 8px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    -ms-border-radius: 0;
    -o-border-radius: 0;
  }
  100% {
    padding: 8px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -ms-border-radius: 12px;
    -o-border-radius: 12px;
  }
}
@keyframes animFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes animFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}`
        // 自定义样式
        const shadowStyle = document.createElement('style');
        shadowStyle.textContent = `
      /* Desktop */
      @media screen and (min-width: 480px) {
        #inffits_cblock--pd {
          position: fixed;
          right: 0;
          bottom: 0;
          height: 700px;
          width: 480px !important;
        }
        #tryon--pd {
          margin: auto;
          height: 700px;
          width: 480px !important;
        }
      }

      /* Tablets */
      @media screen and (min-width: 355px) and (max-width: 479px) {
        #inffits_cblock--pd {
          position: fixed;
          right: 0;
          bottom: 0;
        }
        #tryon--pd {
          margin: auto;
          width: 355px !important;
        }
      }
    `;
        shadow.appendChild(bootstrapCSS);
        shadow.appendChild(jqScript);
        shadow.appendChild(bootstrapScript);
        shadow.appendChild(customIframeStyle);
        shadow.appendChild(shadowStyle);

        // 使用 MutationObserver 監視 shadow DOM 中的元素變化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // 確保按鈕元素已經渲染
                    const triggerButton = this.shadowRoot.querySelector(".ai-pd-container__trigger");
                    const inffitsCblocKoverlay = this.shadowRoot.querySelector("#inffits_cblock--pd--overlay");
                    if (triggerButton && inffitsCblocKoverlay) {
                        // 按鈕元素存在，執行事件綁定
                        triggerButton.addEventListener("pointerdown", (e) => {
                            if (triggerButton.classList.contains("ai-pd-container__trigger--search")) {
                                $(inffitsCblocKoverlay).fadeIn(); // 顯示 overlay
                            } else {
                                $(inffitsCblocKoverlay).fadeOut(); // 隱藏 overlay

                            }
                            triggerButton.classList.toggle("ai-pd-container__trigger--search");
                            triggerButton.classList.toggle("ai-pd-container__trigger--close");
                        });
                        // 按鈕元素存在，執行事件綁定
                        inffitsCblocKoverlay.addEventListener("pointerdown", (e) => {
                            $(inffitsCblocKoverlay).fadeOut(); // 隱藏 overlay

                            triggerButton.classList.toggle("ai-pd-container__trigger--search");
                            triggerButton.classList.toggle("ai-pd-container__trigger--close");
                        });
                    }
                    observer.disconnect(); // 一旦事件綁定完成後，停止監視
                }
            });
        });

        // 配置 MutationObserver 來監視 childList 變化
        observer.observe(shadow, { childList: true, subtree: true });
    }

    // Public method to initialize with custom parameters
    init(brand, url) {
        this.ExtensionsMkt(brand, url);
    }

    // Internal function to fetch and render the data
    ExtensionsMkt(brand, url) {
        const requestData = {
            Brand: brand,
            url: url || decodeURI(document.location.href.split('//')[1].toLowerCase())
        };

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify(requestData)
        };

        fetch('https://api.inffits.com/httpmpi/mkt_products_involve', options)
            .then(response => response.json())
            .then(res => {
                if (res && res.length > 0) {
                    const aiSearchPdTemplate = `
                        <div class="ai-pd-container">
                            <button class="ai-pd-container__trigger ai-pd-container__trigger--search" type="button">
                                <div class="ai-pd-container__icon"></div>
                                <img class="ai-pd-container__icon--alert" src="https://raw.githubusercontent.com/infFITSDevelopment/pop-ad/refs/heads/main/icon-alert.svg"></img>
                            </button>
                            <div id="inffits_cblock--pd--overlay" style=" display: none;position: fixed;width: 100%;height: 100%;top: 0px;left: 0px; z-index: 99999991;background: rgba(0, 0, 0, 0.5);transform: none;">
                                <div id="inffits_cblock--pd" style="z-index: 60;display: block;position: absolute; inset: 0;">
                                    <div id="tryon--pd" style="height: 100%;width:100%;display:flex;justify-content:center;align-items:center;">
                                        <iframe id="inffits_tryon--pd_window" style="height: 100%;width: 100%;visibility: visible;position: relative;border: none;outline: none;z-index: 14;max-width: 95vw;margin: 0 auto;" src="${window.location.port === "5500" ? "./iframe_container_module.html" : "https://ts-iframe-8ysy.vercel.app/iframe_container_module.html"}"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $(this.shadowRoot).append(aiSearchPdTemplate);



                    // 獲取 iframe 的 contentWindow
                    const iframeElement = this.shadowRoot.getElementById("inffits_tryon--pd_window");
                    if (iframeElement) {
                        const iframe_container = iframeElement.contentWindow;

                        // 確保 iframe 加載完成再傳送 postMessage
                        iframeElement.onload = () => {
                            const iframe_preview_obj = {
                                id: `${res[0].ClothID}` || `${brand}_All`,
                                header: "from_preview",
                                brand: `${brand}`,
                            };
                            // 傳送 postMessage 到 iframe
                            iframe_container.postMessage(iframe_preview_obj, "*");
                        };
                    } else {
                        console.error("iframe 元素未找到，無法傳送 postMessage");
                    }
                }
            });
    }
}

// Define the custom element
customElements.define('shadow-component', ShadowComponent);
