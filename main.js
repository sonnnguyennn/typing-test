const $ = s => document.querySelector(s);
    let startTime, endTime;
    $(".btn").addEventListener("click", ()=>{
        $(".typingPage").classList.add("show");
        timer()
        startTime = new Date().getTime();
    })
    $(".continueBtn").addEventListener("click", ()=>{
        endTime = new Date().getTime();
        result()
    })
     
    let totalMin, totalSec, leftMin, leftSec, usedMin, usedSec;
    let showedResult = false;
    function timer() {
        let duration = $("input[name=duration]:checked").value;
        let second = 60;
        let minute = duration - 1;
        totalMin = minute;
        totalSec = second;
         
        minute < 10 ? minute = "0"+minute : minute = minute;
        setInterval(() => {
            if($("#time").innerHTML != "00:00") {
                if(second > 0) {
                    second -= 1;
                }
                else {
                    second = 59;
                    minute -= 1;
                    minute < 10 ? minute = "0"+minute : minute = minute;
                }
                 
                second < 10 ? second = "0"+second : second = second;
                leftMin = minute;
                leftSec = second;
                $("#time").innerHTML = `${minute}:${second}`;
            }
            else {
                if(!showedResult) {
                    endTime = new Date().getTime();
                    result()
                }
            }
        }, 1000)
         
    }
     
     
    function result() {
        showedResult = true;
        $(".result").classList.add("show");
        $("#characters").innerHTML = $("#input").value.length;
        let minutes = ((endTime - startTime) / 1000) / 60;
        let orginalArray = $("#text").innerHTML.split(" ");
        let typedArray = $("#input").value.split(" ");
         
        let characters = $("#input").value.length;
        let correctChar = "";
        let correct = 0;
        let incorrect = 0;
        typedArray.forEach((word, i) => {
            if(word == orginalArray[i]) {
                correct += 1;
                correctChar += `${word} `;
            }
            else {
                incorrect += 1;
            }
        })
         
         
         
        usedMin = totalMin - leftMin;
        usedSec = totalSec - leftSec;
        if(usedSec >= 60) {
            usedMin += 1;
            usedSec = 0;
        }
        usedMin < 10 ? usedMin = "0"+usedMin : usedMin = usedMin;
        usedSec < 10 ? usedSec = "0"+usedSec : usedSec = usedSec;
         
        $("#timeUsed").innerHTML = `${usedMin}:${usedSec}`;
         
        $("#calWords").innerHTML = `${Math.round(characters/5)} words`;
        let grossSpeed = Math.floor((characters / 5) / minutes);
        let netSpeed = Math.floor(grossSpeed - (incorrect / minutes));
        $("#grossSpeed").innerHTML = `${grossSpeed}wpm`;
        $("#netSpeed").innerHTML = `${netSpeed}wpm`;
         
        correctChar = correctChar.slice(0, -1);
        let accuracy = Math.floor((correctChar.length / characters) * 100);
        $("#accuracy").innerHTML = `${accuracy}%`;
    }
     
     
    const paragraph = [
 
        "Once, there was a boy (chetan shidling) who became bored when he watched over the village sheep grazing on the hillside. To entertain himself, he sang out, “Wolf! Wolf! The wolf is chasing the sheep! When the villagers heard the cry, they came running up the hill to drive the wolf away. But, when they arrived, they saw no wolf. The boy was amused when seeing their angry faces.Don’t scream wolf, boy, warned the villagers, when there is no wolf! They angrily went back down the hill.",
 
        "When we talk about motivating others, the justification is the end result (either we want to avoid the pain or go towards pleasure) or what we want to get the person to do. How we achieve the end result, are our alternatives. As a manager, we need to understand the other person's justification and then come up with alternatives. We may then choose the right alternative. However, in general, we choose the first or the emotionally satisfying one. Typically people stop at this level of analysis and start to act. What to you think chetan shidling",
 
        "An ever-growing number of complex and rigid rules plus hard-to-cope-with regulations are now being legislated from state to state. Key federal regulations were formulated by the FDA, FTC, and the CPSC. Each of these federal agencies serves a specific mission. One example: Laws sponsored by the Office of the Fair Debt Collection Practices prevent an agency from purposefully harassing clients in serious debt."
    ];
     
$("#text").innerHTML = paragraph[Math.floor(Math.random() * paragraph.length)];