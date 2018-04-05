/**
 * 
 */
var arith = (x,y,z)=>{
	//등차수열  x초기값, y리미트값, z공차
	var x = x*1;
	var y = y*1;
	var z = z*1;
	var sum = 0;
	var formula="";
	var k=x;
	for(var i=0; i<y; i++){
		sum+=k;
		formula += (i==y)? k + " = " : k + "+" ;
		k+=z;
	}
	return formula + sum;
	/*var sum=0;
	for (var x=1; x<=20; x++){
		sum+=2;
	}
	return sum;*/
	
	/*정처기 문제식 풀이
	 * var sum=0;
	var x=0;
	for(;;){
		x++;
		sum+=x;
		if(x>10){
			break;
		}
	}
	return sum;*/
}
var swc=(x,y,z)=>{
	var x = x*1;
	var y = y*1;
	var z = z*1;
	var sum = 0;
	var formula="";
	var sw=0;
	var k=x;
	var l=k;
	for(var i=0;i<y;i++){
		switch(sw){
		case 0: sum += k;
				//alert("sw: " + sw + " k: " + k + " sum: "+ sum );
				sw=1;
			break;
		case 1: sum -= k;
				//alert("sw: " + sw + " k: " + k + " sum: "+ sum );
				sw=0;
			break;
		}
		formula += (i==y-1) ? k+"=" : (l>=0) ? k+"-" : k+"+";	
		//alert("formula: " + formula + " sum: " + sum + "  l: " + l);
		k+=z;
		l=(-1)*l;
	}
	return formula + sum;
	
}
var geo=(x,y,z)=>{
	var x = x*1;
	var y = y*1;
	var z = z*1;
	var sum = 0;
	var formula="";
	var k=x;
	for(var i=0;i<y;i++){
		sum+=k;
		formula += (i==y-1) ? k+"=": (z>=0) ? k+"+": (k>=0) ? k: k+"+";
		//alert("formula: "+formula + " sum: "+sum +"    k: "+k);
		k*=z;
	}
	return formula+sum;
}
var fibo=(x,y)=>{
	var x = x*1;
	var y = y*1;
	var b=x;
	var formula = x+"+"+b+"+";
	var c=0;
	var sum = x+b;
	for(;;){
		c=x+b;
		sum+=c;
		formula += (i==y-1)? c+"=" : c+"+";
		alert("formula: "+formula+" sum: "+sum)
		if(i<y-1){
			x=b;
			b=c;
		}else{
			break;
		}
	}
	return formula + sum;
}
var facto=(x,y)=>{
	var x = x*1;
	var y = y*1;
	var k=1;
	for(var i=0; i<x;){
		i++;
		k*=i;
	}
	var sum = k;
	var formula = k +"+";
	alert("k: "+ k+ " sum: "+ sum);
	for(var i=x;;){
		if(i<x+y-1){
			i++;
			k*=i;
			sum +=k;
			formula += (i==x+y-1)? k+"=": k+"+";
			//alert("formula: "+ formula+ " sum: "+ sum);
		}else{
			break;
		}
	}
	return formula+sum;
}
var prime=(x,y)=>{
	var x = x*1;
	var y = y*1;
	var sum = 0;
	var k=2;
	var j=0;
	var formula ="";
	for(;;){	
		if(k<=y){
			j=2;
			for(;j<=k;){
				if(k%j==0){
					if(k==j){
						sum += k;
						formula+="+"+k;
						//alert("formula: "+formula + " sum: " + sum);
						break;
					}else{
						break;	//else의 경우에도 break;를 해줘야 else경우일때도 탈출
					}
				}else{
					j++;
				}
			}
			k++;
		}else{
			formula+="=";
			break;
		}
	}
	
	return formula + sum;
}
var gcdLcm=(x,y)=>{
	var x = x*1;
	var y = y*1;
	var gcd=0;
	var lcm=0;
	var big=0;
	var small=0;
	var mok=0;
	var nmg=0;
	

	
	if(x!=y){
		if(x>y){
			big = x;
			small=y;
		}else{
			big= y;
			small=x;
		}
		for(;;){
			mok = big/small;
			nmg = big%small;
			if(nmg==0){
				gcd=small;
				lcm=(x*y)/gcd;
				//alert("x: "+x+" y: "+y+" gcd: "+gcd+ " lcm: "+lcm);
				break;
			}else{
				big=small;
				small=nmg;
			}
		}	
	}else{
		//alert("두수가 같은 경우");
		gcd = x;
		lcm = x;
	}
	return "최대공약수: "+ gcd + "\n최소공배수: "+ lcm;
}
var factorization=(x)=>{
	var x = x*1;
	var p=0;
	var t=0;
	var j="";
	var a = new Array();	
	for(;;){
		if(x>=2){
			t=0;
			for(;;){
				if(x==1){
					if(t==1){
						j="x는 소수";
						break;
					}else{
						//반복문
						for(var i=1; i<=t-1; i++){
							j+=a[i]+"*"
						}
						j+=a[t];
						break;
					}
				}else{
					p=2;
					for(;;){
						if(x%p==0){
							t++;
							a[t]=p;
							x=x/p;
							break;
						}else{
							p++;
						}
					}
				}
			}
		}else{
			break;
		}
	}
	return j;
}
var maxMin=(arr)=>{
	var j=0;
	var max=0;
	var min=0;
	var x= new Array();
	for(;;){
		j++;
		if(j<=arr.length){			
			x[j]=arr[j];
			//alert("x["+j+"]: " + x[j]);
		}else{
			for(var i=1;i<=x.length;i++){
				max= (x[i]>max)? max=x[i]: max;
			}
			min=max;
			for(var i=1;i<=x.length;i++){
				min= (x[i]<min)? min=x[i]: min;
			}	
			break;
		}
	}
	return "max: "+ max +"\nmin: "+ min;
}
var multiple=(x,y,z)=>{
	var x=x*1;
	var y=y*1;
	var z=z*1;
	var cnt=0;
	var hap=0;
	var mok=0;
	var nmg=0;
	var formula="";
	for(var i=x; i<=y; i++){
		mok = i/z;
		nmg= i%z;
		if(nmg==0){
			cnt++;
			hap+=i;
			formula += "+"+i;
		}
	}
	formula += "=";
	return z+"의 배수 개수: "+cnt +"\n합:"+formula+ hap;
}
var closest=(arr,z)=>{
	var j=0;
	var k=0;
	var l=0;
	var m=0;
	var x=new Array();
	var i=0;
	
	for(;;){
		i++;
		if(i<=5){
			 x[i]=arr[i];
		}else{
			j=9;
			for(k=1; k<=5; k++){
				if(x[k]>z){	
					l=x[k]-z;
				}else{
					l=z-x[k];
				}
				if(l<=j){
					j=l;
					m=x[k];
				}
			}
		break;
		}
	}
	return z+"에 가장 가까운 수: "+m;
}
var select=(arr)=>{
	var m=0;
	var i=0;
	var j=0;
	var k=0;
	var x=0;
	var data=new Array();
	
	
	m=0;
	for(;;){
		if(m<5){
			m++;
			data[m]=arr[m];
		}else{
			i=0;
			for(;;){
				if(i<data.length-1){
					i++;
					j=0;
					for(;;){
						j++;
						if(j<data.length){
							if(data[i]>data[j]){
								k=data[i];
								data[i]=data[j];
								data[j]=k;
							}
						}else{
							break;
						}
					}
				}else{
					for(x=1; x<=10; x++){
						//출력
					}
					
					break;
				}
				
				
			}
			
			
			break;
		}
		
		
	}
	
	
	
	
	
	return data;
}




var fiveByFive=()=>{
	var x=[
		{
			a:1,
			b:2,
			c:3,
			d:4,
			e:5
		},
		{
			a:6,
			b:7,
			c:8,
			d:9,
			e:10
		},
		{
			a:11,
			b:12,
			c:13,
			d:14,
			e:15
		},
		{
			a:16,
			b:17,
			c:18,
			d:19,
			e:20
		},
		{
			a:21,
			b:22,
			c:23,
			d:24,
			e:25
		}
	];
	var a = new Array();
	var o = null;
	var k = 1;
	for(var i=0; i<5; i++){
		o= new Object();
		o.a = k++;
		o.b = k++;
		o.c = k++;
		o.d = k++;
		o.e = k++;
		a.push(o);
	}
	return JSON.stringify(a);
}


