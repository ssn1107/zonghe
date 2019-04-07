require(['config'],function(){
	require(['mui'],function(mui){
		function init(){
			inpval();
		}
		function inpval(){
			var ok=document.querySelector('.ok');
			var cancel=document.querySelector('.cancel');
			var inp=document.querySelectorAll('.mui-input-group input');
			var id=window.localStorage.getItem('id');
			ok.onclick=function(){
				mui.ajax('/api/update',{
					data:{
						name:inp[0].value||inp[0].placeholder,
						pwd:inp[1].value||inp[1].placeholder,
						sex:inp[2].value||inp[2].placeholder,
						address:inp[3].value||inp[3].placeholder,
						status:inp[4].value||inp[4].placeholder,
						id:id
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						
					},
					error:function(xhr,type,errorThrown){
						
					}
				});
			}
			cancel.onclick=function(){
				location.href='../../page/zsgc.html';
			}
		}
		init();
	})
})