require(['config'], function() {
	require(['mui'], function(mui) {
		function init() {
			render();
			remove();
			update();
			search();
		}

		function render() {
			mui.ajax('/api/render', {
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					var str = '';
					data.data.forEach(function(item) {
						str +=
							`<li>
					<span class="name">${item.name}</span>
					<span class="pwd">${item.pwd}</span>
					<span class="sex">${item.sex}</span>
					<span class="address">${item.address}</span>
					<span class="status">${item.status}</span>
					<button class="add" data-id="${item._id}">更新</button>
					<button class="remove" data-id="${item._id}">删除</button>
				</li>`
					})
					uls.innerHTML = str;
				},
				error: function(xhr, type, errorThrown) {

				}
			});
		}
		//删除;
		function remove() {
			var uls = document.querySelector('#uls');
			mui(uls).on('click', '.remove', function() {
				console.log(this);
				var _this = this;
				mui.ajax('/api/remove', {
					data: {
						id: this.getAttribute('data-id')
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						mui.confirm('确定删除吗?', function(e) {
							if (e.index) uls.removeChild(_this.parentNode.parentNode);
						}, 'div')
					},
					error: function(xhr, type, errorThrown) {

					}
				});
			})
		}
		function update(){
			var uls = document.querySelector('#uls');
			mui(uls).on('click','.add',function(){
				var id=this.getAttribute('data-id');
				window.localStorage.setItem('id',id);
				location.href='../page/detail.html';
			})
		}
		function search(){
			var btn=document.querySelector('#btn');
			btn.onclick=function(){
				var inpcal=document.querySelector('#inpsearch').value;
				mui.ajax('/api/search',{
					data:{
						name:inpcal
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						var str='';
						data.data.forEach(function(item){
							str+=`<li>
						<span>${item.name}</span>
						<span>${item.pwd}</span>
						<span>${item.sex}</span>
						<span>${item.address}</span>
						<span>${item.status}</span>
						<button>增加</button>
						<button>删除</button>
					</li>`
						})
						uls.innerHTML=str;
					},
					error:function(xhr,type,errorThrown){
						
					}
				});
			}
		
		}
		init();
	})
})
