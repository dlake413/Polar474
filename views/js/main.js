$(document).ready(function(){
    $('.tab_button').click(function(){
	$('.tab_form').each(function(){
	    $(this).removeClass('active_tab');
	});
	var id = $(this).prop('id').split('_')[1];
	$('#tabcontent_'+id).addClass('active_tab');
    })
})
