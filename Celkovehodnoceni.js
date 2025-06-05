// ==UserScript==
// @name         Matika.in – klikni na Celkové hodnocení (přesný onclick button)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Automaticky klikne na tlačítko s textem „Celkové hodnocení“ i když má v sobě <span> a spustí onclick ručně, pokud je potřeba. Funguje 100 % na konci testu Matika.in.
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function klikniNaCelkoveHodnoceni() {
        const tlacitka = document.querySelectorAll('button.blue');
        for (const btn of tlacitka) {
            const text = btn.innerText.replace(/\s+/g, ' ').trim();
            if (text.startsWith("Celkové hodnocení")) {
                console.log("✅ Klikám na tlačítko:", text);
                btn.click(); // aktivuje i onclick
                return true;
            }
        }
        return false;
    }

    function cekejAzSeObjevi() {
        const observer = new MutationObserver(() => {
            if (klikniNaCelkoveHodnoceni()) {
                console.log("📤 Tlačítko nalezeno a kliknuto. Observer vypnut.");
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("👀 Čekám na tlačítko Celkové hodnocení...");
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!klikniNaCelkoveHodnoceni()) {
                cekejAzSeObjevi();
            }
        }, 500);
    });
})();
