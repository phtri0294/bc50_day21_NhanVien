function ListStaff() {
    this.arr = [];

    // Tìm vị trí account trong mảng
    this.findPosition = function (account) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var findPosition = this.arr[i];
            if (findPosition.account === account) {
                index = i;
                break;
            }
        }
        return index;
    }

    // Thêm nhân viên
    this.addStaff = function (member) {
        this.arr.push(member);
    };

    // Xóa nhân viên
    this.delStaff = function (member) {
        var index = this.findPosition(member);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    // Sửa thông tin nhân viên
    this.findStaff = function (member) {
        var index = this.findPosition(member);
        if (index !== -1) {
            return this.arr[index];
        }
    };

    // Cập nhật thông tin nhân viên 
    this.updateStaff = function (member) {
        var index = this.findPosition(member.account); 
        if (index !== -1) {
            this.arr[index] = member;
        }
    };

}

// Tìm kiếm thông tin nhân viên 
ListStaff.prototype.searchStaff = function (keyword) {  
    var inputSearch = [];

    for (var i = 0; i < this.arr.length; i++) {
        var member = this.arr[i];

        //Chuyển keyword về chữ viết thường
        var keywordToLowerCase = keyword.toLowerCase();
        //Chuyển member.jobTitle về chữ viết thường
        var jobTitleToLowerCase = member.jobTitle.toLowerCase();

        if (jobTitleToLowerCase.indexOf(keywordToLowerCase) !== -1) {
            inputSearch.push(member);
        }
    }
    return inputSearch;
};
