$('.navl').on('mouseenter' , '.area' , () => {$('.area').addClass('area-active')}).on('mouseleave' , '.area' , () => {$('.area').removeClass('area-active')});
$('.navr').on('mouseenter' , '.mytaobao' , () => {$('.mytaobao').addClass('mytaobao-active')}).on('mouseleave' , '.mytaobao' , () => {$('.mytaobao').removeClass('mytaobao-active')});
$('.navr').on('mouseenter' , '.like' , () => {$('.like').addClass('like-active')}).on('mouseleave' , '.like' , () => {$('.like').removeClass('like-active')});
$('.navr').on('mouseenter' , '.waiter' , () => {$('.waiter').addClass('waiter-active')}).on('mouseleave' , '.waiter' , () => {$('.waiter').removeClass('waiter-active')});
$('.navr').on('mouseenter' , '.seller' , () => {$('.seller').addClass('seller-active')}).on('mouseleave' , '.seller' , () => {$('.seller').removeClass('seller-active')});
$('.navr').on('mouseenter' , '.navall' , () => {$('.navall').addClass('navall-active')}).on('mouseleave' , '.navall' , () => {$('.navall').removeClass('navall-active')});
$('.mtao').one('click' , () => {$('.mtao').addClass('mtao-closed')});
$('.search-cont-top').on('click' , 'li' , function(){
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
});
$('.search-input').focusin(() => {$('.tips').addClass('untips')}).focusout(() => {$('.tips').removeClass('untips')});
// 以下为轮播图1
$.ajax({
	type: 'GET',
	url:'./data/turn1.json',
	success: setDom,
	error: () => {console.log('error')}
});


let n1 = 2;///////////

function setDom (data) {
	let str = '';
	let str1 = '<li class="active"></li>';
	n1 = data.length
	data.forEach( (ele , index) => {
		str += `<li class="turn-item">
					<a href="${ele.url}" style="background-image: url(${ele.img});"></a>
				</li>`;
		if (index > 0) {
			str1 += `<li></li>`;
		}
	} )
	str += `<li class="turn-item">
				<a href="${data[0].url}" style="background-image: url(${data[0].img});"></a>
			</li>`;
	$('.turn1 .turn-cont').html(str);
	$('.turn1 .contr').html(str1);
	$('.turn1 .turn-cont').css('width' , (n1 + 1) + '00%');
}



let f = true;
let timer;
let time = 5000;
let index = 0;
let $cont1 = $('.turn1 .turn-cont').eq(0);
let $arrowL = $('.turn1 .arrow-L');
let $arrowR = $('.turn1 .arrow-R');



let switchC = ($dom , i) => {
	index = i;
	index = searchD(index , $dom);
	setTimeout(() => {f = true} , 500);
	$dom.addClass('switching').css('left' , -index +'00%');
	$('.turn1 .contr .active').removeClass('active')
	if (index >= n1) {
		$('.turn1 .contr li').eq(0).addClass('active');
	}else{
		$('.turn1 .contr li').eq(index).addClass('active');
	}
	auto1();
}


let searchD = (i , $dom) => {
	if (i < 0) {
		$dom.removeClass('switching').css('left' , -n1 +'00%');
		i += n1;
		while( $dom.position().left > -$dom.find('.turn-item').width() * n1 + 10 ){};
	}else if (i > n1) {
		$dom.removeClass('switching').css('left' , 0 +'%');
		i -= n1;
		while($dom.position().left > 5){};
	}
	return i;
}

$arrowL.on('click' , () => {
	if (f) {
		f = false;
		clearTimeout(timer);
		switchC($cont1 , index - 1)
	} 
});

	
$arrowR.on('click' , () => {
	if (f) {
		f = false;
		clearTimeout(timer);
		switchC($cont1 , index + 1)
	} 
});

$('.turn1 .contr').on('click' , 'li' , function(){
	if (f) {
		f = false;
		clearTimeout(timer);
		switchC($cont1 , $(this).index());
	}	
})

let auto1 = () => {
	timer = setTimeout(() => {
		f = false;
		switchC($cont1 , index + 1);
	} , time)
}
auto1();

// 以下为轮播图2
$.ajax({
	type: 'GET',
	url:'./data/turn2.json',
	success: setDom2,
	error: () => {console.log('error')}
});


let n2 = 2;///////////

