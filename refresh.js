// ==UserScript==
// @name         Auto Refresh matika.in každých 90 sekund
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automaticky obnovuje stránku matika.in každých 90 sekund
// @author       ty
// @match        https://www.matika.in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        location.reload();
    }, 5000); // 
})();
