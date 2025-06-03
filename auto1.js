// ==UserScript==
// @name         Matika.in – auto řešitel + další úloha (klikání)
// @namespace    http://tampermonkey.net/
// @version      7.0
// @description  Automaticky řeší úlohu, klikne na MÁM HOTOVO! a poté klikne na tlačítko Další úloha X/Y (nezávisle na čísle), vše přes klikání, žádný submit()
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function jeCtvercovyElement(el) {
        const style = getComputedStyle(el);
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const ratio = w / h;
        return (
            el.childElementCount === 0 &&
            /\b\d+\b/.test(el.textContent.trim()) &&
            w > 30 && h > 30 && w < 300 && h < 300 &&
            ratio > 0.8 && ratio < 1.2 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden'
        );
    }

    function najdiCislaVCtvercich() {
        const prvky = document.querySelectorAll('div, span, p');
        const cisla = [];
        for (const el of prvky) {
            if (jeCtvercovyElement(el)) {
                const match = el.textContent.trim().match(/\b\d+\b/);
                if (match) {
                    cisla.push({ el, hodnota: parseInt(match[0]) });
                }
            }
        }
        return cisla;
    }

    function najdiOperaci() {
        const znaky = ['+', '−', '-', '×', '*', ':', '/'];
        const prvky = document.querySelectorAll('div, span, p');
        for (const el of prvky) {
            const txt = el.textContent.trim();
            if (znaky.includes(txt)) return txt;
        }
        return null;
    }

    function spocitej(op, a, b) {
        switch (op) {
            case '+': return a + b;
            case '-':
            case '−': return a - b;
            case '×':
            case '*': return a * b;
            case ':':
            case '/': return a / b;
            default: return null;
        }
    }

    function najdiInputProOdpoved() {
        const prvky = document.querySelectorAll('input, div[contenteditable=true]');
        for (const el of prvky) {
            const obsah = el.placeholder || el.textContent || '';
            if (obsah.includes('?')) return el;
        }
        return null;
    }

    function doplnVysledek(el, vysledek) {
        if (!el) return;
        if (el.tagName === 'INPUT') {
            el.value = vysledek;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (el.isContentEditable) {
            el.textContent = vysledek;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
        console.log(`✏️ Odpověď vložena: ${vysledek}`);
    }

    function klikniNaHotovo() {
        const tlacitko = document.querySelector('input[type="submit"].button.green[value="MÁM HOTOVO!"]');
        if (tlacitko) {
            console.log('✅ Klikám na: MÁM HOTOVO!');
            tlacitko.click();
            setTimeout(klikniNaDalsiUlohu, 2000);
        } else {
            console.warn('❌ Tlačítko "MÁM HOTOVO!" nenalezeno.');
        }
    }

    function klikniNaDalsiUlohu() {
        const btns = document.querySelectorAll('button.blue');
        for (const btn of btns) {
            const text = btn.innerText.replace(/\s+/g, ' ').trim();
            if (/^Další úloha \d+\/\d+$/.test(text)) {
                console.log('➡️ Klikám na tlačítko:', text);
                btn.click();
                return;
            }
        }
        console.warn('❌ Tlačítko „Další úloha X/Y“ nenalezeno.');
    }

    function provedOperaci() {
        const cisla = najdiCislaVCtvercich();
        const op = najdiOperaci();

        if (cisla.length >= 2 && op) {
            const a = cisla[0].hodnota;
            const b = cisla[1].hodnota;
            const vysledek = spocitej(op, a, b);

            const vstup = najdiInputProOdpoved();
            doplnVysledek(vstup, vysledek);

            console.log(`🧮 Spočítáno: ${a} ${op} ${b} = ${vysledek}`);
            setTimeout(klikniNaHotovo, 1000);
        } else {
            console.warn('❌ Nepodařilo se najít dvě čísla nebo operátor.');
        }
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('🚀 Spouštím řešení úlohy…');
            provedOperaci();
        }, 1500);
    });
})();
