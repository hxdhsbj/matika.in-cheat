// ==UserScript==
// @name         Matika.in – autořešič s podporou <input type="submit">
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Automaticky řeší sčítací úlohy, kliká na MÁM HOTOVO! (input) a pak na Další úloha X/5 i se <span>, rychle a spolehlivě.
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let hotovoKliknuto = false;

    function vyresScitaciUlohu() {
        if (hotovoKliknuto) return;

        const uloha = document.querySelector('.pocty');
        if (!uloha) return;

        const text = uloha.innerText;
        const match = text.match(/(\d+)\s*\+\s*(\d+)/);
        if (!match) return;

        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        const vysledek = a + b;

        const input = document.querySelector('input[type="number"], input[type="text"]');
        if (input) {
            input.value = vysledek;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // 🔧 Podpora pro <input type="submit" value="MÁM HOTOVO!">
        const hotovoInput = document.querySelector('input[type="submit"][value="MÁM HOTOVO!"]');
        if (hotovoInput && hotovoInput.offsetParent !== null) {
            hotovoInput.click();
            hotovoKliknuto = true;
            console.log(`✅ Kliknuto na 'MÁM HOTOVO!' → ${a} + ${b} = ${vysledek}`);
        }
    }

    function klikniNaDalsiUlohu() {
        if (!hotovoKliknuto) return;

        const btns = document.querySelectorAll('button.blue');
        for (const btn of btns) {
            const text = btn.textContent.replace(/\s+/g, ' ').trim();
            if (text.startsWith('Další úloha')) {
                console.log("➡️ Klikám na:", text);
                btn.click();
                hotovoKliknuto = false;
                return;
            }
        }
    }

    setInterval(() => {
        vyresScitaciUlohu();
        klikniNaDalsiUlohu();
    }, 500);
})();
