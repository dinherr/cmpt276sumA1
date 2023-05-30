//initialize variables
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
   49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
 
var newGrade = document.getElementById('newGrade');
newGrade.addEventListener("keypress", newGradeInput);

var bounds = document.getElementsByName("bounds");
for (var i = 0; i< bounds.length; i++){
    bounds[i].addEventListener("keypress", updateBounds);
}

var stats = {
    countAp: 0,
    countA: 0,
    countAm: 0,
    countBp: 0,
    countB: 0,
    countBm: 0,
    countCp: 0,
    countC: 0,
    countCm: 0,
    countD: 0,
    countF: 0
}

stats = returnStat();
barChart();


//functions: validateGrade - check if the grade falls within the bounds
//                           if yes, return according index
//           returnStat    - runs through the grades and sections them according to bounds
//                           returns variable with array
//           newGradeInput - when pressing "enter", function will process the value with regards
//                           to illegal inputs.
//           barChart      - when called, generates the bar chart
//           updateBounds  - when called, checks all the bounds to ensure there is no illegal input.
//                           if not, change the bounds

function validateGrade(gIndex){
    var grade = grades[gIndex];
    var bIndex = 0;

    //check the grade against the bounds until it is larger than one of them
    while (grade < bounds[bIndex].value){
        bIndex++;
        //if the grade is larger than no bounds, return 0;
        if (bIndex > 11){
            return 0;
        }  
        if (grade >= bounds[bIndex].value){
            return bIndex;
        }
         
    }
    return 0;
}

function returnStat(){
    var tempStat = {
        countAp: 0,
        countA: 0,
        countAm: 0,
        countBp: 0,
        countB: 0,
        countBm: 0,
        countCp: 0,
        countC: 0,
        countCm: 0,
        countD: 0,
        countF: 0
    }

    //process each grade in given grades
    //according to the output, sort into tempStat properties
    for(var i = 0; i<grades.length; i++){
        var threshold = validateGrade(i);
        switch(threshold){
            case 1:
                tempStat.countAp += 1;
                break;
            case 2:
                tempStat.countA += 1;
                break;
            case 3:
                tempStat.countAm += 1;
                break;
            case 4:
                tempStat.countBp += 1;
                break;
            case 5:
                tempStat.countB += 1;
                break;
            case 6:
                tempStat.countBm += 1;
                break;
            case 7:
                tempStat.countCp += 1;
                break;
            case 8:
                tempStat.countC += 1;
                break;
            case 9:
                tempStat.countCm += 1;
                break;
            case 10:
                tempStat.countD += 1;
                break;
            case 11:
                tempStat.countF += 1;
                break;
        }
            
    }
    return(tempStat);
}

function newGradeInput(event){
    if (event.key == "Enter"){
        event.preventDefault();
        var gradePush = document.getElementById('newGrade').value;
        document.getElementById('invalidGrade').innerHTML = '';
        
        if (gradePush == ""){
            document.getElementById('invalidGrade').innerHTML = "Please input a grade.";
            return -1;
        }
        
        gradePush = parseFloat(gradePush);

        if (gradePush > bounds[0].value || gradePush < bounds[11].value){
            document.getElementById('invalidGrade').innerHTML = "Please input a value between " + bounds[11].value
             + " and " + bounds[0].value;
            return -1;
        }
        else{
        grades.push(gradePush);
        }
        
        document.getElementById('newGrade').value = '';
        stats = returnStat();
        barChart();
    }
}

function barChart(){
    var chooseBar = document.getElementsByClassName("bars");
    var movement = setInterval(move, 10);
    var counter = 0;
    var width = 1;
    function move(){
        //loop through stats' counts to change bars appropriately
        for (const prop in stats){
            width = 1;
            if(stats.hasOwnProperty(prop)){
                if (counter > 10){
                    clearInterval(movement);
                }
                else {
                    width = stats[prop] * 5;
                    chooseBar[counter].style.width = width + '%';
                } 
            }
        counter++;    
        }
    }
}

function updateBounds(event){
    if (event.key == "Enter"){
        event.preventDefault();
        document.getElementById('invalidBound').innerHTML = ""
        var newBounds = document.getElementsByName('bounds');
        var counter = 0;
        var updating = 1;    

        if (bounds[11].valueAsNumber < 0){
            document.getElementById('invalidBound').innerHTML = "Minimum bound is 0."
            return 0;
        }
        if (bounds[0].valueAsNumber > 200.00){
            document.getElementById('invalidBound').innerHTML = "Maximum bound is 200."
            return 0;
        }

        while (counter < 11){
            if (newBounds[counter].valueAsNumber < newBounds[counter+1].valueAsNumber){
                document.getElementById('invalidBound').innerHTML = ("Bounds overlapping. " + newBounds[counter].value
                 + " smaller than the next bound.");
                updating = 0;
                break;
            }
            else{
                counter++;
            }
        }
        
        //when updating is still valid, update the bounds, recalcuate the stats, and remake the bar chart.
        if (updating == 1){
            bounds = newBounds;
            stats = returnStat();
            barChart();
        }
    }

}
