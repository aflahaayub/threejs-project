import {questionsOne} from './questionsOne.js'
import {questionsTwo} from './questionsTwo.js'
import {questionsThree} from './questionsThree.js'
import {evaluasi} from './evaluation.js'
// import './quiz.css'

const materiOne = document.querySelector('.materiOne')
const materiTwo = document.querySelector('.materiTwo')
const materiThree = document.querySelector('.materiThree')
const btnQuit = document.querySelector('.quit')
const result = document.querySelector('.result')
const user = document.querySelector('.username').innerHTML
let username = user.trim()

if(materiOne){
    startQuiz(questionsOne)
} else if(materiTwo){
    startQuiz(questionsTwo)
}else if(materiThree){
    startQuiz(questionsThree)
}else{
    startQuiz(evaluasi)
}

function startQuiz(questions){
//selecting all required elements
    const start_btn = document.querySelector(".start_btn button");
    const info_box = document.querySelector(".info_box");
    const exit_btn = info_box.querySelector(".buttons .quit");
    const continue_btn = info_box.querySelector(".buttons .lanjut");
    const quiz_box = document.querySelector(".quiz_box");
    const result_box = document.querySelector(".result_box");
    const option_list = document.querySelector(".option_list");
    // const time_line = document.querySelector("header .time_line");
    const timeText = document.querySelector(".timer .time_left_txt");
    const timeCount = document.querySelector(".timer .timer_sec");

    // if startQuiz button clicked
    start_btn.onclick = ()=>{
        info_box.classList.add("activeInfo"); //show info box
    }

    // if exitQuiz button clicked
    exit_btn.onclick = ()=>{
        info_box.classList.remove("activeInfo"); //hide info box
    }

    // if continueQuiz button clicked
    continue_btn.onclick = ()=>{
        info_box.classList.remove("activeInfo"); //hide info box
        quiz_box.classList.add("activeQuiz"); //show quiz box
        showQuetions(0); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
        startTimer(25); //calling startTimer function
        // startTimerLine(0); //calling startTimerLine function
    }

    let timeValue =  25;
    let que_count = 0;
    let que_numb = 1;
    let userScore = 0;
    let counter;
    let counterLine;
    let widthValue = 0;

    // const restart_quiz = result_box.querySelector(".buttons .restart");
    const quit_quiz = result_box.querySelector(".buttons .quit");

    // if restartQuiz button clicked
    // restart_quiz.onclick = ()=>{
    //     quiz_box.classList.add("activeQuiz"); //show quiz box
    //     result_box.classList.remove("activeResult"); //hide result box
    //     timeValue = 25; 
    //     que_count = 0;
    //     que_numb = 1;
    //     userScore = 0;
    //     widthValue = 0;
    //     showQuetions(que_count); //calling showQestions function
    //     queCounter(que_numb); //passing que_numb value to queCounter
    //     clearInterval(counter); //clear counter
    //     clearInterval(counterLine); //clear counterLine
    //     startTimer(timeValue); //calling startTimer function
    //     startTimerLine(widthValue); //calling startTimerLine function
    //     timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    //     next_btn.classList.remove("show"); //hide the next button
    // }

    // if quitQuiz button clicked
    quit_quiz.onclick = ()=>{
        window.location.reload(); //reload the current window
    }

    const next_btn = document.querySelector("footer .next_btn");
    const bottom_ques_counter = document.querySelector("footer .total_que");

    // if Next Que button clicked
    next_btn.onclick = ()=>{
        // const number = document.querySelector(".number")
        if(que_count < questions.length - 1){ //if question count is less than total question length
            que_count++; //increment the que_count value
            que_numb++; //increment the que_numb value
            // number.innerHTML = `${que_numb}/15`
            showQuetions(que_count); //calling showQestions function
            queCounter(que_numb); //passing que_numb value to queCounter
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            startTimer(timeValue); //calling startTimer function
            timeText.textContent = "Time Left"; //change the timeText to Time Left
            next_btn.classList.remove("show"); //hide the next button
        }else{
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            showResult(); //calling showResult function
        }
    }

    // getting questions and options from array
    let pembahasan = false;
    function showQuetions(index){
        const que_contain = document.querySelector('.que_contain');
        // console.log(que_contain)
        const que_text = document.querySelector(".que_text");
        const que_img = document.querySelector(".que_img");
        const footer = document.querySelector('footer')
        if(questions[index].image){
            quiz_box.style.height = '95%'
            footer.style.padding = `0 30px`
            let img_tag = `<img src="${questions[index].image}">`
            // que_contain.style.alignItems = "flex-start" 
            que_img.innerHTML = img_tag
        }else{
            quiz_box.style.height = '90%'
            footer.style.padding = `2% 30px 0 30px`
            let img_tag = ``
            que_img.innerHTML = img_tag
        }

        //creating a new span and div tag for question and option and passing the value using array index
        let que_tag = '<span>'+ questions[index].question +'</span>';
        let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[4] +'</span></div>';
        que_text.innerHTML = que_tag; //adding new span tag inside que_tag
        option_list.innerHTML = option_tag; //adding new div tag inside option_tag
        
        const option = option_list.querySelectorAll(".option");

        for(let i=0; i < option.length; i++){
            console.log(option[i])
                    option[i].onclick=()=>{
                        optionSelected(option[i])
                    }
                }

        // set onclick attribute to all available options
        // if(!pembahasan){
        //     for(let i=0; i < option.length; i++){
        //         option[i].onclick=()=>{
        //             optionSelected(option[i])
        //         }
        //     }
        // }else{
        //     let correcAns = questions[index].answer
        //     for(let i =0; i < option.length; i++){
        //         if(option[i].textContent == correcAns){
        //             option[i].classList.add("correct"); //adding green color to correct selected option
        //             option[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        //         }

        //     }
        //     // next.classList.add("show");
        //     // next.classList.remove("dis-none");
        // }
        
    }

    // creating the new div tags which for icons
    let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

    //if user clicked on option
    let wrongAns = [];
    let wrongNum = [];
    function optionSelected(answer){
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        let userAns = answer.textContent; //getting user selected option
        let correcAns = questions[que_count].answer; //getting correct answer from array
        const allOptions = option_list.children.length; //getting all option items
        answer.classList.add("choose");
        
        if(userAns == correcAns){ //if user selected option is equal to array's correct answer
            userScore += 1; //upgrading score value with 1
            // answer.classList.add("choose"); //adding green color to correct selected option
            // answer.classList.add("correct"); //adding green color to correct selected option
            // answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
            // console.log("Correct Answer");
        }else{
            userScore += 0;
            wrongAns.push(correcAns);
            wrongNum.push(que_count);
            // answer.classList.add("choose");
            // answer.classList.add("incorrect"); //adding red color to correct selected option
            // answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option

            // for(let i=0; i < allOptions; i++){
            //     if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
            //         option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            //         option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
            //         console.log("Auto selected correct answer.");
            //     }
            // }
        }
        for(let i=0; i < allOptions; i++){
            option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        }
        next_btn.classList.add("show"); //show the next button if user selected any option
        return wrongAns, wrongNum;
    }

    function saveScore(userScore){
        let xhr = new XMLHttpRequest()
        if(questions === questionsOne){
            xhr.open('POST', '/quizOne', true)
        }else if(questions === questionsTwo){
            xhr.open('POST', '/quizTwo', true)
        }else if(questions === questionsThree){
            xhr.open('POST', '/quizThree', true)
        }else{
            xhr.open('POST', '/evaluasi', true)
        }
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Print received data from server
                result.innerHTML = this.responseText;
                btnQuit.href = '/home.html'
            }
        }
        let data = JSON.stringify({"quizScore" : userScore, "username" : username})
        xhr.send(data)
    }

    function showResult(){
        info_box.classList.remove("activeInfo"); //hide info box
        quiz_box.classList.remove("activeQuiz"); //hide quiz box
        result_box.classList.add("activeResult"); //show result box
        const scoreText = result_box.querySelector(".score_text");
        
        explanation(wrongAns, wrongNum)
        // const explain = result_box.querySelector(".explain")
        // explain.onclick=()=>{
        //     console.log("Explanation Open")
        //     explanation(wrongAns)
        // }

        if (userScore > 12){ // if user scored more than 3
            //creating a new span tag and passing the user score number and total question number
            let scoreTag = `<span>Selamat, kamu berhasil menjawab ${userScore} dari ${questions.length}</span>`;
            scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        }
        else if(userScore > 8){ // if user scored more than 1
            let scoreTag = `<span>Jawaban yang benar ada ${userScore} dari ${questions.length}. </span>`;
            scoreText.innerHTML = scoreTag;
        }
        else{ // if user scored less than 1
            let scoreTag = `<span> Jawaban yang benar hanya ${userScore} dari ${questions.length}. `;
            scoreText.innerHTML = scoreTag;
        }
        const total = Math.round(userScore/questions.length * 100)
        saveScore(total)
        // if(total%)
        result_box.querySelector('.total_score').innerHTML = `<p>${total} </p>`

    }

    function explanation(ans, num){
     const explainBtn = result_box.querySelector(".explain");
    //  let index = 0;
     console.log(num)
     next_btn.classList.remove('show');
     next_btn.classList.add('dis-none');

     explainBtn.onclick =()=>{
        document.querySelector('.explain-pop').classList.add('visible')
        result_box.classList.add('dis-none');
        start_btn.classList.add('dis-none');
        bottom_ques_counter.classList.add('dis-none');
        timeText.classList.add('dis-none')
        timeCount.classList.add('dis-none')    
        pembahasan = true;


        const expContainer = document.querySelector('.isi-pembahasan');     

        for(let i =0 ;i < num.length; i++){
            let numIndex = num[i];
            console.log(numIndex)

            const divBox = document.createElement('div');
            divBox.className = 'quiz_box';
            expContainer.append(divBox)

            divBox.classList.add('activeQuiz')
            divBox.style.position = 'relative';
            divBox.style.color = 'black'
            divBox.style.padding = '2rem'
            divBox.style.marginBottom = '4rem'

            if(!(divBox.hasChildNodes())){
                const section = document.createElement('section');
                divBox.append(section)

                const divCont = document.createElement('div')
                divCont.className = 'que_contain';
                section.append(divCont)

                const divOpt = document.createElement('div');
                divOpt.className = 'option_list';
                section.append(divOpt)

                const divImg = document.createElement('div')
                divImg.className = 'que_img'
                const divText = document.createElement('div')
                divText.className = 'que_text'
                divCont.append(divImg)
                divCont.append(divText)

                console.log(questions[numIndex])

                if(questions[numIndex].image){
                    // divBox.style.height = '95%'
                    let img_tag = `<img src="${questions[numIndex].image}">`
                    divImg.innerHTML = img_tag
                }else{
                    // divBox.style.height = '90%'
                    let img_tag = ``
                    divImg.innerHTML = img_tag
                }
                let que_tag = '<span>'+ questions[numIndex].question +'</span>';
                let option_tag = '<div class="option"><span>'+ questions[numIndex].options[0] +'</span></div>'
                + '<div class="option"><span>'+ questions[numIndex].options[1] +'</span></div>'
                + '<div class="option"><span>'+ questions[numIndex].options[2] +'</span></div>'
                + '<div class="option"><span>'+ questions[numIndex].options[3] +'</span></div>'
                + '<div class="option"><span>'+ questions[numIndex].options[4] +'</span></div>';
                divText.innerHTML = que_tag; //adding new span tag inside que_tag
                divOpt.innerHTML = option_tag; //adding new div tag inside option_tag
                
                console.log(divImg.innerHTML)
                console.log(divText)

                const option = divOpt.querySelectorAll(".option");
                let correcAns = questions[numIndex].answer
                for(let i =0; i < option.length; i++){
                    if(option[i].textContent == correcAns){
                        option[i].classList.add("correct"); //adding green color to correct selected option
                        option[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
                    }

                }

                
            }

        }
        
        document.querySelector('.btn-tutup').onclick=()=>{
            document.querySelector('.explain-pop').classList.remove('visible')
            document.querySelector('.result_box').classList.remove('dis-none')
        }
     }
    }

    function startTimer(time){
        counter = setInterval(timer, 1000);
        function timer(){
            timeCount.textContent = time; //changing the value of timeCount with time value
            time--; //decrement the time value
            if(time < 9){ //if timer is less than 9
                let addZero = timeCount.textContent; 
                timeCount.textContent = "0" + addZero; //add a 0 before time value
            }
            if(time <= 0){ //if timer is less than 0
                clearInterval(counter); //clear counter
                timeText.textContent = "Time Off"; //change the time text to time off
                const allOptions = option_list.children.length;
                wrongNum.push(que_count)
                let correcAns = questions[que_count].answer; //getting correct answer from array
                // for(let i=0; i < allOptions; i++){
                //     if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                //         option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                //         option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                //         console.log("Time Off: Auto selected correct answer.");
                //     }
                // }
                for(let i=0; i < allOptions; i++){
                    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
                }
                next_btn.classList.add("show"); //show the next button if user selected any option
                
            }
        }
    }

    function queCounter(index){
            //creating a new span tag and passing the question number and total question
            let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
            bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
    }

}