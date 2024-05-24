
$("#login").submit(function(event){
    event.preventDefault(); // Ngăn chặn hành động mặc định của form submit

    var formData = $(this).serialize(); // Lấy dữ liệu từ biểu mẫu

    $.ajax({
        url: "http://localhost:3000/api/users/login",
        method: "POST",
        data: formData,
        success: function(response, status, xhr) {
            if (xhr.status === 200) { // Kiểm tra nếu đăng nhập thành công (status 200)
                 //window.location.href = '/'; // Chuyển hướng về trang chủ
            }
        },
        error: function(error, status, xhr ) {      
            var notification = $('#notification');
            notification.removeClass('hidden success').addClass('error'); // Đặt kiểu cho thông báo lỗi
            notification.text(xhr.responseJSON.message || 'Có lỗi xảy ra, vui lòng thử lại.'); // Hiển thị thông báo lỗi
            notification.show(); // Hiển thị thẻ thông báo
        }
    });
});


$("#add_user").submit(function(event){
    event.preventDefault(); // Ngăn chặn hành động mặc định của biểu mẫu

    var formData = $(this).serialize(); // Lấy dữ liệu từ biểu mẫu

    $.ajax({
        url: "/api/users",
        method: "POST",
        data: formData,
        success: function(response, status, xhr) {
            if (xhr.status === 201) {
                alert(response.message); // Hiển thị thông báo từ server khi người dùng được tạo thành công
                $("#add_user")[0].reset();
            }
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi nếu có
            var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
            alert(errorMessage);
        }
    });
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray()
    
    var data= {}

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })

    $.ajax({
        url: `http://localhost:3000/api/users/${data.id}`,
        method: "PUT",
        data: data,
        success: function(response, status, xhr) {
            if (xhr.status === 201) {
                alert(response.message); // Hiển thị thông báo từ server khi người dùng được tạo thành công
               
            }
        },
        error: function(xhr, status, error) {
            // Xử lý lỗi nếu có
            var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
            alert(errorMessage);
        }
    });
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE",
        }
    
        if(confirm("Do you really want to delete?")){
            $.ajax(request).done(function(response){
                alert("Delete user successfully!")
                location.reload();
            }) 
        }
    })

   
}
   