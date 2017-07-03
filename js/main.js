//首先页面加载完成完成初始化
window.onload = function(){
	startGames();
}
var score = 0;
//以下是开始游戏
function startGames(){
	//点击开始的时候的分数为0分
	score = 0;
	$('#score').html(score);
	init();//初始化
	generateOneNumber();
	generateOneNumber();
	$("#gameOver").css('display','none');
}

//以下是初始化代码
var gridArr = new Array();
function init(){
	//初始化位置
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getposTop(i,j));
			gridCell.css("left",getposLeft(i,j));
		}
	}
	//初始化数组
	for(var i=0;i<4;i++){
		gridArr[i] = new Array();
		for(var j=0;j<4;j++){
			gridArr[i][j] = 0;
		}
	}
	//更新视图页面（上层带数字的16个小单元格）
	updateView();
}

//更新视图部分
function updateView(){
	//将所有上层单元格都清空，然后重新初始化
	$('.number-cell').remove();

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
			var numberCell = $(`#number-cell-${i}-${j}`);
			if(gridArr[i][j] != 0){
				numberCell.css("width",'100px');
				numberCell.css("height",'100px');
				numberCell.css('background-color',getNumberBackgroundColor(gridArr[i][j]));
				numberCell.css('color',getNumberColor(gridArr[i][j]));
				numberCell.css("top",getposTop(i,j));
				numberCell.css("left",getposLeft(i,j));
				numberCell.text(gridArr[i][j]);
			}else{
				numberCell.css("width",'0px');
				numberCell.css("height",'0px');
				numberCell.css('background-color',getNumberBackgroundColor(gridArr[i][j]));
				numberCell.css('color',getNumberColor(gridArr[i][j]));
				numberCell.css("top",getposTop(i,j)+50);
				numberCell.css("left",getposLeft(i,j)+50);
			}
		}
	}
}

/*随机产生数，2或者4
找到随机空位置*/

function generateOneNumber(){
	//判断是否还有空间，如果没有空位置则游戏结束
	if(noSpace(gridArr)){
		return;
	}
	//找到随机位置
	var count = 0;
	var array = new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(gridArr[i][j] == 0){
				array[count] = i*4+j;//之所以这样设置，是为了一会儿方便取i、j来确定位置
				count++;
			}
		}
	}
	var n = Math.floor(Math.random()*count);
	var randX = Math.floor(array[n]/4);
	var randY = Math.floor(array[n]%4);

	//随机产生数字2或者4
	var randNumber = Math.random()>0.5?2:4;
	gridArr[randX][randY]=randNumber;

	//在随机位置上显示数字
	showNumberWithAnimation(randX,randY,randNumber);
}

//实现键盘响应
$(document).keydown(function(event){
	event.preventDefault();
	switch(event.keyCode){
		case 37:
			isGameOver();
			if(canMoveLeft(gridArr)){
				moveLeft();
				setTimeout(generateOneNumber,210);
			}
			break;
		case 38:
			isGameOver();
			if(canMoveTop(gridArr)){
				moveTop();
				setTimeout(generateOneNumber,210);
			}
		break;
		case 39:
			isGameOver();
			if(canMoveRight(gridArr)){
				moveRight();
				setTimeout(generateOneNumber,210);
			}
		break;
		case 40:
			isGameOver();
			if(canMoveBottom(gridArr)){
				moveBottom();
				setTimeout(generateOneNumber,210);
			}
		break;
	}
});

// 向左移动的事件
/*
最左边为最佳落脚点，想做移动有两种情况
1.左边有空的并且中间没有障碍物
2.左边有跟其值一样的数字，并且中间没有障碍物
*/
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(gridArr[i][j] != 0){
				for(var k=0;k<j;k++){//从最左边开始逐一判断是否能够成为落脚点
					if(gridArr[i][k] == 0 && noBlockHorizotal(i,k,j,gridArr)){//落脚点为空的，并且中间没有障碍
						showMoveAnimation(i,j,i,k);
						gridArr[i][k] = gridArr[i][j];
						gridArr[i][j] = 0;
						break;
					}else if(gridArr[i][k] == gridArr[i][j] && noBlockHorizotal(i,k,j,gridArr)){//落脚点的值与其的值一样，并且中间没间隔
						showMoveAnimation(i,j,i,k);
						gridArr[i][k] += gridArr[i][j];
						getScores(gridArr[i][k]);
						gridArr[i][j] = 0;
						break;
					}
				}
			}
		}
	}

	//重新进行页面的更新视图
	setTimeout(updateView,200);
}

