function Staff(
    _account,
    _name,
    _email,
    _password,
    _birth,
    _salary,
    _jobTitle,
    _hoursWorked,
) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.birth = _birth;
    this.salary = _salary;
    this.jobTitle = _jobTitle;
    this.hoursWorked = _hoursWorked;
    this.rankStaff = '';
    this.totalSalary = 0;

    //Xếp loại nhân viên
    this.rankStaff = function () {
        if (this.hoursWorked >= 192) {
            this.rankStaff = 'Xuất sắc';
        } else if (this.hoursWorked < 192 && this.hoursWorked >= 176) {
            this.rankStaff = 'Giỏi';
        } else if (this.hoursWorked < 176 && this.hoursWorked >= 160) {
            this.rankStaff = 'Khá';
        } else {
            this.rankStaff = 'Trung bình';
        }
    };

    //Tính lương nhân viên
    this.totalSalary = function () {
        if (this.jobTitle === 'Sếp') {
            this.totalSalary = Number(this.salary) * 3 * this.hoursWorked;
        } else if (this.jobTitle === 'Trưởng phòng') {
            this.totalSalary = Number(this.salary) * 2 * this.hoursWorked;
        } else if (this.jobTitle === 'Nhân viên') {
            this.totalSalary = Number(this.salary) * 1 * this.hoursWorked;
        }
    };
}