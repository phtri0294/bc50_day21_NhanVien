function getEle(id) {
    return document.getElementById(id);
}

var listStaff = new ListStaff();
var validation = new Validation();

getLocalStorage();

// Lây thông tin từ User
function getInfoStaff(isAdd) {
    var _account = getEle('tknv').value;
    var _name = getEle('name').value;
    var _email = getEle('email').value;
    var _password = getEle('password').value;
    var _birth = getEle('datepicker').value;
    var _salary = getEle('luongCB').value;
    var _jobTitle = getEle('chucvu').value;
    var _hoursWorked = getEle('gioLam').value;

    // ========================================================================== //
    // Kiểm tra - Validation
    var isValid = true;

    //Validation Account
    isValid =
        validation.kiemTraRong(_account, 'errorAccount', '(*) Vui lòng nhập tên tài khoản') &&
        validation.kiemTraDoDaiKiTu(
            _account,
            'errorAccount',
            '(*) Vui lòng nhập 4 - 6 kí tự',
            4,
            6
        );

    if (isAdd) {
        isValid =
            isValid &&
            validation.kiemTraTaiKhoanTonTai(
                _account,
                'errorAccount',
                '(*) Tài khoản đã tồn tại!',
                listStaff.arr
            );
    }

    //Validation Name
    isValid &=
        validation.kiemTraRong(_name, 'errorName', '(*) Vui lòng nhập tên nhân viên') &&
        validation.kiemTraChuoiKiTu(
            _name,
            'errorName',
            '(*) Vui lòng nhập chuỗi kí tự'
        );

    //Validation Email
    isValid &=
        validation.kiemTraRong(_email, 'errorEmail', '(*) Vui lòng nhập Email') &&
        validation.kiemTraPattern(
            _email,
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'errorEmail',
            '(*) Vui lòng nhập Email hợp lệ! (Ví dụ: abcd4@gmail.com)'
        );

    //Validation Password
    isValid &= validation.kiemTraRong(
        _password,
        'errorPassword',
        '(*) Vui lòng nhập mật khẩu'
    ) &&
        validation.kiemTraPassword(
            _password,
            'errorPassword',
            '(*) Vui lòng nhập mật khẩu từ 6 - 10 kí tự'
        ) &&
        validation.kiemTraPattern(
            _password,
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            'errorPassword',
            '(*) Vui lòng nhập mật khẩu chứa ít nhất 1 chữ số, 1 ký tự viết hoa, 1 ký tự thường, 1 ký tự đặc biệt và không có khoảng cách giữa các ký tự'
        );

    //Validation Birth
    isValid &= validation.kiemTraRong(
        _birth,
        'errorBirth',
        '(*) Vui lòng nhập ngày sinh'
    );

    //Validation JobTitle
    isValid &= validation.kiemTraChucVu(
        'chucvu',
        'errorJobTitle',
        '(*) Vui lòng chọn chức vụ'
    );

    //Validation Salary
    isValid &= validation.kiemTraRong(
        _salary,
        'errorSalary',
        '(*) Vui lòng nhập số tiền lương'
    ) && validation.kiemTraTienLuong(
        _salary,
        'errorSalary',
        '(*) Vui lòng nhập số tiền lương trong khoảng từ 1,000,000 đến 20,000,000'
    );

    //Validation HoursWorked
    isValid &= validation.kiemTraRong(
        _hoursWorked,
        'errorHoursWorked',
        '(*) Vui lòng nhập số giờ làm'
    ) && validation.kiemTraGioLamViec(
        _hoursWorked,
        'errorHoursWorked',
        '(*) Vui lòng nhập số giờ làm việc trong khoảng từ 80 đến 200'
    );

    if (!isValid) return null;
    // ========================================================================== //

    //Tạo đối tượng từ lớp đối tượng
    var staff = new Staff(
        _account,
        _name,
        _email,
        _password,
        _birth,
        _salary,
        _jobTitle,
        _hoursWorked,
    );

    // //Xếp loại nhân viên
    staff.rankStaff();

    // //Tính lương nhân viên
    staff.totalSalary();

    return staff;
}

//Tạo bảng
function renderTable(data) {
    var content = '';

    for (var i = 0; i < data.length; i++) {
        var staff = data[i];
        content += `
        <tr>
            <td>${staff.account}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.hoursWorked}</td>
            <td>${staff.jobTitle}</td>
            <td>${staff.totalSalary}</td>
            <td>${staff.rankStaff}</td>
            <td>
                <button class='btn btn-info' onclick="editStaff('${staff.account}')" data-toggle="modal" data-target="#myModal">Edit</button>
                <button class='btn btn-danger' onclick="deleteStaff('${staff.account}')">Delete</button>
            </td>
        </tr>
    `;
    }
    getEle('tableDanhSach').innerHTML = content;
}

// Thêm nhân viên
getEle('btnThemNV').addEventListener('click', function (event) {
    event.preventDefault();

    var member = getInfoStaff();
    if (member) {
        listStaff.addStaff(member);
        renderTable(listStaff.arr);
        setLocalStorage();
    }
});

// Xóa nhân viên
function deleteStaff(account) {
    listStaff.delStaff(account);
    renderTable(listStaff.arr);
    setLocalStorage();
}

// Sửa thông tin nhân viên
function editStaff(account) {
    var member = listStaff.findStaff(account);
    if (member) {
        getEle('tknv').value = member.account;
        getEle('tknv').disabled = true;

        getEle('name').value = member.name;
        getEle('email').value = member.email;
        getEle('password').value = member.password;
        getEle('datepicker').value = member.birth;
        getEle('luongCB').value = member.salary;
        getEle('chucvu').value = member.jobTitle;
        getEle('gioLam').value = member.hoursWorked;

        // Hiển thị Button
        getEle('btnCapNhat').style.display = 'inline-block';
        getEle('btnThemNV').style.display = 'none';
    }
}

// Cập nhật thông tin nhân viên 
getEle('btnCapNhat').addEventListener('click', function (event) {
    event.preventDefault();

    var member = getInfoStaff();
    listStaff.updateStaff(member);
    renderTable(listStaff.arr);
    setLocalStorage();
});

// // Tìm kiếm thông tin nhân viên
getEle('btnTimNV').addEventListener('click', function () {
    var keyword = getEle('searchName').value;
    var inputSearch = listStaff.searchStaff(keyword);
    renderTable(inputSearch);
});

// Lưu trữ: 
function setLocalStorage() {
    var dataString = JSON.stringify(listStaff.arr);
    localStorage.setItem('listStaff', dataString);
}

// Lưu trữ: 
function getLocalStorage() {
    if (localStorage.getItem('listStaff')) {
        var dataString = localStorage.getItem('listStaff');
        listStaff.arr = JSON.parse(dataString);
        renderTable(listStaff.arr);
    }
}
