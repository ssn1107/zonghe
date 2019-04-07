require(['config'], function() {
	require(['mui'], function(mui) {
		function init() {
			login();
		}
		//登录;
		function login() {
			var btn = document.querySelector('.sure');
			var inp = document.querySelector('.mui-input-clear').value;
			var pwd = document.querySelector('.mui-input-password').value;
			btn.onclick = function() {
				mui.ajax('/api/login', {
					data: {
						name: inp,
						pwd: pwd
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						console.log(data.msg);
						if(data.code==1){
							location.href='../../page/zsgc.html';
						}
					},
					error: function(xhr, type, errorThrown) {

					}
				});
			}
		}
		init();
	})
})