function setDom2 (data) {
	let str = '';
	n2 = data.length
	data.forEach( (ele , index) => {
		str += `<li class="turn-item">
					<a href="${ele.url}" style="background-image: url(${ele.img});"></a>
				</li>`;
	} )
	str += `<li class="turn-item">
				<a href="${data[0].url}" style="background-image: url(${data[0].img});"></a>
			</li>`;
	$('.turn2 .turn-cont').html(str);
	$('.turn2 .turn-cont').css('width' , (n2 + 1) + '00%');
}

let f2 = true;
let timer2;
let time2 = 4000;
let index2 = 0;
let $cont2 = $('.turn2 .turn-cont');
let $arrowL2 = $('.turn2 .arrow-L');
let $arrowR2 = $('.turn2 .arrow-R');

let switchC2 = ($dom , i) => {
	index2 = i;
	index2 = searchD(index2 , $dom);
	setTimeout(() => {f2 = true} , 500);
	$dom.addClass('switching').css('left' , -index2 +'00%');
	auto2();
}

$arrowL2.on('click' , () => {
	if (f2) {
		f2 = false;
		clearTimeout(timer2);
		switchC2($cont2 , index2 - 1)
	} 
});

	
$arrowR2.on('click' , () => {
	if (f2) {
		f2 = false;
		clearTimeout(timer2);
		switchC2($cont2 , index2 + 1)
	} 
});

let auto2 = () => {
	timer2 = setTimeout(() => {
		f2 = false;
		switchC2($cont2 , index2 + 1);
	} , time2)
}
auto2();

