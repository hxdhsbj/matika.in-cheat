// ==UserScript==
// @name         Matika.in – klikni na OK (jako Další úloha)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Klikne na tlačítko s textem „OK“ podle viditelného textu (jako Další úloha skript)
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function klikniNaOK() {
        const btns = document.querySelectorAll('button, input[type="button"]');
        for (const btn of btns) {
            const text = btn.textContent?.trim() || btn.value?.trim();
            if (text === "OK") {
                console.log("✅ Klikám na tlačítko Celkové hodnocení ");
                btn.click();
                return;
            }
        }
        console.warn("❌ Tlačítko OK nenalezeno.");
    }

    window.addEventListener('load', () => {
        setTimeout(klikniNaOK, 2000);
    });
})();
