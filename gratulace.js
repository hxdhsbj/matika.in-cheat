// ==UserScript==
// @name         Matika.in – přesměrování po gratulaci
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Když se objeví text „Gratuluji! Správně jsi vyřešil/a 5 úloh z 5.“, automaticky přejde na domovskou stránku Matika.in (/cs/)
// @author       Ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const hledanyText = "Gratuluji! Správně jsi vyřešil/a 5 úloh z 5.";

    function zkontrolujTextNaStrance() {
        const vsechny = document.querySelectorAll("h1, h2, p, div");
        for (const el of vsechny) {
            const text = el.textContent?.replace(/\s+/g, ' ').trim();
            if (text === hledanyText) {
                console.log("🎉 Nalezen gratulační text, přesměrovávám...");
                window.location.href = "https://www.matika.in/cs/#2";
                return true;
            }
        }
        return false;
    }

    function cekejNaGratulaci() {
        const observer = new MutationObserver(() => {
            if (zkontrolujTextNaStrance()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("👀 Čekám na gratulační text...");
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!zkontrolujTextNaStrance()) {
                cekejNaGratulaci();
            }
        }, 1000);
    });
})();
