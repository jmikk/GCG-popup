// ==UserScript==
// @name         test highlighter script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  highlights cards that have been requested
// @author       9003
// @match        https://www.nationstates.net/*page=deck*
// @updateURL    https://github.com/jmikk/GCG-popup/raw/main/GCG.user.js
// @noframes
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @connect      docs.google.com
// @connect      googleusercontent.com
// ==/UserScript==

(async function() {
    'use strict';
    const update_auctiontable = async function () {
		const members_array = (await GM.getValue("requests", "")).split("\n");
       //alert("test");


     var x=document.getElementsByClassName("deckcard-info-cardlink")
    for(var i=0;i<x.length;i++){



        x[i].childNodes.forEach(function(el){          //alert(el)
            members_array.forEach(function(el2){console.info(el2);
               if(el==el2){
               alert("Found one: "+el);}                   });


        });

};

    }



    //







if (document.getElementById("deck-summary")) {
    //alert("test1");
		// If we haven't updated in the last 12h
		if (
			(await GM.getValue("requests-lastupdate", 0)) +
				12 * 60 * 60 * 1000 >    //CHANGE THIS WHEN YOU ARE DONE SO THAT IT WORKS IT SHOULD BE < *************************************************************************
			new Date().getTime()
		) {
			GM.xmlHttpRequest({
				method: "GET",
				url:
					"https://docs.google.com/spreadsheets/u/2/d/1q-aLN6fhUm0OC426lv_G4f32PWA_u5nRlJ4YCj9NDlQ/export?format=tsv&id=1q-aLN6fhUm0OC426lv_G4f32PWA_u5nRlJ4YCj9NDlQ&gid=1970855203",
				onload: async function (data) {
					console.info("updated");
					await GM.setValue(
						"requests",
						data.responseText
							.split("\n")
							.map((x) =>
								x
									.split("\t")[7]
									.trim()
									.toLowerCase()
									.replace(/ /g, "_")
							)
							.slice(1)
							.join("\n")
					);
					GM.setValue("requests-lastupdate", new Date().getTime());
					update_auctiontable();
				},
			});
		}

		update_auctiontable();

		let observer = new MutationObserver(function (mutationList) {
			update_auctiontable();
		});

		const observerOptions = {
			subtree: true,
			childList: true,
		};

		observer.observe(
			document.getElementById("deck-summary"),
			observerOptions
		);}
    // Your code here...
})();
