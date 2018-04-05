/**
 * 
 */
var loginOutbox=x=>{
	
	return '<table id="'+x+'">'
	+'	<tr id="first_child">'
	+'		<td id="inbox">'
	+'		</td>'
	+'	</tr>'
	+'</table>';
}
var loginInbox=x=>{
	
	return '			<table id="'+x+'" >'
	+'				<tr>'
	+'				 	<td > '
	+'					 	<input id="input-id" type="text" name="id" placeholder="id"/>'
	+'				 	</td>'
	+'				 	<td id="td-login-btn" rowspan="2">'

	+'					</td>'
	+'				 </tr>'
	+'				 <tr>'
	+'				 	<td >'
	+'				 		<input id="input-pass" type="text" name="pass" placeholder="pass"/>'
	+'				 	</td>'
	+'				</tr>'
	+'			</table>';
	
}
var adminTab=x=>{
	return '<section id="'+x+'">'
	+'<h1 id="title">회원관리</h1>'

	  +'<table id="admin-main-table">'
	    +'<tr>'
	      +'<td >'
	        +'<a id="move_member_btn" style="cursor: pointer;">'
	          +'<img src="${image}/admin_main_member.jpg"'
	            +'id="move_member_btn_img"'
	           +'alt="" />'
	        +'</a>'
	      +'</td>'
	      +'<td >준비중</td>'
	      +'<td >준비중</td>'
	    +'</tr>'
	    +'<tr>'
	      +'<td>준비중</td>'
	      +'<td>준비중</td>'
	      +'<td> 테이블 생성 <br />'
	        +'<form id="admin-crate-table-form" action="${context}/admin.do?cmd=create-table">'
	          +'<select name="table_name" id="table_name">'
	            +'<option value="member">회 원</option>'
	            +'<option value="attend">출 석</option>'
	            +'<option value="mobile">모바일</option>'
	          +'</select>'
	          +'<button id="admin-create-table-btn">생 성</button>'
	        +'</form>'
	      +'</td>'
	    +'</tr>'
	  +'</table>'
	+'</section>';
}
var joinTab =x=>{
	return '<table id="'+x.id+'">'
	+'	<tr>'
	+'		<td>아이디</td>'
	+'		<td>'
	+'			<input id="input-id" name="join_id" '
	+'			 type="text" name="id" /> '
	+'			<button id="btn-id" name="check_id_btn">아이디 중복 확인</button>'
	+'			* 영문소문자로 시작하는 6~12자 영문소문자 또는 숫자 (공백, 특수문자 불가)<br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>이름</td>'
	+'		<td>'
	+'			<input id="input-name" name="join_name" '
	+'			type="text" /> * 반드시 실명을 입력해 주세요.<br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>주민번호</td>'
	+'		<td>'
	+'			<input id="input-first-ssn" name="first_ssn"  type="text"  /> '
	+'			- <input id="input-second-ssn" name="second_ssn"  type="text" style="width: 20px"/> '
	+'			* 생년월일과 앞번호만 입력<br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>이메일</td>'
	+'		<td>'
	+'			<input id="input-first-email" name="first-email"   /> @'
	+'			<select name="select-email" id="email" >'
	+'				<option value="">직접입력</option>'
	+'				<option value="gmail.com">gamil.com</option>'
	+'				<option value="naver.com">naver.com</option>'
	+'				<option value="hanmail.net">hanmail.net</option>'
	+'				<option value="daum.net">daum.net</option>'
	+'			</select>'
	+'				<button>중복 확인</button>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>연락처</td>'
	+'		<td>'
	+'			<select name="phone-agency" id="select-phone-agency">'
	+'				<option value="skt">SKT</option>'
	+'				<option value="kt">KT</option>'
	+'				<option value="lg">LG</option>'
	+'			</select>'
	+'			<select id="select-first-num" name="first-num">'
	+'				<option value="010">010</option>'
	+'				<option value="011">011</option>'
	+'				<option value="02">02</option>'
	+'			</select> '
	+'			- <input id="input-second-num" name="second-num"  type="tel"/> '
	+'			- <input id="input-third-num" name="third-num"  type="tel"/><br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>비밀번호</td>'
	+'		<td>'
	+'			<input id="input-join-pass" name="join-pass" type="text"  /> '
	+'			* 영문소문자, 영문소문자 + 숫자 6~12자 내외 (공백, 특수문자 불가)<br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>비밀번호 확인</td>'
	+'		<td>'
	+'			<input id="input-join-repass" name="repass" type="text"  /> <br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>주소</td>'
	+'		<td>'
	+'			<input id="join_first_addr" name="join_first_addr" type="text" /> '
	+'			<button>주소 검색</button> <br/>'
	+'			<input id="join_second_addr" name="join_second_addr" type="text"/> '
	+'			<input id="join_third_addr" name="join_third_addr" type="text" /> '
	+'			<input id="join_fourth_addr" name="join_forth_addr" type="text"/><br/>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>사진등록</td>'
	+'		<td>'
	+'			<input id="join_file" type="file" name="profile"/> '
	+'			<button>사진 등록</button>'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td>'
	+'			가입일'
	+'		</td>'
	+'		<td>'
	+'			<input type="date" />'
	+'		</td>'
	+'	</tr>'
	+'	<tr>'
	+'		<td colspan="2">'
	+'			<button id="btn-join-confirm" name="join_confirm_btn">확  인</button>'
	+'			<button id="btn-join-cancle" name="join_cancle_btn">취  소</button>'
	+'		</td>'
	+'	</tr>'
	+'</table>';
	
}