// 轮播图结束
$('.cont-r .nav .nav-wrap').on('mouseenter' , '.nav-root' , function() {
	$('.cont-r .nav .nav-wrap').find('.now').removeClass('now');
	$(this).addClass('now');
	let num = $(this).index();
	$('.cont-r .nav>.now').removeClass('now');
	$('.cont-r .nav .cont').eq(num).addClass('now');
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhb2Jhby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKCcubmF2bCcpLm9uKCdtb3VzZWVudGVyJyAsICcuYXJlYScgLCAoKSA9PiB7JCgnLmFyZWEnKS5hZGRDbGFzcygnYXJlYS1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcuYXJlYScgLCAoKSA9PiB7JCgnLmFyZWEnKS5yZW1vdmVDbGFzcygnYXJlYS1hY3RpdmUnKX0pO1xyXG4kKCcubmF2cicpLm9uKCdtb3VzZWVudGVyJyAsICcubXl0YW9iYW8nICwgKCkgPT4geyQoJy5teXRhb2JhbycpLmFkZENsYXNzKCdteXRhb2Jhby1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcubXl0YW9iYW8nICwgKCkgPT4geyQoJy5teXRhb2JhbycpLnJlbW92ZUNsYXNzKCdteXRhb2Jhby1hY3RpdmUnKX0pO1xyXG4kKCcubmF2cicpLm9uKCdtb3VzZWVudGVyJyAsICcubGlrZScgLCAoKSA9PiB7JCgnLmxpa2UnKS5hZGRDbGFzcygnbGlrZS1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcubGlrZScgLCAoKSA9PiB7JCgnLmxpa2UnKS5yZW1vdmVDbGFzcygnbGlrZS1hY3RpdmUnKX0pO1xyXG4kKCcubmF2cicpLm9uKCdtb3VzZWVudGVyJyAsICcud2FpdGVyJyAsICgpID0+IHskKCcud2FpdGVyJykuYWRkQ2xhc3MoJ3dhaXRlci1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcud2FpdGVyJyAsICgpID0+IHskKCcud2FpdGVyJykucmVtb3ZlQ2xhc3MoJ3dhaXRlci1hY3RpdmUnKX0pO1xyXG4kKCcubmF2cicpLm9uKCdtb3VzZWVudGVyJyAsICcuc2VsbGVyJyAsICgpID0+IHskKCcuc2VsbGVyJykuYWRkQ2xhc3MoJ3NlbGxlci1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcuc2VsbGVyJyAsICgpID0+IHskKCcuc2VsbGVyJykucmVtb3ZlQ2xhc3MoJ3NlbGxlci1hY3RpdmUnKX0pO1xyXG4kKCcubmF2cicpLm9uKCdtb3VzZWVudGVyJyAsICcubmF2YWxsJyAsICgpID0+IHskKCcubmF2YWxsJykuYWRkQ2xhc3MoJ25hdmFsbC1hY3RpdmUnKX0pLm9uKCdtb3VzZWxlYXZlJyAsICcubmF2YWxsJyAsICgpID0+IHskKCcubmF2YWxsJykucmVtb3ZlQ2xhc3MoJ25hdmFsbC1hY3RpdmUnKX0pO1xyXG4kKCcubXRhbycpLm9uZSgnY2xpY2snICwgKCkgPT4geyQoJy5tdGFvJykuYWRkQ2xhc3MoJ210YW8tY2xvc2VkJyl9KTtcclxuJCgnLnNlYXJjaC1jb250LXRvcCcpLm9uKCdjbGljaycgLCAnbGknICwgZnVuY3Rpb24oKXtcclxuXHQkKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHQkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG59KTtcclxuJCgnLnNlYXJjaC1pbnB1dCcpLmZvY3VzaW4oKCkgPT4geyQoJy50aXBzJykuYWRkQ2xhc3MoJ3VudGlwcycpfSkuZm9jdXNvdXQoKCkgPT4geyQoJy50aXBzJykucmVtb3ZlQ2xhc3MoJ3VudGlwcycpfSk7XHJcbi8vIOS7peS4i+S4uui9ruaSreWbvjFcclxuJC5hamF4KHtcclxuXHR0eXBlOiAnR0VUJyxcclxuXHR1cmw6Jy4vZGF0YS90dXJuMS5qc29uJyxcclxuXHRzdWNjZXNzOiBzZXREb20sXHJcblx0ZXJyb3I6ICgpID0+IHtjb25zb2xlLmxvZygnZXJyb3InKX1cclxufSk7XHJcblxyXG5cclxubGV0IG4xID0gMjsvLy8vLy8vLy8vL1xyXG5cclxuZnVuY3Rpb24gc2V0RG9tIChkYXRhKSB7XHJcblx0bGV0IHN0ciA9ICcnO1xyXG5cdGxldCBzdHIxID0gJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjwvbGk+JztcclxuXHRuMSA9IGRhdGEubGVuZ3RoXHJcblx0ZGF0YS5mb3JFYWNoKCAoZWxlICwgaW5kZXgpID0+IHtcclxuXHRcdHN0ciArPSBgPGxpIGNsYXNzPVwidHVybi1pdGVtXCI+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwiJHtlbGUudXJsfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7ZWxlLmltZ30pO1wiPjwvYT5cclxuXHRcdFx0XHQ8L2xpPmA7XHJcblx0XHRpZiAoaW5kZXggPiAwKSB7XHJcblx0XHRcdHN0cjEgKz0gYDxsaT48L2xpPmA7XHJcblx0XHR9XHJcblx0fSApXHJcblx0c3RyICs9IGA8bGkgY2xhc3M9XCJ0dXJuLWl0ZW1cIj5cclxuXHRcdFx0XHQ8YSBocmVmPVwiJHtkYXRhWzBdLnVybH1cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgke2RhdGFbMF0uaW1nfSk7XCI+PC9hPlxyXG5cdFx0XHQ8L2xpPmA7XHJcblx0JCgnLnR1cm4xIC50dXJuLWNvbnQnKS5odG1sKHN0cik7XHJcblx0JCgnLnR1cm4xIC5jb250cicpLmh0bWwoc3RyMSk7XHJcblx0JCgnLnR1cm4xIC50dXJuLWNvbnQnKS5jc3MoJ3dpZHRoJyAsIChuMSArIDEpICsgJzAwJScpO1xyXG59XHJcblxyXG5cclxuXHJcbmxldCBmID0gdHJ1ZTtcclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZSA9IDUwMDA7XHJcbmxldCBpbmRleCA9IDA7XHJcbmxldCAkY29udDEgPSAkKCcudHVybjEgLnR1cm4tY29udCcpLmVxKDApO1xyXG5sZXQgJGFycm93TCA9ICQoJy50dXJuMSAuYXJyb3ctTCcpO1xyXG5sZXQgJGFycm93UiA9ICQoJy50dXJuMSAuYXJyb3ctUicpO1xyXG5cclxuXHJcblxyXG5sZXQgc3dpdGNoQyA9ICgkZG9tICwgaSkgPT4ge1xyXG5cdGluZGV4ID0gaTtcclxuXHRpbmRleCA9IHNlYXJjaEQoaW5kZXggLCAkZG9tKTtcclxuXHRzZXRUaW1lb3V0KCgpID0+IHtmID0gdHJ1ZX0gLCA1MDApO1xyXG5cdCRkb20uYWRkQ2xhc3MoJ3N3aXRjaGluZycpLmNzcygnbGVmdCcgLCAtaW5kZXggKycwMCUnKTtcclxuXHQkKCcudHVybjEgLmNvbnRyIC5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuXHRpZiAoaW5kZXggPj0gbjEpIHtcclxuXHRcdCQoJy50dXJuMSAuY29udHIgbGknKS5lcSgwKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fWVsc2V7XHJcblx0XHQkKCcudHVybjEgLmNvbnRyIGxpJykuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9XHJcblx0YXV0bzEoKTtcclxufVxyXG5cclxuXHJcbmxldCBzZWFyY2hEID0gKGkgLCAkZG9tKSA9PiB7XHJcblx0aWYgKGkgPCAwKSB7XHJcblx0XHQkZG9tLnJlbW92ZUNsYXNzKCdzd2l0Y2hpbmcnKS5jc3MoJ2xlZnQnICwgLW4xICsnMDAlJyk7XHJcblx0XHRpICs9IG4xO1xyXG5cdFx0d2hpbGUoICRkb20ucG9zaXRpb24oKS5sZWZ0ID4gLSRkb20uZmluZCgnLnR1cm4taXRlbScpLndpZHRoKCkgKiBuMSArIDEwICl7fTtcclxuXHR9ZWxzZSBpZiAoaSA+IG4xKSB7XHJcblx0XHQkZG9tLnJlbW92ZUNsYXNzKCdzd2l0Y2hpbmcnKS5jc3MoJ2xlZnQnICwgMCArJyUnKTtcclxuXHRcdGkgLT0gbjE7XHJcblx0XHR3aGlsZSgkZG9tLnBvc2l0aW9uKCkubGVmdCA+IDUpe307XHJcblx0fVxyXG5cdHJldHVybiBpO1xyXG59XHJcblxyXG4kYXJyb3dMLm9uKCdjbGljaycgLCAoKSA9PiB7XHJcblx0aWYgKGYpIHtcclxuXHRcdGYgPSBmYWxzZTtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHRzd2l0Y2hDKCRjb250MSAsIGluZGV4IC0gMSlcclxuXHR9IFxyXG59KTtcclxuXHJcblx0XHJcbiRhcnJvd1Iub24oJ2NsaWNrJyAsICgpID0+IHtcclxuXHRpZiAoZikge1xyXG5cdFx0ZiA9IGZhbHNlO1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHN3aXRjaEMoJGNvbnQxICwgaW5kZXggKyAxKVxyXG5cdH0gXHJcbn0pO1xyXG5cclxuJCgnLnR1cm4xIC5jb250cicpLm9uKCdjbGljaycgLCAnbGknICwgZnVuY3Rpb24oKXtcclxuXHRpZiAoZikge1xyXG5cdFx0ZiA9IGZhbHNlO1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuXHRcdHN3aXRjaEMoJGNvbnQxICwgJCh0aGlzKS5pbmRleCgpKTtcclxuXHR9XHRcclxufSlcclxuXHJcbmxldCBhdXRvMSA9ICgpID0+IHtcclxuXHR0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0ZiA9IGZhbHNlO1xyXG5cdFx0c3dpdGNoQygkY29udDEgLCBpbmRleCArIDEpO1xyXG5cdH0gLCB0aW1lKVxyXG59XHJcbmF1dG8xKCk7XHJcblxyXG4vLyDku6XkuIvkuLrova7mkq3lm74yXHJcbiQuYWpheCh7XHJcblx0dHlwZTogJ0dFVCcsXHJcblx0dXJsOicuL2RhdGEvdHVybjIuanNvbicsXHJcblx0c3VjY2Vzczogc2V0RG9tMixcclxuXHRlcnJvcjogKCkgPT4ge2NvbnNvbGUubG9nKCdlcnJvcicpfVxyXG59KTtcclxuXHJcblxyXG5sZXQgbjIgPSAyOy8vLy8vLy8vLy8vXHJcblxyXG5mdW5jdGlvbiBzZXREb20yIChkYXRhKSB7XHJcblx0bGV0IHN0ciA9ICcnO1xyXG5cdG4yID0gZGF0YS5sZW5ndGhcclxuXHRkYXRhLmZvckVhY2goIChlbGUgLCBpbmRleCkgPT4ge1xyXG5cdFx0c3RyICs9IGA8bGkgY2xhc3M9XCJ0dXJuLWl0ZW1cIj5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCIke2VsZS51cmx9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtlbGUuaW1nfSk7XCI+PC9hPlxyXG5cdFx0XHRcdDwvbGk+YDtcclxuXHR9IClcclxuXHRzdHIgKz0gYDxsaSBjbGFzcz1cInR1cm4taXRlbVwiPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIke2RhdGFbMF0udXJsfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7ZGF0YVswXS5pbWd9KTtcIj48L2E+XHJcblx0XHRcdDwvbGk+YDtcclxuXHQkKCcudHVybjIgLnR1cm4tY29udCcpLmh0bWwoc3RyKTtcclxuXHQkKCcudHVybjIgLnR1cm4tY29udCcpLmNzcygnd2lkdGgnICwgKG4yICsgMSkgKyAnMDAlJyk7XHJcbn1cclxuXHJcbmxldCBmMiA9IHRydWU7XHJcbmxldCB0aW1lcjI7XHJcbmxldCB0aW1lMiA9IDQwMDA7XHJcbmxldCBpbmRleDIgPSAwO1xyXG5sZXQgJGNvbnQyID0gJCgnLnR1cm4yIC50dXJuLWNvbnQnKTtcclxubGV0ICRhcnJvd0wyID0gJCgnLnR1cm4yIC5hcnJvdy1MJyk7XHJcbmxldCAkYXJyb3dSMiA9ICQoJy50dXJuMiAuYXJyb3ctUicpO1xyXG5cclxubGV0IHN3aXRjaEMyID0gKCRkb20gLCBpKSA9PiB7XHJcblx0aW5kZXgyID0gaTtcclxuXHRpbmRleDIgPSBzZWFyY2hEKGluZGV4MiAsICRkb20pO1xyXG5cdHNldFRpbWVvdXQoKCkgPT4ge2YyID0gdHJ1ZX0gLCA1MDApO1xyXG5cdCRkb20uYWRkQ2xhc3MoJ3N3aXRjaGluZycpLmNzcygnbGVmdCcgLCAtaW5kZXgyICsnMDAlJyk7XHJcblx0YXV0bzIoKTtcclxufVxyXG5cclxuJGFycm93TDIub24oJ2NsaWNrJyAsICgpID0+IHtcclxuXHRpZiAoZjIpIHtcclxuXHRcdGYyID0gZmFsc2U7XHJcblx0XHRjbGVhclRpbWVvdXQodGltZXIyKTtcclxuXHRcdHN3aXRjaEMyKCRjb250MiAsIGluZGV4MiAtIDEpXHJcblx0fSBcclxufSk7XHJcblxyXG5cdFxyXG4kYXJyb3dSMi5vbignY2xpY2snICwgKCkgPT4ge1xyXG5cdGlmIChmMikge1xyXG5cdFx0ZjIgPSBmYWxzZTtcclxuXHRcdGNsZWFyVGltZW91dCh0aW1lcjIpO1xyXG5cdFx0c3dpdGNoQzIoJGNvbnQyICwgaW5kZXgyICsgMSlcclxuXHR9IFxyXG59KTtcclxuXHJcbmxldCBhdXRvMiA9ICgpID0+IHtcclxuXHR0aW1lcjIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdGYyID0gZmFsc2U7XHJcblx0XHRzd2l0Y2hDMigkY29udDIgLCBpbmRleDIgKyAxKTtcclxuXHR9ICwgdGltZTIpXHJcbn1cclxuYXV0bzIoKTtcclxuXHJcbi8vIOi9ruaSreWbvue7k+adn1xyXG4kKCcuY29udC1yIC5uYXYgLm5hdi13cmFwJykub24oJ21vdXNlZW50ZXInICwgJy5uYXYtcm9vdCcgLCBmdW5jdGlvbigpIHtcclxuXHQkKCcuY29udC1yIC5uYXYgLm5hdi13cmFwJykuZmluZCgnLm5vdycpLnJlbW92ZUNsYXNzKCdub3cnKTtcclxuXHQkKHRoaXMpLmFkZENsYXNzKCdub3cnKTtcclxuXHRsZXQgbnVtID0gJCh0aGlzKS5pbmRleCgpO1xyXG5cdCQoJy5jb250LXIgLm5hdj4ubm93JykucmVtb3ZlQ2xhc3MoJ25vdycpO1xyXG5cdCQoJy5jb250LXIgLm5hdiAuY29udCcpLmVxKG51bSkuYWRkQ2xhc3MoJ25vdycpO1xyXG59KTsiXX0=
