document.addEventListener('DOMContentLoaded', function () {
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const studentForm = document.getElementById('studentForm');
    const subjectsContainer = document.getElementById('subjects');
    const fullNameInput = document.getElementById('fullName');
    const rollNumberInput = document.getElementById('rollNumber');

    addSubjectBtn.addEventListener('click', addSubjectRow);
    studentForm.addEventListener('submit', generateScoreCard);

    function addSubjectRow() {
        const subjectRow = document.createElement('div');
        subjectRow.classList.add('subject-row');

        subjectRow.innerHTML = `
            <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" class="subject" name="subject" pattern="[A-Za-z]+" required>
            </div>
            <div class="form-group">
                <label for="outOf">Out of:</label>
                <select name="outOf" class="outOf" required>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="form-group">
                <label for="marksObtained">Obtained Marks:</label>
                <input type="number" class="marksObtained" name="marksObtained" min="0" required>
            </div>
            <button type="button" class="removeBtn">Remove Subject</button>
        `;

        const removeBtn = subjectRow.querySelector('.removeBtn');
        removeBtn.addEventListener('click', () => {
            subjectRow.remove();
        });

        subjectsContainer.appendChild(subjectRow);
    }

    function generateScoreCard(event) {
        event.preventDefault();

        const subjectsData = [];
        const subjectRows = document.querySelectorAll('.subject-row');
        subjectRows.forEach(row => {
            const subjectName = row.querySelector('.subject').value;
            const outOf = row.querySelector('.outOf').value;
            const marksObtained = row.querySelector('.marksObtained').value;
            const subjectInfo = `${subjectName},${outOf},${marksObtained}`;
            subjectsData.push(subjectInfo);
        });

        // Get student name and roll number
        const fullName = fullNameInput.value;
        const rollNumber = rollNumberInput.value;

        // Pass student name and roll number as query parameters
        const scorecardUrl = `score.html?studentName=${encodeURIComponent(fullName)}&rollNumber=${encodeURIComponent(rollNumber)}&subjects=${JSON.stringify(subjectsData)}`;
        window.location.href = scorecardUrl;
    }
});
