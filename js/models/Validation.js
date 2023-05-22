function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === '') {
      //False
      getEle(errorId).style.display = 'block';
      getEle(errorId).innerHTML = mess;
      return false;
    }

    //True
    getEle(errorId).style.display = 'none';
    getEle(errorId).innerHTML = '';
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
    if (min <= value.length && value.length <= max) {
      //True
      getEle(errorId).style.display = 'none';
      getEle(errorId).innerHTML = '';
      return true;
    }

    //False
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, errorId, mess) {
    var letter =
      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
      'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
      'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
    if (value.match(letter)) {
      //True
      getEle(errorId).style.display = 'none';
      getEle(errorId).innerHTML = '';
      return true;
    }

    //False
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraPattern = function (value, letter, errorId, mess) {
    if (value.match(letter)) {
      //True
      getEle(errorId).style.display = 'none';
      getEle(errorId).innerHTML = '';
      return true;
    }

    //False
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraChucVu = function (idSelect, errorId, mess) {
    if (getEle(idSelect).selectedIndex !== 0) {
      //True
      getEle(errorId).style.display = 'none';
      getEle(errorId).innerHTML = '';
      return true;
    }

    //False
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  };

  // ====================================================== //
  // Validate Account exist
  this.kiemTraTaiKhoanTonTai = function (value, errorId, mess, arr) {
    var exist = false;

    for (var i = 0; i < arr.length; i++) {
      var member = arr[i];
      if (member.account === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      //False
      getEle(errorId).style.display = 'block';
      getEle(errorId).innerHTML = mess;
      return false;
    }

    //True
    getEle(errorId).style.display = 'none';
    getEle(errorId).innerHTML = '';
    return true;
  };

// Validate Salary range
this.kiemTraTienLuong = function (value, errorId, mess) {
  //False
  if (value < 1000000 || value > 20000000) {
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  }

  //True
  getEle(errorId).style.display = 'none';
  getEle(errorId).innerHTML = '';
  return true;
};

// Validate HoursWorked range
this.kiemTraGioLamViec = function (value, errorId, mess) {
  //False
  if (value < 80 || value > 200) {
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  }

  //True
  getEle(errorId).style.display = 'none';
  getEle(errorId).innerHTML = '';
  return true;
};

// Validate Password range
this.kiemTraPassword = function (value, errorId, mess) {
  //False
  if (value < 6 || value > 10) {
    getEle(errorId).style.display = 'block';
    getEle(errorId).innerHTML = mess;
    return false;
  }

  //True
  getEle(errorId).style.display = 'none';
  getEle(errorId).innerHTML = '';
  return true;
};
// ====================================================== //
}


