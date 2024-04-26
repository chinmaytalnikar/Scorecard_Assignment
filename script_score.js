document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const studentName = queryParams.get('studentName');
    const rollNumber = queryParams.get('rollNumber');
    const subjectsData = JSON.parse(queryParams.get('subjects'));

    const scorecardBody = document.getElementById('scorecardBody');
    const remarksDiv = document.getElementById('remarks');
    const studentInfo = document.getElementById('studentInfo');

    let totalMarks = 0;
    let totalObtainedMarks = 0;
    let failedSubjectsCount = 0;

    // Display student name and roll number
    //studentInfo.textContent = `Student Name: ${studentName}, Roll Number: ${rollNumber}`;

    subjectsData.forEach((subject, index) => {
        const [subjectName, outOf, obtainedMarks] = subject.split(',');

        const percentage = (parseInt(obtainedMarks) / parseInt(outOf)) * 100;
        totalMarks += parseInt(outOf);
        totalObtainedMarks += parseInt(obtainedMarks);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${subjectName}</td>
            <td>${outOf}</td>
            <td>${obtainedMarks}</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${getGrade(percentage)}</td>
        `;
        scorecardBody.appendChild(row);

        if (parseInt(obtainedMarks) < 40) {
            row.classList.add('failed');
            failedSubjectsCount++;
        }
    });

    const overallPercentage = totalMarks > 0 ? (totalObtainedMarks / totalMarks) * 100 : 0;
    const overallGrade = getGrade(overallPercentage);

    remarksDiv.innerHTML = `
        <p>Overall Percentage: ${overallPercentage.toFixed(2)}%</p>
        <p>Overall Grade: ${overallGrade}</p>
        <p>Remarks: ${failedSubjectsCount > 0 ? 'Failed in ' + failedSubjectsCount + ' subjects' : 'Passed'}</p>
    `;

    function getGrade(percentage) {
        if (percentage >= 80) {
            return 'Distinction';
        } else if (percentage >= 60) {
            return 'First Class';
        } else if (percentage >= 40) {
            return 'Pass';
        } else {
            return 'Fail';
        }
    }
});

