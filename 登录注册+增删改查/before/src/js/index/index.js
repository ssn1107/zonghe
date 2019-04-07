require(['config'],function(){
	require(['mui'],function(mui){
		function init(){
			submit()
			
		}
		function submit(){
			var sure=document.querySelector('.sure');
			var cancel=document.querySelector('.cancel');
			cancel.onclick=function(){
				var inp=document.querySelector('.mui-input-clear').value;
				var pwd=document.querySelector('.mui-input-password').value;
				mui.ajax('/api/submit',{
					data:{
						name:inp,
						pwd:pwd
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
					console.log(data.msg)
					if(data.code==1){
						location.href='./page/login.html';
					}
					},
					error:function(xhr,type,errorThrown){
						
					}
				});
			}
			sure.onclick=function(){
				location.href='../../page/login.html';
			}
			
		}
		
		init();
	})
})