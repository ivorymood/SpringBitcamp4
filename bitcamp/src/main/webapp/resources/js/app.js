var app = app || {};
/*var app = (()=>{
	var init = x=>{
		alert('ALERT'+x);
		onCreate(x);
		
		};
	var onCreate = x=> {
    	app.router.onCreate(x);
    	setContentView();
    };
    var setContentView =()=> {
    	$('#wrapper').empty();
    	app.nav.onCreate();
    };
    return {
    		init : init
    };
})(); */  
app = (()=>{
	var init=x=>{
		$.getScript(x+'/resources/js/router.js', ()=>{
			$.extend(new Router(x));
			app.nav.onCreate();
			app.member.onCreate();
		});
	};
	return {
		init: init
	};
})();
		//아래처럼 고칠 수 있음!
/*app = {init: x=>{
			$.getScript(x+'/resources/js/router.js', ()=>{
				alert('yes !!');
				$.extend(new Router(x));
				app.nav.onCreate();
				app.member.onCreate();
			});
		}};*/
app.cookie={
		setCookie: x=>{
			document.cookie = x.key + "=" + x.val
		},
		getCookie: x=>{
			var name = x.key + "=";
			var res = document.cookie.split(';');
			 for(var i=0;i<res.length;i++){
				 var t = res[i];
				while(t.charAt(0)==''){
					t = t.substring(1, t.length);
					if(t.indexOf(name)==0){
						return t.substring(name.length, t.length);
					}
				}
			}
		},
		removeCookie: x=>{
			createCookie(name,"",-1);
		}
};
app.rgx={
		isNumber : x=>{
			return typeof x === 'number' && isFinite(x);
		},
		passwordChecker : x=>{
			var r = /^[0-9a-zA-z]{4,10}$/;
			return r.test(x)?"yes":"no";
			//숫자 , 영문 대ㅗ문자 4자리부터 10자리까지 제한
		},
		adminCheck : x=>{
			var r = /[a-zA-z]{4}$/;
			return r.test(x)?"yes":"no";
		}
	};
