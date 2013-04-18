sprite = new Image();
sprite.src = "assets/frogger_sprites.png";
jump = new Audio("assets/jump_sound.wav");
dead = new Audio("assets/dead_frog.wav");
level_up = new Audio("assets/level_up.wav");
var lives, level, score, highscore;

function start_game() {
  canvas = document.getElementById("game");
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    arrow_keys();
    
    highscore=0;
    levelup_limit = 10000;
    
 	initialize_values();
 	min_y = frog_y;
    setInterval(gameLoop, 33.33333);
  }
  else {
    alert('Sorry, canvas is not supported on your browser!');
  }
}

function initialize_values(){
    lives=3;
  	level=1;
  	score=0;
  	
  	x1 = 10;
  	y1 = 365;
  	
  	initial_logs();
	initial_cars();
	initial_speeds();
 	
  	frog_x = 186;
  	frog_y = 483;
  	counter = 0;
  	time = 60;
  	
  	levelup_limit = 10000;

    hide_tree1 = true; hide_tree2 = true; hide_tree3 = true;
    
    home1 = false; home2 = false; home3 = false; home4 = false; home5 = false;
}

function gameLoop() {
	counter++;
	draw_canvas();
	update();
	check_collisions();
	check_end();
}

function draw_canvas() {
	ctx.fillStyle = "#191970";
    ctx.fillRect(0,0,400,282.5);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,282.5,400,282.5);
    ctx.drawImage(sprite,0,0,340,45,0,0,340,45); // frogger header
    ctx.drawImage(sprite,0,45,399,65,0,45,399,65); // green thing
    ctx.drawImage(sprite,0,110,399,38,0,273,399,38); // first pink
    ctx.drawImage(sprite,0,110,399,38,0,475,399,38); // second pink
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "rgb(40,255,0)";
    ctx.fillText("Level", 63, 536);
    ctx.font = "bold 18px Arial";
    ctx.fillText("Score:", 0, 560);
    ctx.fillText("Highscore:", 130, 560);
    ctx.fillText("Time:", 300, 560);
    for(i=0;i<lives-1;i++) {
    	ctx.drawImage(sprite,12,330,21,26,i*21,513,21,26);
  	}
  	home_frogs();
  	displayLevel();
  	displayScore();
 	displayHighscore();
 	displayTime();
}	

function update() {
	if (score >= levelup_limit){
		if(lives<3){
			lives++;
		}
		levelup_limit+=10000;
	}
	handle_time();
	draw_logs();
  	restart_logs();
  	draw_cars();
  	restart_cars();
  	drawFrog();
}

function check_collisions(){
	check_logs();
	check_cars();
}


function displayLevel() {
  ctx.font = "bold 25px Arial";
  ctx.fillText(level.toString(), 135, 536);
}
function displayScore() {
  ctx.font = "bold 18px Arial";
  ctx.fillText(score.toString(), 60, 560);
}
function displayHighscore() {
	ctx.font = "bold 18px Arial";
	ctx.fillText(highscore.toString(), 230, 560);
}
function displayTime() {
	ctx.font = "bold 18px Arial";
	ctx.fillText(time.toString(), 350, 560);
}

function handle_time() {
	if (counter%30 == 0){
		time--;
		if (time == 0)
			frog_dies();
	}
}

function drawFrog() {
	ctx.drawImage(sprite,x1,y1,25,25,frog_x,frog_y,25,25); 
}

