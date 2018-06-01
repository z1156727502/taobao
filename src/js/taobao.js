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