app.home = {
		move : x=>{	
		$.getScript(x,()=>{
			$('#li-home').empty();
				$(createATag({id:'nav-home',val:createSpan({id:'',clazz:'glyphicon glyphicon-home',val:'HOME'})}))
		         .appendTo($('#li-home'))
		         .on('click',()=>{
		        	 app.member.onCreate();
		      });
		});
	}
}
app.board =(x=>{
	var $wrapper, context, view, image, $header;
	var onCreate =()=>{
		$wrapper = $('#wrapper');
		context = $.context();
		view = $.javascript() + '/view.js';
		image=$.image();
		setContentView();
	};
	var setContentView =()=>{
		articles(1);
	}
	var boardWrite=x=>{
		alert("글쓰기 누르고 페이지 이동");
		$.getScript(view, ()=>{
			$('#container').html(createForm({
				id: 'form-write',
				clazz: '',
				action: '',
				method: 'post'
			}));
			
			$('#form-write')
			.html(boardWriting({
				id: 'board-writing',
				clazz: 'board-writing'
			}));
			$(createButton({
				type:'button',
				id:'a-submit',
				clazz: ' btn-success',
				val: '전송'
			})).appendTo('#div-btn-group')
			.attr('style','margin-right: 20px')
			.on('click', e=>{
				e.preventDefault();
				//5까지는 .text()
				alert("prev ajax !!");
				$.ajax({
					url: context+"/board/post/article",
					data: JSON.stringify({
						id: $('#input-id').val(),
						title: $('#input-title').val(),
						content: $('#input-content').val()
					}),
					dataType: 'text',
					contentType: 'application/json',
					method: 'POST',
					beforeSubmit: function(){
						alert("로딩화면!");
					},
					success: d=>{
						alert("성공ㅇㅇㅇ");
					
					},
					error: function(x,s,m){alert(m);}
				});
			});
			$(createButton({
				type:'button',
				id: 'a-cancle',
				clazz: ' btn-default',
				val: '취소'
			})).appendTo('#div-btn-group')
			.attr('style','margin-right: 20px')
			.on('click', e=>{
				e.preventDefault();
			});
		     $(createButton({
		    	 type:'button',
                 id : 'a-fileupload',
                 clazz : '',
                 val : '파일추가'
             })).appendTo('#div-btn-group')
             .attr('style','margin-right:20px;')
             .on('click',e=>{
                 e.preventDefault();
                 alert("체크체크체크체크");
                $.magnificPopup.open(
                         {items: {src : $(createForm({
                             id:'form-fileupload',
                             clazz:'form-fileupload',
                             action:context+'/board/file/upload',
                             method: 'post'
                         })).append(
                                 ' <div class="text-center popup">'
                                 +'        <h1>Attach File</h1>'
                                 +'    </div>'
                                 +'    <div class="row">'
                                 +'        <div class="col-sm-6 col-sm-offset-3">'
                                 +'            <div id="imaginary_container">'
                                 +'                <div id="div-fileupload" class="input-group stylish-input-group">'
                                 +'                    <span id="span-file-1"></span><span id="span-file-2"></span>'
                                 +'                </div>'
                                 +'            </div>'
                                 +'        </div>'
                                 +'    </div>'
                         )
                         },type : 'inline'},
	                        	  0);
                $(createInput({id:'',clazz:'form-control display-inline',type:'file'}))
                .attr('style','width:50%;margin:0 auto')
                .attr('placeholder','file')
                .attr('value','선택')
                .appendTo('#div-fileupload')
                ;
                $(createInput({id:'',clazz:'form-control display-inline',type:'submit'}))
                .attr('style','width:50%;margin:0 auto')
                .attr('placeholder','submit')
                .attr('value','전송')
                .appendTo('#span-file-1')
                .on('click',x=>{
                	alert('전송 클릭');
                	$('#form-fileupload').ajaxForm({
						url: context+"/board/file/upload",
						dataType: 'text',
						encType: "multipart/form-data",
						beforeSubmit: function(){
							alert("로딩화면!");
						},
						success: function(data){
							alert("등록완료!"+data.result);
						}
					}).submit();
                
                })
                ;
                $(createInput({id:'',clazz:'form-control display-inline',type:'reset'}))
                .attr('style','width:50%;margin:0 auto')
                .attr('placeholder','reset')
                .attr('value','취소')
                .appendTo('#span-file-2')
                .on('click',x=>{alert('취소 클릭');})
                ;
                }); 
         });
			
	};
	var articles = x=>{
		$.getJSON(context+'/articles/'+x, d=>{
			$.getScript(context+'/resources/js/view.js', ()=>{
				$('#content').empty();
				
				$(createTab({
					id: 'articles', 
					clazz:''
				}))
				.appendTo('#content');
				
				$(createTh({
					list: ['글번호', '제목', '내용', '작성일', '수정/삭제'],
					thClazz:'',
				})).appendTo('#articles');
				$(createTr({
					list: d.list,
					clazz: '',
					jason : {
						list: '',
						clazz: 'flag-'
					}
				}))
				.appendTo('#articles');
				$('.flag-5').html('<a href="#">수정</a>/<a href="#">삭제</a>');
				$('#articles').attr('style', 'width: 80%; margin: 0 auto');
				//이 시스템은 에러X.무조건 성공하는 로직. 문제가 있다면 자바쪽이다. 
				$(createDiv({id: 'nav-page', clazz: ''})).appendTo('#content');
				$(createUL({id: 'ul-page', clazz: 'pagination'})).appendTo('#nav-page');
				var t = '';	
				if(d.page.prevBlock){
					t+='<li>'
					+'	<a href="#" aria-label="Previous" onclick="app.board.articles('+(d.page.pageStart-1)+'); return false;">'
					+'		<span aria-hidden="true">&laquo;</span>'
					+'	</a>'
					+'</li> ';
				}
				for(var i = d.page.pageStart; i<=d.page.pageEnd; i++){
					if(i===d.page.pageNum){
						t+='<li class="active">'
						+'	<a href="#" onclick="app.board.articles('+i+'); return false;">'+i+'</a></li>';
					}else{
						t+='<li class="disabled">'
						+'	<a	href="#" onclick="app.board.articles('+i+'); return false;">'+i+'</a></li>';
					}
				}
				if(d.page.nextBlock){
					t+=  '<li>'
						+'	<a href="#" aria-label="Next" onclick="app.board.articles('+(d.page.pageEnd+1)+'); return false;">'
						+'		<span aria-hidden="true">&raquo;</span>'
						+'	</a>'
						+'</li> ';
				}
				$('#ul-page').html(t);
				
			});
		});
		
	};
	
	return {onCreate: onCreate, articles: articles,
		boardWrite: boardWrite};	//articles<-- 재귀호출. 바깥에서 다시 호출하는 개념이 됨. 
})();

