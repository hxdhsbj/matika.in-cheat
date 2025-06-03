// ==UserScript==
// @name         Matika.in – klikni na tlačítko „Sčítání“ ve 2. ročníku
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automaticky klikne na tlačítko „Sčítání“ na stránce 2. ročníku (https://www.matika.in/cs/#2) – přejde do úloh pro sčítání 2. třída.
// @author       Ty
// @match        https://www.matika.in/cs/#2
// @match        https://www.matika.in/cs/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function klikniNaScitani() {
        const vsechny = document.querySelectorAll('a.ulohy-button');
        for (const el of vsechny) {
            const nadpis = el.querySelector('h4');
            if (nadpis && nadpis.textContent.trim() === "Sčítání") {
                console.log("✅ Klikám na tlačítko: Sčítání");
                el.click();
                return;
            }
        }
        console.warn("❌ Tlačítko 'Sčítání' nebylo nalezeno.");
    }

    window.addEventListener('load', () => {
        setTimeout(klikniNaScitani, 1000); // Počkej 1 sekundu po načtení stránky
    });
})();