function draw_logs() {
	//first row
	ctx.drawImage(sprite,3,191,121,27,log1_pos,245,121,27); 
	log1_pos-=log_speed1;
	ctx.drawImage(sprite,3,191,121,27,log2_pos,245,121,27); 
	log2_pos-=log_speed1;
	if(hide_tree1) {
		ctx.drawImage(sprite,3,191,121,27,log3_pos,245,121,27); 
		log3_pos-=log_speed1;
	}
	ctx.drawImage(sprite,3,191,121,27,log4_pos,245,121,27); 
	log4_pos-=log_speed1;
	ctx.drawImage(sprite,3,191,121,27,log5_pos,245,121,27); 
	log5_pos-=log_speed1;
	
	//second row
	ctx.drawImage(sprite,3,227,90,27,log6_pos,215,90,27);  
	log6_pos+=log_speed2;
	ctx.drawImage(sprite,3,227,90,27,log7_pos,215,90,27);  
	log7_pos+=log_speed2;
	ctx.drawImage(sprite,3,227,90,27,log8_pos,215,90,27);  
	log8_pos+=log_speed2;
	
	//third row
	ctx.drawImage(sprite,3,160,182,27,log9_pos,178,182,27); 
	log9_pos+=log_speed3;
	ctx.drawImage(sprite,3,160,182,27,log10_pos,178,182,27); 
	log10_pos+=log_speed3;
	ctx.drawImage(sprite,3,160,182,27,log11_pos,178,182,27); 
	log11_pos+=log_speed3;
	
	//fourth row
	ctx.drawImage(sprite,3,227,90,27,log12_pos,147,90,27);  
	log12_pos-=log_speed4;
	ctx.drawImage(sprite,3,227,90,27,log13_pos,147,90,27);  
	log13_pos-=log_speed4;
	if(hide_tree2){
		ctx.drawImage(sprite,3,227,90,27,log14_pos,147,90,27);  
		log14_pos-=log_speed4;
	}
	ctx.drawImage(sprite,3,227,90,27,log15_pos,147,90,27);  
	log15_pos-=log_speed4;
	
	//fifth row
	ctx.drawImage(sprite,3,191,121,27,log16_pos,111,121,27); 
	log16_pos+=log_speed5;
	if(hide_tree3){
		ctx.drawImage(sprite,3,191,121,27,log17_pos,111,121,27); 
		log17_pos+=log_speed5;
	}
	ctx.drawImage(sprite,3,191,121,27,log18_pos,111,121,27); 
	log18_pos+=log_speed5;
	
}

function restart_logs(){
	if(log1_pos <= -200) 
		log1_pos = 610;
	if(log2_pos <= -200) 
		log2_pos = 610;
	if(log3_pos <= -200) 
		log3_pos = 610;
	if(log4_pos <= -200) 
		log4_pos = 610;
	if(log5_pos <= -200) 
		log5_pos = 610;
		
	if(log6_pos >= 400) 
		log6_pos = -100;
	if(log7_pos >= 400) 
		log7_pos = -100;
	if(log8_pos >= 400) 
		log8_pos = -100;
		
	if(log9_pos >= 453) 
		log9_pos = -333;
	if(log10_pos >= 453) 
		log10_pos = -333;
	if(log11_pos >= 453) 
		log11_pos = -333;
		
	if(log12_pos <= -200) 
		log12_pos = 660;
	if(log13_pos <= -200) 
		log13_pos = 660;
	if(log14_pos <= -200) 
		log14_pos = 660;
	if(log15_pos <= -200)
		log15_pos = 660;
		
	if(log16_pos >= 400)
		log16_pos = -140;
	if(log17_pos >= 400)
		log17_pos = -140;
	if(log18_pos >= 400)
		log18_pos = -140;	
}