app.member=(()=>{	//이 자체가 클래스이자 인스턴스
	var $wrapper, context, view, image, $header;
	var onCreate =()=>{
		$wrapper = $('#wrapper');
		context = $.context();
		view = $.javascript() + '/view.js';
		image=$.image();
		setContentView();
	};
	var setContentView=()=>{
		$.getScript(view, ()=>{
			$wrapper.empty();
			$wrapper.html($(createDiv({id:'container',clazz: 'login-container'})));
		/*	$(createDiv('container', 'login-container'))
			.appendTo($wrapper);*/
			
			$(createDiv({id:'content', clazz:'login-content'}))
			.appendTo('#container');
			
			$(loginOutbox('loginOutbox'))
			.appendTo('#content');
			$(loginInbox('loginInbox'))
			.appendTo('#inbox');
			
			$(createATag({
				id: 'a-admin',
				val: '관리자'})).appendTo('#content')
			.on('click', x=>{
				admin(x);
			});
			$(createATag({
				id: 'a-join',
				val: '회원가입'})).appendTo('#content')
				.on('click', e=>{
					join(e);
				});
			
			$(createButton({type:'button',id:'login-btn',clazz:'default',val:'LOGIN'}))
			.appendTo('#td-login-btn')
			.on('click',e=>{
				login(e);
			});
		});
	};
	var join=x=>{
		$('#content').html($(joinTab({id: 'tab-join'})));
		if(app.rgx.passwordChecker($('#input-join-pass').val())){
			$.ajax({
				
			});
		}else{
			alert("다시 입력해주세요");
			$('#input-pass').val().focus();
		}
	}
	var admin=x=>{
		if(confirm('관리자가 맞습니까?')){
		    var adminId = prompt('직원id를 입력하세요');
		    if(app.rgx.adminCheck(adminId)==='yes'){
		    	var pass = prompt('비번을 입력하세요');
                $.ajax({
                    url: context+'/admin/login',
                    method: 'POST',
                    data: JSON.stringify({
	                  	type: "admin",  
	                    id: adminId,
	                  	pass: pass
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: x=>{
                  	  if(x.success==1){
                  		  var adminId = x.admin.adminId;
                  		  var adminPass= x.admin.adminPass;
                  		  $('#container').html($(adminTab({id:'admin-Tab'})));
                  	  }else{
                  		  alert('없는 아이디');
                  	  }
                    },
                    error: x=>{
                  	  alert("admin확인에서 에러발생");
                    }
                });  
               
              }else{
                  alert('정규식에 맞지 않습니다.다시입력');
                  $('#input-pass').val().focus;
              }
		}else{
			alert('관리자만 접근가능');
		}
	}
	var login=x=>{
		x.preventDefault();	//이거 안걸면 원래했던대로 작동해버림.
		var jason={
				id: $('#input-id').val(),
				pass : $('#input-pass').val(),
				type: 'member'
		};
		
		alert('로그인ㅂ ㅓ튼 클릭');
	
		$.ajax({
			url: context+'/member/login',
			method: 'POST',
			data: JSON.stringify(jason),
			dataType: 'json',
			contentType: 'application/json',
			success: x=>{
				alert('로그인 성공 x='+x.success);
				if(x.success==1){
					mypage(x);
				}else{
					alert('로그인 성공X');
				}
			},
			error: (x,h,m)=>{
				alert('로그인에서 에러발생 x= '+x+' ,h= '+h+' ,m= '+m);
			}
		});
	};
	var  mypage=x=>{
		$.getScript(view, x=>{
			/*var id = x.id;
			var pass=x.pass;*/ //여러번 써먹으려면 할당. 아니면 X
			$wrapper.empty();
		
			$wrapper
			.append($(createTab({id:'mypage_tab',clazz:'table table-bordered'})));
		
			$(createTr({list: x.user}))
			.appendTo($('#mypage_tab'));
			
			$('#mypage_tab>tr')
			.attr('style','border: 1px solid #ddd;');
			$('#mypage_tab>td')
			.attr('style','border: 1px solid #ddd;');
			//dkfjksdf
			/*$('#td_1_1')
			.attr("colspan",2)
			.attr("rowspan",2);
			
			$('#td_1_2').remove();
			$('#td_1_3').html(createLabel({id:'',val:'ID'}));
			$('#td_1_4').html(x.id);
			$('#td_2_1').remove();
			$('#td_2_2').remove();*/
			
			
			
			$(createButton({type:'button',id:'btn-logout',clazz:'default',val:'로그아웃'})).appendTo($wrapper);
			$(createButton({type:'button',id:'btn-change-pass',clazz:'default',val:'비밀번호 변경'})).appendTo($wrapper);
			$(createButton({type:'button',id:'btn-leave-mypage',clazz:'default',val:'회원탈퇴'})).appendTo($wrapper);
			$(createButton({type:'button',id:'btn-change-mypage',clazz:'default',val:'정보수정'})).appendTo($wrapper);
			
			
			
			
			$(function(){
				$('#td-phone').html(
					('${tx.phoneNum}') ? '${tx.phoneNum}' :'<a id="a-open-phone" href="#">개통하기</a>'
				);
				$('#btn-mypage-change').on('click', function(){
					alert('마이페이지 확인');		
				});
				$('#a-open-phone').on('click', function(){
					location.href="${path.ctx}/open";
				});
			});
			
		});
	
	
	};
	return {onCreate : onCreate};
	
})();

app.nav =(()=>{
	var $wrapper, context, view, $header;
	var onCreate =()=>{
		$wrapper = $('#wrapper');
		$header = $('#header');
		context = $.context();
		view = $.javascript() + '/view.js';
		image=$.image();
		setContentView();
	};
	var setContentView =()=>{
		$header.empty();
		$wrapper.empty();
		$.getScript(view, ()=>{//자기가 속한게 다 끝나야 호출된다. 
			$header.append(navigation(image));	
			$(createATag({id: 'a-board', val: createSpan({
											id: 'span-board',
											clazz: 'glyphicon glyphicon-map-marker',
											val: '게시판'
											})
			}))
			.appendTo($('#li-board'))
			//.attr('aria-hidden','true')
			.on('click', ()=>{
				
				alert("board 누름");
				app.board.onCreate();
				$('#span-board').text('글쓰기');
				$('#span-board').on('click', e=>{
					e.preventDefault();
					alert("글쓰기 누름");
					app.board.boardWrite();
				});
			});
			
			
			$('#a-join')
			.html(createSpan({id: 'join',clazz: 'glyphicon glyphicon-user',val: 'JOIN'}));
			
			//append는 오버로딩! html은 오버라이딩
			
			$(createATag({id:'a-login', val:createSpan({clazz: 'glyphicon glyphicon-user', val: '로그인'})}))//셀렉터로 메소드를 던지는 것 = 람다
			.appendTo('#li-login')
			.click(()=>{
				alert('login button click');
			});
			
			$(createButtonNav1st())	
			.appendTo($('#div-nav-1st'))
			.click(()=>{
				alert('버튼 클릭');
			});
			$(createATag({id:'a-seq', val:'sequence'}))
			.appendTo($('#li-seq'))
			.click(()=>{
				app.seq.onCreate();
			});
			$(createATag({id:'a-math', val:'math'}))
			.appendTo($('#li-math'))
			.click(()=>{
				app.math.onCreate();
			});
			$(createATag({id:'a-mtx', val: 'matrix'}))
			.appendTo($('#li-mtx'))
			.click(()=>{
				app.matrix.onCreate();
			});
			$(createATag({id:'a-sort', val:'sort'}))
			.appendTo($('#li-sort'))
			.click(()=>{
				app.sort.onCreate();
			});
			$(createATag({id: 'a-app', val:'application'}))
			.appendTo($('#li-app'))
			.click(()=>{
				app.application.onCreate();
			});
			
			$(createForm({id: 'form-search', 
						clazz: 'navbar-form navbar-left', 
						method:'get', 
						role:'search'}))
						.appendTo('#li-search-option')
			
			$(createSelectOpiton({
				id:'select-type', 
				name:'user',
				list: {
					'member': '회원',
					'admin': '관리자'
				}
			})).appendTo('#form-search');			
				
			
			$(createDiv({id:'div-search', clazz:'form-group'}))
					.appendTo('#form-search');
			$(createInput({id:'input-search', type:'text', role:'form-control', holder:'Search'}))
			.appendTo('#div-search');
			$(createButton({type: 'submit', id:'btn-search', clazz:'default btn', val:'검색'}))
			.appendTo('#form-search')
			.on('click', x=>{
				x.preventDefault();
				
				$.ajax({
					url: context+'/search/'+$('#select-type').val()+'/'+$('#input-search').val(),
					data:'',
					dataType:'text',
					contentType:'application/json',
					method:'get',
					success: d=>{
						
						result(d);
					},
					error: function(x,s,m){alert(m);}
				});
		
				
			});
			
			//기능은 get방식으로 ㄱㄱ
			
		});
	};
	var result =x=>{
		alert("성공 ㅇㅇ");
		$wrapper.html($(createTab({id: 'tab-result', clazz: ''})));
		$createTr({list: x.result, clazz:'' })
		.appendTo($('#tab-result'));
	}
	return {
		onCreate: onCreate
	};
})();
app.seq =(()=>{
	var $wrapper, view, algo;
	var onCreate=()=>{
		$wrapper = $('#wrapper');
		algo = $.javascript() + "/algo.js";
		view = $.javascript() + '/view.js';
		setContentView();
	};
	var setContentView =()=>{
		$wrapper.empty();
		$.getScript(view, ()=>{

			$(createDiv({id:'content',clazz: 'container'}))
			.appendTo($wrapper);
			
			$('#content')
			.css({'margin-top': '50px',
				  'width': '80%',
			  	  'margin':'0 auto',
				  'border': '1px solid black'});
			//addclass
			$(createQaTab('tab-seq'))
			.appendTo($('#content'));
			
			var $question = $('#question');
			var $answer = $('#answer');
			$(createUL({id:'ul-seq',clazz: 'list-group'})).appendTo($question);
			$(createLI({id:'li-arith',clazz: 'list-group-item'})).appendTo($('#ul-seq'));
			$(createLI({id:'li-switch',clazz:'list-group-item'})).appendTo($('#ul-seq'));
			$(createLI({id:'li-geo',clazz:'list-group-item'})).appendTo($('#ul-seq'));
			$(createLI({id:'li-fibo',clazz:'list-group-item'})).appendTo($('#ul-seq'));
			$(createLI({id:'li-fact',clazz:'list-group-item'})).appendTo($('#ul-seq'));
			
			$(createATag({val:'등차수열 합'}))
			.appendTo($('#li-arith'))
			.on('click', ()=>{
				$answer.empty();

				$(createInput({id: 'input-first-val',clazz: 'form-control', type: 'text'}))
				.attr('placeholder','초기값 입력')
				.appendTo($answer);
				
				$(createInput({id: 'input-limit-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','리밋값 입력')
				.appendTo($answer);
				
				$(createInput({id: 'input-diff-val',clazz: 'form-control', type: 'text'}))
				.attr('placeholder', '공차 입력')
				.appendTo($answer);
				
				$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
				.appendTo($answer)
				.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
				.on('click', ()=>{
						var x = $('#input-first-val').val();
						var y = $('#input-limit-val').val();
						var z = $('#input-diff-val').val();
						$.getScript(algo, ()=>{
						
							$(createHTag({num:2,id:'result'}))
							.text(arith(x,y,z))
							.appendTo($answer);
						
					});
						
				});
			});
			
			$(createATag({val:'스위치 수열 합'}))
			.appendTo('#li-switch')
			.on('click', ()=>{
				$answer.empty();

				$(createInput({id: 'input-first-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','초기값 입력(양수)')
				.appendTo($answer);
				
				$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','리밋값 입력')
				.appendTo($answer);
				
				$(createInput({id:'input-diff-val',clazz: 'form-control', type: 'text'}))
				.attr('placeholder', '공차 입력')
				.appendTo($answer);
				
				$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
				.appendTo($answer)
				.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
				.on('click', ()=>{
						var x = $('#input-first-val').val();
						var y = $('#input-limit-val').val();
						var z = $('#input-diff-val').val();
						$.getScript(algo, ()=>{
						
							$(createHTag({num:2,id:'result'}))
							.text(swc(x,y,z))
							.appendTo($answer);
						
					});
				});
			});
			$(createATag({val:'등비 수열 합'}))
			.appendTo('#li-geo')
			.on('click', ()=>{
				$answer.empty();

				$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','초기값 입력')
				.appendTo($answer);
				
				$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','리밋값 입력')
				.appendTo($answer);
				
				$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
				.attr('placeholder', '공차 입력')
				.appendTo($answer);
				
				$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
				.appendTo($answer)
				.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
				.on('click', ()=>{
						var x = $('#input-first-val').val();
						var y = $('#input-limit-val').val();
						var z = $('#input-diff-val').val();
						$.getScript(algo, ()=>{
						
							$(createHTag({num:2,id:'result'}))
							.text(geo(x,y,z))
							.appendTo($answer);
						
					});
				});		
			});
			$(createATag({val:'피보나치 수열 합'}))
			.appendTo('#li-fibo')
			.on('click', ()=>{
				$answer.empty();

				$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','초기값 입력')
				.appendTo($answer);
				
				$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','리밋값 입력')
				.appendTo($answer);
				
				$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
				.appendTo($answer)
				.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
				.on('click', ()=>{
						var x = $('#input-first-val').val();
						var y = $('#input-limit-val').val();
						if(x!=='' && x>0 && y!=='' && y>0 ){
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text(fibo(x,y))
								.appendTo($answer);
							});
						}else{
							alert("값을 다시 입력하세요");
						}
					
				});		
			});
			$(createATag({val:'팩토리얼 수열 합'}))
			.appendTo('#li-fact')
			.on('click', ()=>{
				$answer.empty();

				$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','초기값 입력')
				.appendTo($answer);
				
				$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
				.attr('placeholder','리밋값 입력')
				.appendTo($answer);
				
				$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
				.appendTo($answer)
				.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
				.on('click', ()=>{
						var x = $('#input-first-val').val();
						var y = $('#input-limit-val').val();
						if(x!=='' && x>0 && y!='' && y>0){
							$.getScript(algo, ()=>{
								$(createHTag({num:2,id:'result'}))
								.text(facto(x,y))
								.appendTo($answer);
						});
						}else{
							alert("값을 다시 입력하세요");
						}
				});		
			});

		});	
	};
	return {onCreate: onCreate};
})();
app.matrix =(()=>{
	var $wrapper, view, algo;
	var onCreate=()=>{
		$wrapper=$('#wrapper');
		algo=$.javascript() + "/algo.js";
		view=$.javascript() + "/view.js";
		setContentView();
	}
	var setContentView=()=>{
		$wrapper.empty();
		$.getScript(view, ()=>{

			$(createDiv({id:'content', clazz:'container'}))
			.appendTo($wrapper);
			
			$('#content')
			.css({'margin-top': '50px',
				  'width': '80%',
			  	  'margin':'0 auto',
				  'border': '1px solid black'});
			//addclass
			$(createQaTab('tab-matrix'))
			.appendTo($('#content'));
			
			var $question = $('#question');
			var $answer = $('#answer');
			$question.html(
					createQuestionTab({id: 'matrix-question', clazz: 'table table-bordered',
						jason: matrixTitle()})
			);
			$('#tr0')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$answer.html(
							createTabList({id: 'test', clazz: 'tab-algo-fiveByFive',
								jason: fiveByFive(), txt: 'Basic'})
					);
				});
			});
		});
	}
	return {onCreate: onCreate};
})();
app.math =(()=>{
	var $wrapper, view, algo;
	var onCreate=()=>{
		$wrapper=$('#wrapper');
		algo=$.javascript() + "/algo.js";
		view=$.javascript() + "/view.js";
		setContentView();
	}
	var setContentView=()=>{
		$wrapper.empty();
		$.getScript(view, ()=>{

			$(createDiv({id:'content',clazz: 'container'}))
			.appendTo($wrapper);
			
			$('#content')
			.css({'margin-top': '50px',
				  'width': '80%',
			  	  'margin':'0 auto',
				  'border': '1px solid black'});
			//addclass
			$(createQaTab('tab-math'))
			.appendTo($('#content'));
			
			var $question = $('#question');
			var $answer = $('#answer');
			$question.html(
					createQuestionTab({id: 'math-question', clazz: 'table table-bordered',
						jason: mathTitle()})
			);
			$('#tr0')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','math초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
				
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							if(x!=='' && x>0 && y!=='' && y>0){
								$.getScript(algo, ()=>{
									$(createHTag({num:2,id:'result'}))
									.text(prime(x,y))
									.appendTo($answer);
							});
							}else{
								alert("수를 다시 입력하세요");
							}
					});		
				});
			});
			$('#tr1')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','첫번째 수 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','두번째 수 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							if(x!=='' && x>0 && y!=='' && y>0){
								$.getScript(algo, ()=>{
									$(createHTag({num:2,id:'result'}))
									.text(gcdLcm(x,y))
									.appendTo($answer);
								});
							}else{
								alert("수를 다시 입력하세요");
							}	
					});		
				});
			});
			$('#tr2')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder','소인수분해할 수 입력')
					.appendTo($answer);

					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							if(x!=='' && x>0){
								$.getScript(algo, ()=>{
									$(createHTag({num:2,id:'result'}))
									.text(factorization(x))
									.appendTo($answer);
								});
							}else{
								alert("수를 다시 입력하세요");
							}	
					});		
				});
			});
			$('#tr3')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					
					for(var i=0; i<5; i++){
						$(createInput({id:'input-'+i+'-val',clazz:'form-control', type: 'text'}))
						.attr('placeholder',i+1+'번째 숫자 입력')
						.appendTo($answer);
					}
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var arr = new Array();
							var str = "";
							for(var i=0; i<5; i++){
								arr[i] = $('#input-'+i+'-val').val();
								str += (i==5) ? "arr["+i+"]!=='' " : "arr["+i+"]!=='' && ";
							}
							if(str){
								$.getScript(algo, ()=>{
									$(createHTag({num:2,id:'result'}))
									.text(maxMin(arr))
									.appendTo($answer);
								});
							}else{
								alert('수를 다시 입력하세요');
							}
					});		
				});
			});
			$('#tr4')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','첫번째 숫자 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','마지막 숫자 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '몇의 배수?')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0){
								$.getScript(algo, ()=>{
									$(createHTag({num:2,id:'result'}))
									.text(multiple(x,y,z))
									.appendTo($answer);
								});
							}else{
								alert("수를 다시 입력하세요");
							}
					});		
				});
			});
			$('#tr5')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					for(var i=0; i<5; i++){
						$(createInput({id:'input-'+i+'-val',clazz:'form-control', type: 'text'}))
						.attr('placeholder',i+1+'번째 숫자 입력')
						.appendTo($answer);
					}
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '몇에 가장 가까운 수?')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
						var arr = new Array();
						var str = "";
						for(var i=0; i<5; i++){
							arr[i] = $('#input-'+i+'-val').val();
							str += "arr["+i+"]!=='' && ";
						}
						var z = $('#input-diff-val').val();
						str+= "z!==''";
						if(str){
							$.getScript(algo, ()=>{
								$(createHTag({num:2,id:'result'}))
								.text(closest(arr, z))
								.appendTo($answer);
							});
						}else{
							alert("수를 다시 입력하세요");
						}
					});		
				});
			});
		});
	}
	return {onCreate: onCreate};
})();
app.sort =(()=>{
	var $wrapper, view, algo;
	var onCreate=()=>{
		$wrapper=$('#wrapper');
		algo=$.javascript() + "/algo.js";
		view=$.javascript() + "/view.js";
		setContentView();
	}
	var setContentView=()=>{
		$wrapper.empty();
		$.getScript(view, ()=>{

			$(createDiv({id:'content',clazz: 'container'}))
			.appendTo($wrapper);
			
			$('#content')
			.css({'margin-top': '50px',
				  'width': '80%',
			  	  'margin':'0 auto',
				  'border': '1px solid black'});
			//addclass
			$(createQaTab('tab-sort'))
			.appendTo($('#content'));
			
			var $question = $('#question');
			var $answer = $('#answer');
			$question.html(
					createQuestionTab({id: 'sort-question', clazz: 'table table-bordered', jason:sortTitle()})
			);
			$('#tr0')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					var arr = new Array();
					
					for(var i=0; i<5; i++){
						$(createInput({id:'input-'+i+'-val',clazz:'form-control', type: 'text'}))
						.attr('placeholder',i+1+'번째 숫자 입력')
						.appendTo($answer);
					}
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
						var arr = new Array();
						var str = "";
						for(var i=0; i<5; i++){
							arr[i] = $('#input-'+i+'-val').val();
							str += (i==5) ? "arr["+i+"]!=='' " : "arr["+i+"]!=='' && ";
						}
						if(str){
							$.getScript(algo, ()=>{
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							});
						}else{
							
						}
					});		
				});
			});
			$('#tr1')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','sort초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
			$('#tr2')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','sort초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val',clazz: 'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
			$('#tr3')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','sort초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val',clazz: 'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
		});
	}
	return {onCreate: onCreate};
})();
app.application =(()=>{
	var $wrapper, view, algo;
	var onCreate=()=>{
		$wrapper=$('#wrapper');
		algo=$.javascript() + "/algo.js";
		view=$.javascript() + "/view.js";
		setContentView();
	}
	var setContentView=()=>{
		$wrapper.empty();
		$.getScript(view, ()=>{
			
			$(createDiv({id:'content',clazz: 'container'}))
			.appendTo($wrapper);
			
			$('#content')
			.css({'margin-top': '50px',
				  'width': '80%',
			  	  'margin':'0 auto',
				  'border': '1px solid black'});
			//addclass
			$(createQaTab('tab-application'))
			.appendTo($('#content'));
			
			var $question = $('#question');
			var $answer = $('#answer');
			$question.html(
					
					
					createQuestionTab({id: 'application-question', clazz: 'table table-bordered', jason: applicationTitle()})
			);
			$('#tr0')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','app초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
			$('#tr1')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','app초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
			$('#tr2')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','app초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
							
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
			$('#tr3')
			.on('click',()=>{
				$answer.empty();
				$.getScript(algo, ()=>{
					$(createInput({id:'input-first-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','app초기값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-limit-val',clazz:'form-control', type: 'text'}))
					.attr('placeholder','리밋값 입력')
					.appendTo($answer);
					
					$(createInput({id:'input-diff-val', clazz:'form-control', type: 'text'}))
					.attr('placeholder', '공차 입력')
					.appendTo($answer);
					
					$(createButton({type:'button',id:'btn-result',clazz:'primary',val:'결과보기'}))
					.appendTo($answer)
					.attr('style','margin-top: 10px; margin-left: 100px; width: 200px;')
					.on('click', ()=>{
							var x = $('#input-first-val').val();
							var y = $('#input-limit-val').val();
							var z = $('#input-diff-val').val();
							$.getScript(algo, ()=>{
								$(createHTag({num:2,id:'result'}))
								.text()
								.appendTo($answer);
							
						});
					});		
				});
			});
		});
	}
	return {onCreate: onCreate};
})();

