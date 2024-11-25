let startTime;
let timerInterval;
let mistakeCount = 0;
let totalScore = 0;

function randomArray() {
    const colors = ['#333', '#666', '#999', '#ccc', '#000', '#444', '#888', '#bbb', '#eee', '#aaa'];
    const sizes = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
    const shuffledColors = colors.sort(() => Math.random() - 0.5);
    const shuffledSizes = sizes.sort(() => Math.random() - 0.5);
    updateCircles(shuffledColors, shuffledSizes);
}

function shuffleArray() {
    const circleContainer = document.getElementById('circle-container');
    const circles = Array.from(circleContainer.children);
    for (let i = circles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        circleContainer.appendChild(circles[j]);
    }
}

function bubbleSort() {
    clearInterval(timerInterval); // Stop the timer
    const circleContainer = document.getElementById('circle-container');
    const circles = Array.from(circleContainer.children);
    const sizes = circles.map(circle => parseInt(circle.style.width));

    let n = sizes.length;
    let swapped;
    let feedbackMessage = '';
    mistakeCount = 0;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (sizes[i] > sizes[i + 1]) {
                feedbackMessage += `Swapping circles of size ${sizes[i]} and ${sizes[i + 1]}<br>`;
                [sizes[i], sizes[i + 1]] = [sizes[i + 1], sizes[i]];
                swapped = true;
                mistakeCount++;
            }
        }
        n--;
    } while (swapped);

    document.getElementById('feedback-message').innerHTML = feedbackMessage;
    updateCirclesBySize(sizes);

    // Calculate and display the score
    const elapsedTime = new Date() - startTime;
    const timeScore = Math.max(0, 100 - Math.floor(elapsedTime / 1000)); // Example scoring logic based on time
    const mistakeScore = Math.max(0, 100 - mistakeCount * 10); // Example scoring logic based on mistakes
    totalScore = Math.max(0, timeScore + mistakeScore);
    document.getElementById('score').innerText = `Score: ${totalScore}`;

    // Display congratulations if score is 100
    if (totalScore >= 100) {
        document.getElementById('congratulations').style.display = 'block';
    }
}

function swapCircles() {
    const value1 = parseInt(document.getElementById('value1').value);
    const value2 = parseInt(document.getElementById('value2').value);
    const circleContainer = document.getElementById('circle-container');
    const circles = Array.from(circleContainer.children);

    const index1 = circles.findIndex(circle => parseInt(circle.innerText) === value1);
    const index2 = circles.findIndex(circle => parseInt(circle.innerText) === value2);

    if (index1 >= 0 && index2 >= 0) {
        const temp = circles[index1].style.width;
        circles[index1].style.width = circles[index2].style.width;
        circles[index1].style.height = circles[index2].style.height;
        circles[index1].innerText = circles[index2].innerText;
        circles[index2].style.width = temp;
        circles[index2].style.height = temp;
        circles[index2].innerText = temp.replace('px', '');
        circleContainer.insertBefore(circles[index2], circles[index1]);
        circleContainer.insertBefore(circles[index1], circles[index2].nextSibling);
    } else {
        alert('Invalid values');
    }
}

function restart() {
    location.reload();
}

function start() {
    startTime = new Date();
    timerInterval = setInterval(updateSortingTime, 10);
}

function updateSortingTime() {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;

    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    document.getElementById('sorting-time').innerText = `Sorting Time: ${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function goNext() {
    if (totalScore >= 100) {
        document.getElementById('congratulations').style.display = 'block';
        document.getElementById('message').style.display = 'none';
    } else {
        document.getElementById('message').style.display = 'block';
        document.getElementById('congratulations').style.display = 'none';
    }
}

function updateCircles(colors, sizes) {
    const circleContainer = document.getElementById('circle-container');
    const circles = circleContainer.children;
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = colors[i];
        circles[i].style.width = sizes[i] + 'px';
        circles[i].style.height = sizes[i] + 'px';
        circles[i].innerText = sizes[i];
    }
}

function updateCirclesBySize(sizes) {
    const circleContainer = document.getElementById('circle-container');
    const circles = Array.from(circleContainer.children);
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.width = sizes[i] + 'px';
        circles[i].style.height = sizes[i] + 'px';
        circles[i].innerText = sizes[i];
        circleContainer.appendChild(circles[i]);
    }
}