function draw_cars() {
	//first row
	ctx.drawImage(sprite,78,262,31,31,car1_pos,449,31,31); 
		car1_pos-=car_speed1;
	ctx.drawImage(sprite,78,262,31,31,car2_pos,449,31,31);
		car2_pos-=car_speed1;
	ctx.drawImage(sprite,78,262,31,31,car3_pos,449,31,31);
		car3_pos-=car_speed1;
		
	//second row	
	ctx.drawImage(sprite,10,300,31,31,car4_pos,415,31,31);
		car4_pos+=car_speed2;
	ctx.drawImage(sprite,10,300,31,31,car5_pos,415,31,31);
		car5_pos+=car_speed2;
	ctx.drawImage(sprite,10,300,31,31,car6_pos,415,31,31);
		car6_pos+=car_speed2;
	
	//third row	
	ctx.drawImage(sprite,10,265,31,31,car7_pos,381,31,31);
		car7_pos-=car_speed3;
	ctx.drawImage(sprite,10,265,31,31,car8_pos,381,31,31);
		car8_pos-=car_speed3;
	ctx.drawImage(sprite,10,265,31,31,car9_pos,381,31,31);
		car9_pos-=car_speed3;
	
	//fourth row	
	ctx.drawImage(sprite,45,265,31,31,car10_pos,347,31,31);
		car10_pos+=car_speed4;
	ctx.drawImage(sprite,45,265,31,31,car11_pos,347,31,31);
		car11_pos+=car_speed4;
	ctx.drawImage(sprite,45,265,31,31,car12_pos,347,31,31);
		car12_pos+=car_speed4;
		
	//fifth row
	ctx.drawImage(sprite,103,300,53,23,car13_pos,313,53,23); 
		car13_pos-=car_speed5;
	ctx.drawImage(sprite,103,300,53,23,car14_pos,313,53,23);
		car14_pos-=car_speed5;
}

function restart_cars(){
	if(car1_pos <= -30) 
		car1_pos = 450;
	if(car2_pos <= -30) 
		car2_pos = 450;
	if(car3_pos <= -30) 
		car3_pos = 450;
		
	if(car4_pos >= 450) 
		car4_pos = -30;
	if(car5_pos >= 450) 
		car5_pos = -30;
	if(car6_pos >= 450) 
		car6_pos = -30;
		
	if(car7_pos <= -30) 
		car7_pos = 450;
	if(car8_pos <= -30) 
		car8_pos = 450;
	if(car9_pos <= -30) 
		car9_pos = 450;
		
	if(car10_pos >= 450) 
		car10_pos = -30;
	if(car11_pos >= 450) 
		car11_pos = -30;
	if(car12_pos >= 450) 
		car12_pos = -30;
		
	if(car13_pos <= -50) 
		car13_pos = 430;
	if(car14_pos <= -50) 
		car14_pos = 430;

}

function check_logs() {
	if(frog_y==245){
		if(((frog_x+10>=log1_pos)&&(frog_x<=log1_pos+110))||((frog_x+10>=log2_pos)&&(frog_x<=log2_pos+110))||((frog_x+10>=log3_pos)&&(frog_x<=log3_pos+110))||((frog_x+10>=log4_pos)&&(frog_x<=log4_pos+110))||((frog_x+10>=log5_pos)&&(frog_x<=log5_pos+110))){
		
			if(frog_x>-5)
				frog_x-=log_speed1;
			else
				frog_dies();
		}
		else
			frog_dies();
	}
	else if(frog_y==211){
		if(((frog_x+10>=log6_pos)&&(frog_x<=log6_pos+80))||((frog_x+10>=log7_pos)&&(frog_x<=log7_pos+80))||((frog_x+10>=log8_pos)&&(frog_x<=log8_pos+80))){
		
			if(frog_x<370)
				frog_x+=log_speed2;
			else
				frog_dies();
		}
		else
			frog_dies();
	}

	else if(frog_y==177){
		if(((frog_x+10>=log9_pos)&&(frog_x<=log9_pos+170))||((frog_x+10>=log10_pos)&&(frog_x<=log10_pos+170))||((frog_x+10>=log11_pos)&&(frog_x<=log11_pos+170))){
			if(frog_x<370)
				frog_x+=log_speed3;
			else
				frog_dies();
		}	
		else
			frog_dies();
	}

	else if(frog_y==143){
		if(((frog_x+10>=log12_pos)&&(frog_x<=log12_pos+80))||((frog_x+10>=log13_pos)&&(frog_x<=log13_pos+80))||((frog_x+10>=log14_pos)&&(frog_x<=log14_pos+80))||((frog_x+10>=log15_pos)&&(frog_x<=log15_pos+80))){
		
		if(frog_x>-5)
			frog_x-=log_speed4;
		else
			frog_dies();

		}
		else
			frog_dies();
	}

	else if(frog_y==109){
		if(((frog_x+10>=log16_pos)&&(frog_x<=log16_pos+110))||((frog_x+10>=log17_pos)&&(frog_x<=log17_pos+110))||((frog_x+10>=log18_pos)&&(frog_x<=log18_pos+110))){
		
			if(frog_x<370)
				frog_x+=log_speed5;
			else
				frog_dies();
		}
		else
			frog_dies();
	}
}

