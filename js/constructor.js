document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableBody = document.getElementById('tableBody');
    const rowTemplate = document.getElementById('rowTemplate');
    const tableContainer = document.getElementById('tableContainer');
    let invitations = JSON.parse(localStorage.getItem('invitations')) || [];

    function saveToLocal() {
        localStorage.setItem('invitations', JSON.stringify(invitations));
    }

    function generateTable() {
        tableBody.innerHTML = '';

        // Скрыть таблицу, если массив invitations пуст или содержит только пустую запись
        const hasValidInvitations = invitations.some(invitation =>
            invitation.title || invitation.reason || invitation.date || invitation.place || invitation.from
        );

        if (!hasValidInvitations) {
            tableContainer.style.display = 'none';
            return;
        }

        tableContainer.style.display = 'block';

        invitations.forEach((invitation, index) => {
            if (!invitation.title && !invitation.reason && !invitation.date && !invitation.place && !invitation.from) {
                // Пропустить записи с пустыми полями
                return;
            }

            const row = rowTemplate.content.cloneNode(true);

            row.querySelector('.number').textContent = index + 1;
            row.querySelector('.title').textContent = invitation.title;
            row.querySelector('.reason').textContent = invitation.reason;
            row.querySelector('.date').textContent = invitation.date;
            row.querySelector('.place').textContent = invitation.place;
            row.querySelector('.from').textContent = invitation.from;

            const deleteButton = row.querySelector('.delete-button');
            deleteButton.setAttribute('data-index', index);
            deleteButton.addEventListener('click', deleteEntry);

            tableBody.appendChild(row);
        });
    }


    function deleteEntry(event) {
        const index = event.target.getAttribute('data-index');
        invitations.splice(index, 1);
        saveToLocal();
        generateTable();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        // Получение данных через document.getElementById
        const title = document.getElementById('meetingTitle').value.trim();
        const reason = document.getElementById('meetingReason').value;
        const date = document.getElementById('meetingDate').value;
        const place = document.getElementById('meetingPlace').value.trim();
        const from = document.getElementById('meetingFrom').value.trim();

        // Регулярное выражение для проверки текста
        const letterOnlyRegex = /^[A-Za-z\s-]+$/;

        // Валидация полей
        if (!title || !letterOnlyRegex.test(title)) {
            alert('Название встречи может содержать только латинские буквы, пробелы или дефисы.');
            return;
        }
        if (!place || !letterOnlyRegex.test(place)) {
            alert('Место встречи может содержать только латинские буквы, пробелы или дефисы.');
            return;
        }
        if (!from || !letterOnlyRegex.test(from)) {
            alert('Поле "От кого" может содержать только латинские буквы, пробелы или дефисы.');
            return;
        }
        if (!reason) {
            alert('Выберите причину встречи.');
            return;
        }
        if (!date) {
            alert('Выберите дату встречи.');
            return;
        }

        const invitation = { title, reason, date, place, from };
        invitations.push(invitation);

        saveToLocal();
        generateTable();
        form.reset();
    });

    // Слушаем изменения в localStorage
    window.addEventListener('storage', event => {
        if (event.key === 'invitations') {
            invitations = JSON.parse(event.newValue) || [];
            generateTable();
        }
    });

    generateTable();
});