function hello(){
	
	return '<h1>Hello!! AJAX </h1>';
}
var boardWriting =x=>{
	return '<div id="'+x.id+'" class="'+x.clazz+'">'
	+'<h1>글쓰기</h1>'
	+'  <div class="form-group">'
	+'    <label for="inputEmail" class="col-sm-2 control-label"> 닉네임</label>'
	+'    <div class="col-sm-10">'
	+'      <input type="text" class="form-control" id="input-id" placeholder="닉네임">'
	+'    </div>'
	+'  </div>'
	+'  <div class="form-group">'
	+'    <label for="inputPassword" class="col-sm-2 control-label">제목</label>'
	+'    <div class="col-sm-10">'
	+'      <input type="text" class="form-control" id="input-title" placeholder="제목">'
	+'    </div>'
	+'  </div>'
	+'  <div class="form-group">'
	+'	  <label for="inputcontent" class="col-sm-2 control-label">내용	</label>'
	+'  	<div class="col-sm-10">'
	+'  		<textarea class="form-control col-sm-2 " id="input-content" rows="5"></textarea>'
	+'  	</div>'
	+'  	<div class="col-sm-10">'
	+'  		<div class="grid-container">'
	+'			<div class="grid-item item1">'
/*	+'  					<img src="${path.img}/${uploadImage}" alt="" />'*/
	+'			</div>'
	+'  		</div>'
	+'  	</div>'
	+'  </div>'
	+'   <div class="form-group">'
	+'  	<div class="col-sm-10">'
	+'  	</div>'
	+'  </div>'
	+'   <div class="div-btn-group">'
	//버튼추가
	+'  	<div id="div-btn-group" class="col-sm-10">'
	+'  	</div>'
	+'  </div>'
	+'</div>';
}
var fileupload=x=>{
	return '<div class="'+x.clazz+'">'
	+'		<h1 class="text-center">ATTACH FILES</h1>'
	+'		<div class="row"></div>'
	+'		<div class="col-sm-4"></div>'
	+'		<div class="col-sm-4">'
	+'			<div id="div-fileupload" class="input-group">'
	+'				<input class="form-control" type="file" placeholder="file" name="file"/>'
//	+'				<input type="submit" value="파일업로드" class="btn btn-primary " />'
//	+'				<input type="reset" value="취소" class="btn btn-default "/>'
	+'			</div>'
	+'		</div>'
	+'</div>';
}
function navigation(x){
	return '<nav class="container">'
	+'	<div class="container-fluid">'
	+'    	<div class="navbar-header"><div id="div-nav-1st">'
	+'          </div><a class="navbar-brand" href="#">'
	+'				<img height="130%" src="'+x+'/Penguins.jpg"  />'
	+'         		 </a>'
	+'          </div>'
	+'        <div id="navbar" class="collapse navbar-collapse">'
	+'        	<ul class="nav navbar-nav">'
	+'	            <li class="active">'
	+'	            <a href="#">'
	+'	            	<span id="home" class="glyphicon glyphicon-grain" aria-hidden="true">&nbsp;HOME</span>'
	+'	            </a></li>'
	+'	            <li id="li-board">'
	+'	            </li>'
	+'	            <li id="li-login">'
	+'              </li>'
	+'              <li>'
	+'	                 <a id="a-join" href="#"> '
	/*+'	                <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;JOIN</span>'*/
	+'	                 </a>'
	+'	            </li>'
	+'		   		<li class=:dropdown>'
	+'		   			<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"'
	+'		   			role = "button" aria-expanded="false">메뉴뉴뉴'
	+'		   			<span class="caret"></span>'
	+'		   			</a>'
	+'		   			<ul class="dropdown-menu" id="ul-algo" role="menu">'
	+'					<li id="li-seq"></li>'
	+'					<li id="li-math"></li>'
	+'					<li id="li-mtx"></li>'
	+'					<li id="li-sort"></li>'
	+'					<li id="li-app"></li>'
	+'		   				<li role="presentation" class="divider"></li>'
	+'		   			</ul>'
	+'		   		</li>'
	
	//검색필터
	+'<li id="li-search-option"></li>'
	
	+'          </ul>'
	+'		</div>'
	+'	</div>'
	+'</nav>';
	
}
function createButtonNav1st(){
	return '<button aid="btn-nav-1st" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">'
	+'<span class="sr-only">Toggle navigation</span>'
	+'<span class="icon-bar"></span>'
	+'<span class="icon-bar"></span>'
	+'<span class="icon-bar"></span>'
	+'</button>';
}
var mypage =x=>{
	return '<article id="'+x+'">'
	+'	<button id="btn-logout">로그아웃</button>'
	+'	<table id="mypage_table">'
	+'		<tr>'
	+'			<td id = "profile" rowspan="6"><img src=""></td>'
	+'			<td class = "column">ID</td>'
	+'			<td class="content"> ${user.id}</td>'
	+'			<td class = "column">SSN</td>'
	+'			<td class="content">${user.ssn }</td>'
	+'		</tr>'
	+'		<tr>'
	+'			<td class = "column">PASS</td>'
	+'			<td class="content">${user.pass }</td>'
	+'			<td class = "column">빈칸</td>'
	+'			<td class="content"></td>'
	+'		</tr>'
	+'		<tr>'
	+'			<td class = "column">NAME</td>'
	+'			<td class="content">${user.name }</td>'
	+'			<td class = "column">EMAIL</td>'
	+'			<td class="content">${user.email }</td>'
	+'		</tr>'
	+'		<tr>'
	+'			<td class = "column">GENDER</td>'
	+'			<td class="content">${user.ssn }</td>'
	+'			<td class = "column">ADDRESS</td>'
	+'			<td class="content">${user.addr }</td>'
	+'		</tr>'
	+'		<tr>'
	+'			<td class = "column">ACCOUNT</td>'
	+'			<td class="content"></td>'
	+'			<td class = "column">MONEY</td>'
	+'			<td class="content"></td>'
	+'		</tr>'
	+'		<tr>'
	+'			<td class = "column">PHONE</td>'
	+'			<td id="td-phone" class="content"></td>'
	+'			<td class = "column">REGDATE</td>'
	+'			<td class="content"></td>'
	+'		</tr>'
	+'	</table>'
	+'	<button id="pass_change_btn">비밀번호 변경</button>'
	+'	<button id="btn-mypage-leave">회원탈퇴</button>'
	+'	<button id="btn-mypage-change">정보수정</button>'
	+'</article>';
}