function check_cars() {
	if(frog_y==449){
		if(((frog_x+12>=car1_pos)&&(frog_x<=car1_pos+18))||((frog_x+12>=car2_pos)&&(frog_x<=car2_pos+18))||((frog_x+12>=car3_pos)&&(frog_x<=car3_pos+18)))
				frog_dies();
	}
	if(frog_y==415) {
		if(((frog_x+12>=car4_pos)&&(frog_x<=car4_pos+18))||((frog_x+12>=car5_pos)&&(frog_x<=car5_pos+18))||((frog_x+12>=car6_pos)&&(frog_x<=car6_pos+18)))
				frog_dies();
	}
	if(frog_y==381) {
		if(((frog_x+12>=car7_pos)&&(frog_x<=car7_pos+18))||((frog_x+12>=car8_pos)&&(frog_x<=car8_pos+18))||((frog_x+12>=car9_pos)&&(frog_x<=car9_pos+18)))
				frog_dies();
	}
	if(frog_y==347) {
		if(((frog_x+12>=car10_pos)&&(frog_x<=car10_pos+18))||((frog_x+12>=car11_pos)&&(frog_x<=car11_pos+18))||((frog_x+12>=car12_pos)&&(frog_x<=car12_pos+18)))
				frog_dies();
	}
	if(frog_y==313) {
		if(((frog_x+12>=car13_pos)&&(frog_x<=car13_pos+35))||((frog_x+12>=car14_pos)&&(frog_x<=car14_pos+35)))
				frog_dies();
	}
}



function check_end() {
	if(frog_y==75) {
		if((frog_x > 8) && (frog_x < 47) && (home1==false)) {
			home1 = true;
			score+=50;
			score = score + (time*10);
			restartFrog();
		} 
		else if((frog_x > 88) && (frog_x < 137) && (home2==false)) {
			home2 = true;
			score+=50;
			score = score + (time*10);
			restartFrog();
		} 
		else if((frog_x > 173) && (frog_x < 222) && (home3==false)) {
			home3 = true;
			score+=50;
			score = score + (time*10);
			restartFrog();
		} 
		else if((frog_x > 258) && (frog_x < 307) && (home4==false)) {
			home4 = true;
			score+=50;
			score = score + (time*10);
			restartFrog();
		} 
		else if((frog_x > 343) && (frog_x < 392) && (home5==false)) {
			home5 = true;
			score+=50;
			score = score + (time*10);
			restartFrog();
		} 
		else
			frog_dies();
	}
	check_levelup()
}

function check_levelup(){
	if(home1 == true && home2==true && home3==true && home4==true && home5==true) {
		level_up.play();
		score+=1000;
		level = level+1;
		home1 = home2 = home3 = home4 = home5 = false;
		increase_difficulty();
	}
}

function home_frogs() {
	if(home1 == true)
		ctx.drawImage(sprite,80,365,25,25,15,75,25,25);
	if(home2 == true)
		ctx.drawImage(sprite,80,365,25,25,100,75,25,25);
	if(home3 == true)
		ctx.drawImage(sprite,80,365,25,25,185,75,25,25);
	if(home4 == true)
		ctx.drawImage(sprite,80,365,25,25,270,75,25,25);
	if(home5 == true)
		ctx.drawImage(sprite,80,365,25,25,355,75,25,25); 
}