// 向右移动的事件
/*
最右边为最佳落脚点，想做移动有两种情况
1.右边有空的并且中间没有障碍物
2.右边有跟其值一样的数字，并且中间没有障碍物
*/
function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(gridArr[i][j] != 0){
				for(var k=3;k>j;k--){//从最右边开始逐一判断是否能够成为落脚点
					if(gridArr[i][k] == 0 && noBlockHorizotal(i,j,k,gridArr)){//落脚点为空的，并且中间没有障碍
						showMoveAnimation(i,j,i,k);
						gridArr[i][k] = gridArr[i][j];
						gridArr[i][j] = 0;
						break;
					}else if(gridArr[i][k] == gridArr[i][j] && noBlockHorizotal(i,j,k,gridArr)){//落脚点的值与其的值一样，并且中间没间隔
						showMoveAnimation(i,j,i,k);
						gridArr[i][k] += gridArr[i][j];
						getScores(gridArr[i][k]);
						gridArr[i][j] = 0;
						break;
					}
				}
			}
		}
	}

	//重新进行页面的更新视图
	setTimeout(updateView,200);
}

// 向上移动的事件
/*
最上边为最佳落脚点，想做移动有两种情况
1.上边有空的并且中间没有障碍物
2.上边有跟其值一样的数字，并且中间没有障碍物
*/
function moveTop(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(gridArr[i][j] != 0){
				for(var k=0;k<i;k++){//从最左边开始逐一判断是否能够成为落脚点
					if(gridArr[k][j] == 0 && noBlockVertical(k,i,j,gridArr)){//落脚点为空的，并且中间没有障碍
						showMoveAnimation(i,j,k,j);
						gridArr[k][j] = gridArr[i][j];
						gridArr[i][j] = 0;
						break;
					}else if(gridArr[k][j] == gridArr[i][j] && noBlockVertical(k,i,j,gridArr)){//落脚点的值与其的值一样，并且中间没间隔
						showMoveAnimation(i,j,k,j);
						gridArr[k][j] += gridArr[i][j];
						getScores(gridArr[k][j]);
						gridArr[i][j] = 0;
						break;
					}
				}
			}
		}
	}

	//重新进行页面的更新视图
	setTimeout(updateView,200);
}

// 向下移动的事件
/*
最下边为最佳落脚点，想做移动有两种情况
1.下边有空的并且中间没有障碍物
2.下边有跟其值一样的数字，并且中间没有障碍物
*/
function moveBottom(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(gridArr[i][j] != 0){
				for(var k=3;k>i;k--){//从最下边开始逐一判断是否能够成为落脚点
					if(gridArr[k][j] == 0 && noBlockVertical(i,k,j,gridArr)){//落脚点为空的，并且中间没有障碍
						showMoveAnimation(i,j,k,j);
						gridArr[k][j] = gridArr[i][j];
						gridArr[i][j] = 0;
						break;
					}else if(gridArr[k][j] == gridArr[i][j] && noBlockVertical(i,k,j,gridArr)){//落脚点的值与其的值一样，并且中间没间隔
						showMoveAnimation(i,j,k,j);
						gridArr[k][j] += gridArr[i][j];
						getScores(gridArr[k][j]);
						gridArr[i][j] = 0;
						break;
					}
				}
			}
		}
	}

	//重新进行页面的更新视图
	setTimeout(updateView,200);
}
// 以下是计算分数的函数
function getScores(num){
	score += num;
	$('#score').html(score);
}

/*
如果上下左右都不能移动，并且已经没有可以添加的位置的时候，跳转出来游戏结束

*/
function isGameOver(){	
	if(noSpace(gridArr) && !canMoveLeft(gridArr) && !canMoveRight(gridArr) && !canMoveTop(gridArr) && !canMoveBottom(gridArr)){
		//alert('gameOver');
		$("#gameOver").css('display','block');
		$('#lastScore').html(score);
	}
};