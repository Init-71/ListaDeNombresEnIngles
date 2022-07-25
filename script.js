//recuperar los elementos html a js
const input = document.querySelector('#input');
const usersList = document.querySelector('#users');

let users = [];

//función asincrona que llama a loadUsers() y renderiza a los users 
window.addEventListener('DOMContentLoaded', async() => { 

    usersList.innerHTML = `Cargando datos...`

    const data = await loadUsers()
    renderUsers(data.data)
    users = data.data
    renderUsers(users)
});


//Función que hace una request a la API (o servidor), y retonra en json la información recibida
async function loadUsers( ) { 
    const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=1000')
    return await response.json()
}

//Esta función obtiene los tipeos del teclado y compara ( .map ) lo escrito con cada user ( .map ) y convierte first and lastname en lowerCase para mejorar el filtro y renderiza a los nuevos users 
input.addEventListener('keyup', e => {
    // console.log(input.value)
    const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase()))
    renderUsers(newUsers)
});

//Crea los elementos li de cada user ( f.map ) recorre al objeto por cada user
const createUserItems = users => users.map(user => `<li class="hover:bg-zinc-700 hover:cursor-pointer py-1"> ${ user.firstname } ${ user.lastname } </li>`).join(' ')   

//función que renderiza en pantalla los users
function renderUsers(users){
    const itemStrings = createUserItems(users)
    usersList.innerHTML = itemStrings;
}