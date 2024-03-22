var paragraph = document.getElementById('paragraph');
var data = JSON.parse(localStorage.getItem('report')) || [];

function toggleSidebar(){
    let sidebar = document.getElementById('sidebar');
    let toggle = document.getElementById('toggle');
    if(sidebar.style.display === 'block' || sidebar.style.display === ''){
        sidebar.style.display = 'none';
        toggle.innerHTML = '<';
    } else{
        sidebar.style.display = 'block';
        sidebar.style.width = '20%';
        toggle.innerHTML = '>';
    }
}

function addItem(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let age = document.getElementById('age').value;
    var list = document.getElementById('list');

    if(!firstName){
        alert('Please enter your "First Name."');
        return;
    }

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    };

    data.push(newUser);

    localStorage.setItem('report', JSON.stringify(data));

    list.innerHTML = '';
    for(let i = 0; i < data.length; i++){
        list.innerHTML += `
        <li>
            <button class="database" onclick="database(${i})">
                ${i + 1}. ${data[i].firstName} ${data[i].lastName}
            </button>
            <div class="group">
                <div class="items">
                    <button class="delayed-open" onclick="delayed_open(${i})">
                        <img src="./images/delayed-open.svg" class="points">
                    </button>
                </div>
            </div>
            <div id="popover-menu-${i}"></div>
        </li>
        `;
    }
}

function information(){
    for(let i = 0; i < data.length; i++){
        list.innerHTML += `
        <li>
            <button class="database" onclick="database(${i})">
                ${i + 1}. ${data[i].firstName} ${data[i].lastName}
            </button>
            <div class="group">
                <div class="items">
                    <button class="delayed-open" onclick="delayed_open(${i})">
                        <img src="./images/delayed-open.svg" class="points">
                    </button>
                </div>
            </div>
            <div id="popover-menu-${i}"></div>
        </li>
        `;
    }
}

information()

function delayed_open(index){
    let menu = document.getElementById(`popover-menu-${index}`);
    if(!menu) return;

    if(menu.style.display === 'block'){
        menu.style.display = 'none';
    } else{
        menu.style.display = 'block';
    }
    menu.innerHTML = `
    <button class="menu-item rename" onclick="rename(${index})">
        <img src="./images/edit.svg">
        Rename
    </button>
    <button class="menu-item trash" onclick="deleteData(${index})">
        <img src="./images/trash.svg">
         Delete data
    </button>
    `;
}

function deleteData(index){
    data.splice(index, 1);
    localStorage.setItem('report', JSON.stringify(data));
    location.reload();
}

function ClearAllData(){
    localStorage.removeItem('report');
    data = []; // data ning ichidagi ma'lumotlarni tozalash
    list.innerHTML = ''; // HTML ro'yxatni tozalash
    paragraph.innerHTML = ''; // Matnni tozalash
}

function database(index){
    paragraph.innerHTML = `
    <h1>
        ${data[index].firstName} ${data[index].lastName}
    </h1><br>
    <p>
        First Name: ${data[index].firstName}<br>
        Last Name:  ${data[index].lastName}<br>
        Birth Day:  ${data[index].age}
    </p><br>
    <button class="edit" onclick="edit(${index})">
        Edit
    </button>
    `;
}

function edit(index){
    // Foydalanuvchi ma'lumotlarini olish
    let firstName = data[index].firstName;
    let lastName = data[index].lastName;
    let age = data[index].age;

    // Ma'lumotlarni o'zgartirish oynasini ochish
    paragraph.innerHTML = `
        <div class="add_new_data">
            <div class="row">
                <div class="col-25">
                    <label for="firstName">
                        <font>First Name</font>
                    </label><br>
                </div>
                <div class="col-75">
                    <input type="text" id="firstName" placeholder="Your name…" value="${firstName}">
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="lastName">
                        <font>Last Name</font>
                    </label><br>
                </div>
                <div class="col-75">
                    <input type="text" id="lastName" placeholder="Your last name…" value="${lastName}">
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="age">
                        <font>Birth Day</font>
                    </label><br>
                </div>
                <div class="col-75">
                    <input type="date" id="age" value="${age}">
                </div>
            </div>

            <button type="button" onclick="updateItem(${index})" class="btn">
                Update Item
            </button>
        </div>
    `;
}

function updateItem(index) {
    let newFirstName = document.getElementById('firstName').value;
    let newLastName = document.getElementById('lastName').value;
    let newAge = document.getElementById('age').value;

    data[index].firstName = newFirstName;
    data[index].lastName = newLastName;
    data[index].age = newAge;

    localStorage.setItem('report', JSON.stringify(data));
    location.reload();
    database(index);
}

function NewData() {
    paragraph.innerHTML = `
    <div class="add_new_data">
        <div class="row">
            <div class="col-25">
                <label for="firstName">
                    <font>First Name</font>
                </label><br>
            </div>
            <div class="col-75">
                <input type="text" id="firstName" placeholder="Your name…">
            </div>
        </div>

        <div class="row">
            <div class="col-25">
                <label for="lastName">
                    <font>Last Name</font>
                </label><br>
            </div>
            <div class="col-75">
                <input type="text" id="lastName" placeholder="Your last name…">
            </div>
        </div>

        <div class="row">
            <div class="col-25">
                <label for="age">
                    <font>Birth Day</font>
                </label><br>
            </div>
            <div class="col-75">
                <input type="date" id="age">
            </div>
        </div>

        <button type="button" onclick="addItem()" class="btn">
            Add Item
        </button>
    </div>
    `;
}