function l(){p()}function p(){if(!document.getElementById("validationModal")){let t=`
      <div id="validationModal" class="modal">
        <div class="modal-content">
          <h4 id="modalTitle">Validation Error</h4>
          <p id="modalMessage"></p>
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      </div>
    `,e=document.createElement("style");e.textContent=`
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .modal.show {
        display: block;
      }
      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
      }
    `,document.head.appendChild(e);let a=document.createElement("div");a.innerHTML=t,document.body.appendChild(a.firstElementChild)}}function d(t,e){let a=document.getElementById("validationModal"),i=document.getElementById("modalTitle"),o=document.getElementById("modalMessage");a&&o&&(i.textContent=t||"Notification",o.textContent=e,a.classList.add("show"))}function f(){let t=document.getElementById("validationModal");t&&t.classList.remove("show")}window.closeModal=f;var r=class{constructor(){this.usBaseUrl="https://api.zippopotam.us/us/",this.caBaseUrl="https://api.zippopotam.us/ca/",this.cache=new Map}isUSZipCode(e){return/^\d{5}(-\d{4})?$/.test(e)}isCanadianPostalCode(e){return/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(e)}formatCanadianPostalCode(e){return e.replace(/[\s-]/g,"").toUpperCase().replace(/(.{3})(.{3})/,"$1 $2")}async validate(e){if(e=e.trim(),this.isUSZipCode(e)){let a=e.split("-")[0].trim();if(this.cache.has(a))return this.cache.get(a);try{let i=await fetch(`${this.usBaseUrl}${a}`);if(!i.ok)throw new Error("Invalid ZIP code");let o=await i.json(),n={valid:!0,city:o.places[0]["place name"],state:o.places[0]["state abbreviation"],country:"United States"};return this.cache.set(a,n),n}catch{return{valid:!1,error:"Please enter a valid US ZIP code (12345 or 12345-1234)"}}}if(this.isCanadianPostalCode(e)){let a=this.formatCanadianPostalCode(e),i=a.substring(0,3);if(this.cache.has(a))return this.cache.get(a);try{let o=await fetch(`${this.caBaseUrl}${i}`);if(!o.ok)throw new Error("Invalid postal code");let n=await o.json(),s={valid:!0,city:n.places[0]["place name"],state:n.places[0]["state abbreviation"],country:"Canada"};return this.cache.set(a,s),s}catch{return{valid:!1,error:"Please enter a valid Canadian postal code (A1A 1A1)"}}}return{valid:!1,error:"Please enter a valid US ZIP code (12345 or 12345-1234) or Canadian postal code (A1A 1A1)"}}};async function h(t){let a=await new r().validate(t.value);return a.valid?!0:(d("Validation Error",a.error),!1)}async function c(t){let e=t.querySelector('[name="zipcode"]');return!(e&&!await h(e))}function u(){let t=document.getElementById("SFMC_Form");t&&(console.log("Form initialized"),t.addEventListener("submit",v))}async function v(t){t.preventDefault();let e=t.target;await y(e)&&e.submit()}async function y(t){return await c(t)}function m(){let t=document.getElementById("SFMC_Form");if(t){t.action="https://turnstile-handler.digitalmarketing-213.workers.dev";let e=t.querySelector('button[type="submit"]');if(e){let a=document.createElement("div");a.className="cf-turnstile",a.setAttribute("data-sitekey","0x4AAAAAAA7xhXywyI0cvp43"),e.parentNode.insertBefore(a,e)}}C()}function C(){if(document.querySelector('script[src*="turnstile/v0/api.js"]'))return;let t=document.createElement("script");t.src="https://challenges.cloudflare.com/turnstile/v0/api.js",t.setAttribute("async",""),t.setAttribute("defer",""),document.head.appendChild(t)}document.addEventListener("DOMContentLoaded",()=>{l(),m(),u(),console.log("Form application initialized")});
//# sourceMappingURL=bundle.js.map
