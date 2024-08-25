// Hàm trích xuất danh sách các department duy nhất từ dữ liệu nhân viên
function extractUniqueDepartments(employees) {
  const departments = new Set();

  employees.forEach(employee => {
    if (employee.department) {
      departments.add(employee.department);
    }
  });

  return Array.from(departments);
}

// Hàm tạo bảng từ danh sách department
function createDepartmentTable(departments) {
  const departmentTableBody = document.getElementById('departmentTableBody');

  departments.forEach((department, index) => {
    const row = document.createElement('tr');

    const cellIndex = document.createElement('td');
    cellIndex.textContent = index + 1;
    row.appendChild(cellIndex);

    const cellDepartment = document.createElement('td');
    cellDepartment.textContent = department;
    row.appendChild(cellDepartment);

    const cellCreationDate = document.createElement('td');
    const creationDate = new Date().toISOString(); // Sử dụng ngày hiện tại
    cellCreationDate.textContent = creationDate;
    row.appendChild(cellCreationDate);

    const cellAction = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    cellAction.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    cellAction.appendChild(deleteButton);

    row.appendChild(cellAction);

    departmentTableBody.appendChild(row);
  });
}

// Hàm lấy dữ liệu từ file JSON và tạo bảng
function fetchAndDisplayDepartments() {
  fetch('database.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data loaded:', data); // Kiểm tra dữ liệu có được tải không
      const departments = extractUniqueDepartments(data);
      console.log('Departments extracted:', departments); // Kiểm tra các department trích xuất được
      createDepartmentTable(departments);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Gọi hàm để tạo bảng khi trang được tải
document.addEventListener('DOMContentLoaded', fetchAndDisplayDepartments);
