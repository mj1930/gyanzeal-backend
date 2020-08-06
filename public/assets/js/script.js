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
    
});
