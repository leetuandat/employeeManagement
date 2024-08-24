// fetch('https://dummyjson.com/users/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     firstName: 'Muhammad',
//     lastName: 'Ovi',
//     age: 250,
//     /* other user data */
//   })
// })
// .then(res => res.json())
// .then(console.log);



document.addEventListener("DOMContentLoaded", function () {
    const addEmployeeBtn = document.querySelector("#addEmployeeModal #btn-success1");

    addEmployeeBtn.addEventListener("click", function () {
        const name = document.getElementById("addName").value.trim();
        const age = document.getElementById("addAge").value.trim();
        const gender = document.getElementById("addGender").value.trim();
        const email = document.getElementById("addEmail").value.trim();
        const address = document.getElementById("addAddress").value.trim();
        const phone = document.getElementById("addPhone").value.trim();
        const department = document.getElementById("addDepartment").value.trim();
        const position = document.getElementById("addPosition").value.trim();


        if (!name || !age || !gender || !email || !address || !phone || !department || !position) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }


        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                
                const newId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;

                
                const newEmployee = {
                    id: newId,
                    firstName: name,
                    age: age,
                    gender: gender,
                    email: email,
                    address: address,
                    phone: phone,
                    department: department,
                    position: position,
                    title: position, 
                    role: "user" 
                };

             
                return fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEmployee)
                });
            })
            .then(response => response.json())
            .then(data => {
                alert("Thêm nhân viên thành công!");
                location.reload(); 
            })
            .catch(error => console.error('Lỗi khi thêm nhân viên:', error));
    });
});

