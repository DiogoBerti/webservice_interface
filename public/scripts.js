$(document).ready(function(){
    console.log('READY!');
    $('#port_id').hide();
    $('#check_port_id').prop('checked', false);
});

$("#check_port_id").change(function() {
    if($('#check_port_id').prop('checked')){
    	$('#port_id').show();
    }else{
    	$('#port_id').hide();
    }
});

