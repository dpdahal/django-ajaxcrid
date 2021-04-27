$(document).ready(function () {


    function getStudents() {
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:8000/students',
            success: function (response) {
                showData(response.rooms);
            }
        });
    }

    getStudents();

    function showData(students) {
        var outPut = "";

        students.forEach((student, key) => {
            outPut += `<tr>`;
            outPut += `<td>${++key}</td>`;
            outPut += `<td>${student.full_name}</td>`;
            outPut += `<td>${student.email}</td>`;
            outPut += `<td>${student.address}</td>`;
            outPut += `<td><button class="updateData" data-id="${student.id}">Edit</button> <button class="myId" data-id="${student.id}">Delete</button></td>`;
            outPut += `</tr>`;

        })

        $('#dataList').html(outPut)

        $('.myId').each((i, elm) => {
            $(elm).on("click", (e) => {
                deleteStudent($(elm))
            })
        });


        $('.updateData').each((i, element) => {
            $(element).on('click', (e) => {
                updateData(element)
            })
        })

    }


    function deleteStudent(el) {
        roomId = $(el).data('id')
        var send_data = {
            'id': roomId
        }
        $.ajax({
            url: "http://127.0.0.1:8000/delete",
            type: 'post',
            data: send_data,
            success: function (data) {
                getStudents()
            }
        });
    }


    $('#addRecord').click(function (e) {
        e.preventDefault();
        var criteria = $('#criteria').val()
        if (criteria == '') {
            var name = $("#full_name").val()
            var email = $("#email").val()
            var address = $("#address").val()
            var send_data = {name: name, email: email, address: address}
            insertData(send_data)
        } else {
            var name = $("#full_name").val()
            var email = $("#email").val()
            var address = $("#address").val()
            var send_data = {id: criteria, name: name, email: email, address: address}
            updateAction(send_data)
        }


    });


    function insertData(data) {
        $.ajax({
            url: "http://127.0.0.1:8000/insert",
            type: 'post',
            data: data,
            success: function (data) {
                getStudents();
                $('#myForm')[0].reset();
            }
        });
    }

    function updateData(data) {
        var studentId = $(data).data('id');
        $.ajax({
            url: "http://127.0.0.1:8000/get_single_student/" + studentId,
            type: 'get',
            success: function (data) {
                $('#criteria').val(data.id);
                var name = $("#full_name").val(data.full_name);
                var email = $("#email").val(data.email);
                var address = $("#address").val(data.address);
            }
        });

    }

    function updateAction(data) {
        $.ajax({
            url: "http://127.0.0.1:8000/update",
            type: 'post',
            data: data,
            success: function (data) {
                getStudents();
                $('#myForm')[0].reset();
            }
        });
    }


})