var createQaTab=x=>{
	return  '<table id="'+x+'" class="table table-bordered">'
    +'            <tr>'
    +'                <td id="question" style="width: 400px;"></td>'
    +'                <td id="answer" style="width: 400px;"></td>'
    +'            </tr>'
    +'        </table>';
}

var createTabList=x=>{
    var tab = '<table id="'+x.id+'" class="'+x.clazz+'">'
    +'<thead><tr>'
    +'<th colspan="5">'+x.txt+'</th>'
    +'</tr></thead>';
    $.each(JSON.parse(x.jason), (i,j)=>{	//forloop같은것. 이때 jason은 리스트
        tab +=
        '<tr>'
        +'<td id="td'+i+'">'+j.a+'</td>'
        +'<td id="td'+i+'">'+j.b+'</td>'
        +'<td id="td'+i+'">'+j.c+'</td>'
        +'<td id="td'+i+'">'+j.d+'</td>'
        +'<td id="td'+i+'">'+j.e+'</td>'
        +'</tr>'
    });
    tab += '</table>';
    return tab;
}
var createTab =x=>{
	return '<table id="'+x.id+'" class="'+x.clazz+'"></table>';
}
var createTh =x=>{
	var temp='<tr>';
	$.each(x.list, (k,val)=>{
	 temp+='<th id="th_'+k+'" class="'+x.thClazz+'">&nbsp;'+val+'</th>';
	});
	temp+='</tr>';
	return temp;
}

