$(document).ready(function(){
	$('.home .search-box .btn-group .btn').click(function(event){
		$('input[name=term]').val(event.target.innerText.toLowerCase());
		$('.search-box').submit();
	});	
	$(".search .options-col input[type=checkbox]").change(function() {
	    if(this.checked) {
	        if($(".search .options-col input[type=checkbox]:checked").length == 1)
	        	$('.course-card').fadeOut("slow");
	        var option = $(this).attr('name');
	        $('.'+option.replace(' ', '-')).fadeIn("slow");
	    }else{
	        if($(".search .options-col input[type=checkbox]:checked").length == 0){
	        	$('.course-card').fadeIn("slow");
	        }else{
		        var option = $(this).attr('name');
		        $('.'+option.replace(' ', '-')).fadeOut("slow");
	        }	    	
	    }
	});	
});
