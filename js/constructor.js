document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    const saveButton = document.getElementById('saveSettings');
    const loadButton = document.getElementById('loadSettings');

    const invitations = []; // массив для приглашений

    // Генерация таб
    function generateTable() {
        tableContainer.innerHTML = ''; // Очистить контейнер

        if (invitations.length === 0) {
            tableContainer.textContent = 'Пока нет приглашений.';
            return;
        }

        // Создать таблицу
        const table = document.createElement('table');
        table.classList.add('styled-table'); // Класс для стилей

        // Создать заголовок таблицы
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Номер', 'Название встречи', 'Причина встречи', 'Дата', 'Место встречи', 'От кого'].forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Создать тело таблицы
        const tbody = document.createElement('tbody');
        invitations.forEach((invitation, index) => {
            const row = document.createElement('tr');

            const cells = [
                index + 1, // Номер
                invitation.title, // Название встречи
                invitation.reason, // Причина встречи
                invitation.date, // Дата
                invitation.place, // Место встречи
                invitation.from, // От кого
            ];

            cells.forEach((cellData) => {
                const td = document.createElement('td');
                td.textContent = cellData;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        tableContainer.appendChild(table);
    }


    // Обработка отправки формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('meetingTitle').value;
        const reason = document.getElementById('meetingReason').value;
        const date = document.getElementById('meetingDate').value;
        const place = document.getElementById('meetingPlace').value;
        const from = document.getElementById('meetingFrom').value;

        invitations.push({ title, reason, date, place, from }); // Добавить новое приглашение
        generateTable(); // Обновить таблицу
        form.reset(); // Сбросить форму
    });

    // Сохранение данных в LocalStorage
    saveButton.addEventListener('click', () => {
        localStorage.setItem('invitations', JSON.stringify(invitations));
        alert('Приглашения сохранены!');
    });

    // Загрузка данных из LocalStorage
    loadButton.addEventListener('click', () => {
        const savedInvitations = JSON.parse(localStorage.getItem('invitations'));
        if (savedInvitations) {
            invitations.length = 0; // Очистить текущие данные
            invitations.push(...savedInvitations); // Добавить данные из LocalStorage
            generateTable(); // Обновить таблицу
            alert('Приглашения загружены!');
        } else {
            alert('Нет сохранённых приглашений.');
        }
    });
});
