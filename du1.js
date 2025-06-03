// ==UserScript==
// @name         Matika.in – klikni na Další úloha (univerzálně)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Klikne na tlačítko „Další úloha X/5“ i s tagy uvnitř
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function klikniNaDalsiUlohu() {
        const tlacitka = document.querySelectorAll('button.blue');
        for (const tl of tlacitka) {
            const text = tl.textContent.replace(/\s+/g, ' ').trim();

            if (/^Další úloha [1-5]\/5/.test(text)) {
                console.log(`✅ Klikám na: ${text}`);
                tl.click();
                return;
            }
        }
        console.warn('❌ Tlačítko „Další úloha X/5“ nenalezeno.');
    }

    window.addEventListener('load', () => {
        setTimeout(klikniNaDalsiUlohu, 2000); // čekej 2 sekundy na načtení
    });
})();