var createTr=x=>{
    var temp = '';
    var i=0;
    $.each(x.list, (k,val)=>{
    	i++;
    	temp +='<tr id="tr_'+i+'" class="'+x.clazz+'">'
        			+createTd({
        				list: val, 
        				idx: i, 
        				clazz: x.jason.clazz
        				})+'</tr>';
    });
    return temp;
}
var createTd=x=>{
    var temp = '';
    var j=0;
	$.each(x.list,(k,val)=>{
		j++;
		temp +='<td id="td_'+x.idx+'_'+j+'" class="'+x.clazz+j+'">'
										+'&nbsp;'+val+'</td>';
	});
    return temp;
}
var createSelectOpiton=x=>{
	var temp='<select id="'+x.id+'" name="'+x.name+'">'
	var i=0;
	$.each(x.list, (k,val)=>{
		i++;
		if(i==='1'){
			temp 	+='<option value="'+k+'" selected>'
			+val
			+'</option>';
		}else{
			temp 	+='<option value="'+k+'" >'
			+val
			+'</option>';
		}
	});
	temp+='</select>';
	return temp;
}

var setCountArray=x=>{
	var a = new Array();
	for(var i=1; i<=x; i++){
		a.push(i);
	}
	return a;
}
var createQuestionTab=x=>{
    var tab = '<table id="'+x.id+'" class="'+x.clazz+'">';
    $.each(x.jason, (i,j)=>{	//forloop같은것. 이때 jason은 리스트
        tab +=
        '<tr>'
        +'<td id="tr'+i+'">'+j+'</td>'
        +'</tr>'
    });
    tab += '</table>';
    return tab;
}
var matrixTitle=()=>{
	var x=['기본행렬'];
	return x;
}
var sortTitle=()=>{
	var x=['선택정렬','버블정렬','삽입정렬','석차구하기'];
	return x;
}
var mathTitle=()=>{
	var x=['소수의 합 구하기', '최대공약수', '소인수분해', '최대값, 최소값', 'n의 배수의 개수의 합','n에 가장 가까운 수 구하기'];
	return x;
}
var applicationTitle=()=>{
	var x =['화폐의 종류별 매수 계산','사과구입','반 배정','구구단'];
	return x;
}

var createHTag=x=>{
	return '<h'+x.num+' id="'+x.id+'"></h'+x.num+'>';
}
var createDiv=x=>{
	return '<div id="'+x.id+'"class="'+x.clazz+'"></div>';
}//style = "margin-top: 50px"

var createUL=x=>{
	return '<ul id="'+x.id+'" class="'+x.clazz+'"></ul>';
}
var createLI=x=>{
	return '<li id="'+x.id+'" class="'+x.clazz+'"></li>';
}
var createLabel=x=>{
	return '<label id="'+x.id+'">'+x.val+'</label>';
}
var createATag=x=>{
	return '<a id="'+x.id+'" href="#">'+x.val+'</a>';
}
var createText=x=>{
	return '<span id="'+x.id+'"></span>';
}
var createSpan=x=>{
	return '<span id="'+x.id+'" class="'+x.clazz+'" >&nbsp;'+x.val+'</span>';
}

var createInput=x=>{
	return $('<input type="'+x.type+'" id="'+x.id+'" class="'+x.clazz+'"' 
			+' placeholder="'+x.holder+'" role="'+x.role+'" aria-describedby="basic-addon1"/>');
}
var createButton=x=>{
	return '<button type="'+x.type+'" id="'+x.id+'" class="btn-'+x.clazz+'">'+x.val+'</button>';
}
var createButtonAlgorithm =x=>{
	return '<li><a id="a-'+x.id+'" href="#"> '+x.val+' </a></li>';
}
var createForm =x=>{
	return '<form id="'+x.id+'" class="'+x.clazz+'" action="'+x.action+'" method="'+x.method+'" role="'+x.role+'"></form>';
}

