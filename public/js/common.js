$(document).ready(function(){
	$('.home .search-box .btn-group .btn').click(function(event){
		$('input[name=term]').val(event.target.innerText.toLowerCase());
		$('.search-box').submit();
	});	
});