function increase_difficulty(){
	if (level % 2 == 0) {
		car_speed4 = 10;
	}
	if (level % 3 == 0) {
		hide_tree1 = false;
		log3_pos = -400
		
	}
	if(level % 4 == 0) {
		car_speed2 = 10;
	}
	if(level > 3) {
		log_speed1++;
		log_speed2+=.5
		log_speed3++;
		log_speed4+=.5
		log_speed5++;
	}
	if(level % 5 == 0) {
		hide_tree2 = false;
		log14_pos = -400;
	}
	if(level % 6 == 0) {
		hide_tree3 = false;
		log17_pos = -400;
	}
	else{
		car_speed1++;
		car_speed3++;
		car_speed5++;
	}
		
}

function initial_speeds(){
	car_speed1 = 1;
	car_speed2 = 1;
	car_speed3 = 2;
	car_speed4 = 1;
	car_speed5 = 2;
	
	log_speed1 = 2;
	log_speed2 = 1;
	log_speed3 = 3;
	log_speed4 = 2;
	log_speed5 = 2;
}

function initial_logs() {
 	log1_pos = 0; log2_pos = 150; log3_pos = 300; log4_pos = 450; log5_pos = 600;
	log6_pos = 0; log7_pos = 160; log8_pos = 320; 
	log9_pos = 0; log10_pos = 225; log11_pos = 450;
	log12_pos = 0; log13_pos = 160; log14_pos = 320; log15_pos = 480; 
	log16_pos = 0; log17_pos = 150; log18_pos = 300;
}

function initial_cars() {
	car1_pos = 0; car2_pos = 126; car3_pos = 252;
	car4_pos = 0; car5_pos = 126; car6_pos = 252;
	car7_pos = 0; car8_pos = 126; car9_pos = 252;
	car10_pos = 60; car11_pos = 180; car12_pos = 300;
	car13_pos = 300; car14_pos = 140; 
}

function frog_dies() {
	dead.play();
	lives--;
	restartFrog();
	if (lives == 0) 
		game_over();
}

function restartFrog() {
   	x1 = 10;
   	y1 = 360;
   	time = 60;	
	frog_x = 186;
	frog_y = 483;
	min_y = frog_y;	
}

function game_over() {
    if (score > highscore)
    	highscore = score;
    var name = prompt("Please enter your username");
    var output = {'game_title': "pacman", 'username': name, 'score': score};
    console.log(output);
    $.post("http://rocky-coast-4695.herokuapp.com/submit.json", output);
    initialize_values();
    home1 = false;
    home2 = false;
    home3 = false;
    home4 = false;
    home5 = false;
    hide_tree1 = true; hide_tree2 = true; hide_tree3 = true;
    score = 0;
    level = 1;
    lives = 3;
}

function arrow_keys() {
	document.addEventListener("keydown", function(event) {
    	if (event.keyCode == 37) {
    		if(frog_x > 0) {
      			jump.play();
      			frog_x -= 28; //left arrow
      			x1 = 80;
      			y1 = 332;
      		}
   		}
   		if (event.keyCode == 38) {
   			jump.play();
   			frog_y -= 34; //up arrow
   			event.preventDefault();
   			if(min_y > frog_y) {
   				min_y = frog_y;
   				score+=10;
   			}
   			x1 = 10;
   			y1 = 360;

   		}
   		if (event.keyCode == 39) {
   			jump.play();
   			if(frog_x < 372) {
   				frog_x += 28; //right arrow
   				x1 = 10;
   				y1 = 332;
   				jump.play();
   			}		
   		}
   		if (event.keyCode == 40) {
   			event.preventDefault();
   			if(frog_y < 483) {
   	   			jump.play();
   				frog_y += 34; //down arrow
   				x1 = 80;
   				y1 = 365;
      			jump.play();
   			}
   		}
  });
}