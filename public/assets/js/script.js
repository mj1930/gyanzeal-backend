// Preloader
window.onload = function(){
    document.querySelector('.dom-loader').style.display = 'none';
};

// Swap Text
var textSwapper = ['Learners', 'Scholars', 'Beginners', 'Trainee', 'Students'];
var count = 1;

setInterval( function(){
    $('.swap').fadeOut(function(){
        $(this).text(textSwapper[count]).fadeIn();
    });
    count++;
    if(count == textSwapper.length){
        count = 0;
    }
}, 1800 );
// Drop Down Submenu
$('.dropdown-menu').on('click', function(){
    e.stopPropagation();

    // if ($(window).width() < 992) {
    //     $('.dropdown-menu a').on('click', function(){
    //         e.preventDefault();
    //         if($(this).next('.submenu').length){
    //             $(this).next('.submenu').toggle();
    //         }

    //         // $('.dropdown').on('hide.bs.dropdown', function () {
    //         //     $(this).find('.submenu').hide();
    //         // });
    //     });
    // }
});


$(document).ready(function(){

    // Teacher Signup Select Subject And Courses
    var classSelected = 0;
    var subjectSelected = 0;
    var teacherSubjectList = [];
    $('#teacher-select-class-scholastic').on('change', function(){
        classSelected = $(this).val();
    });

    $('#teacher-select-subject-scholastic').on('change', function(){
        subjectSelected = $(this).val();
    });

    $('.add-subject-to-list').on('click', function(e){
        e.preventDefault();
        console.log(subjectSelected);
        $.each(subjectSelected, function(index,value){
            teacherSubjectList.push(value + ' (' + classSelected + ')  &nbsp;&nbsp;&nbsp;<i class="fas fa-times"></i>');
        });

        $.each(teacherSubjectList, function(index,value){
            let btnn = '<button class="btn btn-sm text-dark align-middle bg-white rounded py-1 px-2 font-large subject-name-list crossbox" style="font-size: 0.8em;">'+ value +'</button>';
            $('.no-subject').hide();
            $('.teacher-subject-list').append(btnn);
        });
        subjectSelected = 0;
        teacherSubjectList = [];
        $('.teacher-subject-list').append('<script>$(".crossbox").on("click",function(e){e.preventDefault(),$(this).remove(),0==$(".crossbox").length&&$(".no-subject").show()});</script>');
    });

    // Teacher Signup Select GZ Special Courses
    var classSelectedGZ = 0;
    var subjectSelectedGZ = 0;
    var teacherSubjectListGZ = [];
    $('#gz-special-course-name').on('change', function(){
        classSelectedGZ = $(this).val();
    });

    $('#gz-subject-name').on('change', function(){
        subjectSelectedGZ = $(this).val();
    });

    $('.add-course-to-list').on('click', function(e){
        e.preventDefault();
        console.log(subjectSelectedGZ);
        $.each(subjectSelectedGZ, function(index,value){
            teacherSubjectListGZ.push(value + ' (' + classSelectedGZ + ')  &nbsp;&nbsp;&nbsp;<i class="fas fa-times"></i>');
        });

        $.each(teacherSubjectListGZ, function(index,value){
            let btnn = '<button class="btn btn-sm text-dark align-middle bg-white rounded py-1 px-2 font-large course-name-list crossbox" style="font-size: 0.8em;">'+ value +'</button>';
            $('.no-subject').hide();
            $('.teacher-subject-list').append(btnn);
        });
        subjectSelectedGZ = 0;
        teacherSubjectListGZ = [];
        
        $('.teacher-subject-list').append('<script>$(".crossbox").on("click",function(e){e.preventDefault(),$(this).remove(),0==$(".crossbox").length&&$(".no-subject").show()});</script>');

    });


    // Call Back Request Page Starts

    $('.userRequestType').on('change', function(){
        let selected = $(this).val();
        if(selected == 2){
            $('.batch-request').removeClass('d-none');
        }else{
            $('.batch-request').addClass('d-none');
        }
    });

    $('.batchCourseType').on('change', function(){
        let selected = $(this).val();
        if(selected == 1){
            $('.academicRequest').removeClass('d-none');
            $('.GZRequest').addClass('d-none');
        }else{
            $('.GZRequest').removeClass('d-none');
            $('.academicRequest').addClass('d-none');
        }
    });

    $('.GZCourse').on('change', function(){
        let selected = $(this).val();
        if(selected == 00){
            $('.RequestedCourse').removeClass('d-none');
        }else{
            $('.RequestedCourse').addClass('d-none');
        }
    });

    $('.checkallreport').on('change', function(){
        if($(this).is(':checked')){
            $('.checkreport').attr('checked', true);
        }else{
            $('.checkreport').attr('checked', false);
        }
    });

    // Callback Request Page Ends

    // Admin Add Money To Wallet Start
    $('.selectStudent').on('click', function(){
        $('.studentIDforWallet').removeClass('d-none');
        $('.close').click();
    });
    // Admin Add Money To Wallet Ends





    // Admin Create Batch Start
    $('.selectTeacher').on('click', function(){
        $('.close').click();
        $('.BatchTeacherDetail').removeClass('d-none');
    });

    $('.batch-curriculum-type').on('change', function(){
       let selected = $(this).val();
       if(selected == 2){
            $('.new_curriculum').removeClass('d-none');
            $('.default_curriculum').addClass('d-none');
            $('.update_curriculum').addClass('d-none');
       }else if(selected == 3){
            $('.new_curriculum').addClass('d-none');
            $('.default_curriculum').addClass('d-none');
            $('.update_curriculum').removeClass('d-none');
       }else{
            $('.default_curriculum').removeClass('d-none');
            $('.new_curriculum').addClass('d-none');
            $('.update_curriculum').addClass('d-none');
       }
    });
    // Admin Create Batch Ends

    $('.left-btn').on('click', function(){
        $('.left-btn').removeClass('primary-color-dark text-white');
        $('.left-btn').addClass('bg-white');
        $(this).addClass('primary-color-dark text-white');
        $(this).removeClass('bg-white');

        var id = $(this).attr('id');
        if(!$('.default-view').hasClass('d-none')){
            $('.default-view').addClass('d-none');
        }

        $('.right-element').addClass('d-none');
        $('.' + id).removeClass('d-none');
    });


    $('.enroll-new-course').on('click', function(){
        $('#ec').click();
    });

    $('#prog').on('click', function(){
        $('.schedule').addClass('d-none');
        $('.progess').removeClass('d-none');
    })

    $('#sch').on('click', function(){
        $('.progess').addClass('d-none');
        $('.schedule').removeClass('d-none');
    })


    var table = $('#purchase-table').DataTable({
        responsive: true
    });

    var table = $('#cart-table').DataTable({
        responsive: true,
        searching: false, 
        paging: false, 
        info: false
    });

    var table = $('#teacher-details-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var table = $('#class-subject-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var table = $('#student-details-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var table = $('#student-gz-details').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var table = $('#teacher-gz-details-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });


    var table = $('#subject-only-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var studentTable = $('#student-search-table').DataTable({
        responsive: true,
        searching: false, 
        paging: true, 
        info: true
    });

    var TeacherSerach = $('#teacher-search-table-for-batch').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });
    
    var bdtable = $('#academics-batch-details-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    var gzbdtable = $('#GZ-batch-details-table').DataTable({
        responsive: true,
        searching: true, 
        paging: true, 
        info: true
    });

    $('#cc').on('change', function(){
        let val = $(this).val();

        if(val == 1){
            $('#school-academics').removeClass('d-none');
            $('#after-school').addClass('d-none');
        }else if(val == 2){
            $('#after-school').removeClass('d-none');
            $('#school-academics').addClass('d-none');
            $('.course-list').addClass('d-none');
        }else{
            $('#after-school').addClass('d-none');
            $('#school-academics').addClass('d-none');
            $('.course-list').addClass('d-none');
        }
    });


    // If Choose Course name changes in afterschool plans
    $('#cn').on('change', function(){
        let val = $(this).val();
        if(val !== 0){
            $('#after-school').removeClass('d-none');
            $('#school-academics').addClass('d-none');
            $('.course-list').removeClass('d-none');
        }
    });

    // If Choose Course name changes in afterschool plans
    $('#classSubject').on('change', function(){
        let val = $(this).val();
        if(val !== 0){
            $('#school-academics').removeClass('d-none');
            $('#after-school').addClass('d-none');
            $('.course-list').removeClass('d-none');
        }
    });


    // Show Headquater (Wallet Page)
    $('#ocity').on('change', function(){
        $('#headquater-list').removeClass('d-none');
    });

    $('#ostate').on('change', function(){
        $('#headquater-list').addClass('d-none');
    });

    // Completed Class Notes HW Progess (By Teacher)
    $('.completed-btn').on('click', function(){
        let id = $(this).attr('id');
        $('.completed-outer').removeClass('d-none');
        $('.boxes').addClass('d-none');
        $('.'+id).removeClass('d-none');
    });



    // Teacher Subject Progress Handler
    // On Decrement
    $('.drec').on('click', function(){
        if($(this).parent().siblings().hasClass('current-value')){
            $this = $(this).parent().next();
        }
        let currentValue = $this.val();
        $this.val(drecrement(currentValue));
    });

    // On Increment
    $('.inc').on('click', function(){
        if($(this).parent().siblings().hasClass('current-value')){
            $this = $(this).parent().prev();
        }
        let currentValue = $this.val();
        $this.val(increment(currentValue));
    });

    function increment(x){
        let current = x.replace(/\%/g, "");
        if(current < 90){
            current = (parseFloat(current) + 10) + '%';
        }else{
            current = '100%';
        }
        
        return current;
    }

    function drecrement(x){
        let current = x.replace(/\%/g, "");
        if(current > 10){
            current = (current - 10) + '%';
        }else{
            current = '0%';
        }
        
        return current;
    }
    



    $('#selectclass, .cn').on('change', function(){
        let val = $(this).val();
        if(val !== 0){
            $('.video-embed, .previous').removeClass('d-none');
        }else{
            $('.video-embed, .previous').addClass('d-none');
        }
    });

    

    $('.course-cc').on('change', function(){
        $('.video-embed, .previous').addClass('d-none');
    });
});
