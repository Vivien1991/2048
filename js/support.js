// 获取小方格距离上面的距离的函数
function getposTop(i,j){
	return 20+120*i;
}
// 获取小方格距离左边的距离的函数
function getposLeft(i,j){
	return 20+120*j;
}
//判断是否没有空间了
function noSpace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;//表示有空间
			}
		}
	}
	return true;//表示没有空间
}
//用来获取数字的背景颜色
function getNumberBackgroundColor(num){
	switch( num ){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//获取数字的颜色
function getNumberColor(num){
	if(num <= 4){
		return '#776e65';
	}else{
		return '#fff';
	}
}

//判断是否能够向左移动：两种情况1.至少一个左边有一个是0；2.或者左边存在跟自己的数字是一样的
function canMoveLeft(num){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(num[i][j] != 0){
				if(num[i][j-1]==0||num[i][j-1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断水平方向上是否有障碍物
function noBlockHorizotal(row,col1,col2,nums){
	for(var m=col1+1;m<col2;m++){
		if(nums[row][m] != 0){
			return false;
		}
	}
	return true;
}

//判断能否向右移动：两种情况1.至少一个右边有一个是0；2.或者右边存在跟自己的数字是一样的
function canMoveRight(num){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(num[i][j] != 0){
				if(num[i][j+1]==0||num[i][j+1]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断垂直方向上是否有障碍物
function noBlockVertical(row1,row2,col,nums){
	for(var m=row1+1;m<row2;m++){
		if(nums[m][col] != 0){
			return false;
		}
	}
	return true;
}

//判断是否能够向做向上移动：两种情况1.至少一个上边有一个是0；2.或者上边存在跟自己的数字是一样的
function canMoveTop(num){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(num[i][j] != 0){
				if(num[i-1][j]==0||num[i-1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断能否向下移动：两种情况1.至少一个下边有一个是0；2.或者下边存在跟自己的数字是一样的
function canMoveBottom(num){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(num[i][j] != 0){
				if(num[i+1][j]==0||num[i+1][j]==num[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}