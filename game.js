

let config = {
    type: Phaser.AUTO,
    parent: 'game-container',
   
    scale: {
    mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
       
         width : 1860,
         height :860,
         fullscreenTarget: 'game-container',
         
    },
    backgroundColor: '#ABB2B8',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1200 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

function preload() {

    this.load.image("tree","asste/tree.png");
    this.load.image("ston","asste/ston.png");
    this.load.image("dasbin","asste/dasbin.png")
    this.load.image("backround","asste/backround.png");
    this.load.image("ground", "asste/soli.png");
    this.load.spritesheet("hero", "asste/hero.png", {
        frameHeight: 400,
        frameWidth: 400
    });
}

let control, player;
let lastTapTime = 0;
let tapCount = 0; 
let lastJumpTime = 0;
let jumpCount = 0;
function create() {
    this.physics.world.createDebugGraphic();

    let scaleFactor = Math.min(
    this.scale.width/1860 ,
    this.scale.height/860
);


  const bgWidth = 1560;
    const bgHeight = 1050;
    const repeatCount = Math.ceil(3000 / bgWidth) + 9; // যতক্ষণ দরকার repeat করুন

    for (let i = 0; i < repeatCount; i++) {
        const backround = this.add.image(bgWidth * i-1500, 0, 'backround').setOrigin(0, 0);
        backround.setDisplaySize(bgWidth, bgHeight);
        backround.setDepth(-1); // সব কিছুর পিছনে রাখুন
    }


    
    const test = this.physics.add.staticGroup();
    const grounds = [
        //1st ground
        { x: -300, y: 950, width: 2000, height: 850, offsetX: -48, offsetY: 2, sizeW: 1270, sizeH: 150 },
        //2nd ground
        { x: 1100, y: 900, width: 1500, height: 350, offsetX: -50, offsetY: 0, sizeW: 955, sizeH: 65 },
        //3rd ground
        { x: 2380, y: 900, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 945, sizeH: 65 },
        //4th ground
        { x: 3600, y: 850, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 950, sizeH: 65 },
        //5th ground
        { x: 4800, y: 800, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 955, sizeH: 65 },
        //6th ground
        { x: 5900, y: 850, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 955, sizeH: 65 },
        //7th ground
        { x: 7000, y: 900, width: 1500, height: 350, offsetX: -48, offsetY: 2, sizeW: 955, sizeH: 65 },
        //8th ground
        { x: 8200, y: 950, width: 1500, height: 350, offsetX: -48, offsetY: 2, sizeW: 955, sizeH: 65 },
        //9th ground
        { x: 9400, y: 900, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 955, sizeH: 65 },
        //10th ground
        { x: 10600, y: 850, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 950, sizeH: 65 },
        //11th ground
        { x: 11800, y: 800, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 955, sizeH: 65 },
        //12th ground
        { x: 12900, y: 850, width: 1500, height: 350, offsetX: -40, offsetY: 0, sizeW: 955, sizeH: 65 },
        //13th ground
        { x: 14000, y: 900, width: 1500, height: 350, offsetX: -48, offsetY: 2, sizeW: 955, sizeH: 65 },
    ];



    grounds.forEach(g => {
        const ground = test.create(g.x * scaleFactor, g.y * scaleFactor, 'ground');
        ground.setDisplaySize(g.width * scaleFactor, g.height * scaleFactor);
         ground.setOffset(g.offsetX * scaleFactor, g.offsetY * scaleFactor);
        ground.refreshBody();
        ground.setSize(g.sizeW * scaleFactor, g.sizeH * scaleFactor); 
       
    });



    const animis = this.physics.add.staticGroup();
    const animsgroup = [
        //1st anime
        { x: 1140, y: 770, key: "dasbin", width: 250, height: 250, offsetX: -19, offsetY: 0, sizeW: 100, sizeH: 180 },
        //2nd anime
        { x: 2300, y: 800, key: 'ston', width: 150, height: 150, offsetX: 5, offsetY: 0, sizeW: 120, sizeH: 105 },
        //3rd anime
        { x: 3200, y: 730, key: 'tree', width: 350, height: 300, offsetX: 0, offsetY: 0, sizeW: 100, sizeH: 180 },
        //4th anime
        { x: 4700, y: 720, key: 'ston', width: 150, height: 150, offsetX: 5, offsetY: 0, sizeW: 120, sizeH: 105 },
        //5th anime
        { x: 5200, y: 720, key: 'ston', width: 150, height: 150, offsetX: 5, offsetY: 0, sizeW: 120, sizeH: 105 },
        //6th anime
       { x: 7000, y: 780, key: 'tree', width: 350, height: 300, offsetX: 0, offsetY: 0, sizeW: 100, sizeH: 180 },
       //7th anime
        { x: 9500, y: 780, key: 'dasbin', width: 250, height: 250, offsetX: -19, offsetY: 0, sizeW: 100, sizeH: 180 },
        //8th anime
        { x: 11000, y: 730, key: 'tree', width: 350, height: 300, offsetX: 0, offsetY: 0, sizeW: 100, sizeH: 180 },
        //9th anime
        { x: 12700, y: 720, key: 'dasbin', width: 250, height: 250, offsetX: -19, offsetY: 0, sizeW: 100, sizeH: 180 },
        //10th anime
        { x: 13200, y: 720, key: 'dasbin', width: 250, height: 250, offsetX: -19, offsetY: 0, sizeW: 100, sizeH: 180 },
        //11th anime
        { x: 12000, y: 710, key: 'ston', width: 150, height: 150, offsetX: 5, offsetY: 0, sizeW: 120, sizeH: 105 },
    ]
    animsgroup.forEach(a => {
        const ani = animis.create(a.x * scaleFactor, a.y * scaleFactor, a.key);
        ani.setDisplaySize(a.width * scaleFactor, a.height * scaleFactor);
        ani.setOffset(a.offsetX * scaleFactor, a.offsetY * scaleFactor);
        ani.refreshBody();
        ani.setSize(a.sizeW * scaleFactor, a.sizeH * scaleFactor); 
    });


    player = this.physics.add.sprite(-500*scaleFactor, 600*scaleFactor, 'hero');
    player.setDisplaySize(300* scaleFactor,300* scaleFactor);
    player.setSize(100* scaleFactor, 100* scaleFactor);
    player.setOffset(170* scaleFactor, 150* scaleFactor);
    player.canDoubleJump = true;
    
 
    this.physics.add.collider(player, animis);
    this.physics.add.collider(player, test);

  this.input.on("pointerdown", () => {
        const currentTime = Date.now();
        
        if (currentTime - lastTapTime < 900) { // 300ms এর মধ্যে দুইবার tap
            tapCount = 2;
        } else {
            tapCount = 1;
        }
        lastTapTime = currentTime;

        // Double jump
        if (tapCount === 2 && player.canDoubleJump) {
            player.setVelocityY(-800);
            player.canDoubleJump = false;
            tapCount = 0;
        } 
        // Single jump
        else if (tapCount === 1 && player.body.touching.down) {
            player.setVelocityY(-800);
            player.canDoubleJump = true;
        }
    });

    this.cameras.main.startFollow(player, true, 1, 0);
    control = this.input.keyboard.createCursorKeys();
}



function update() {
    // Movement control
    if (control.left.isDown) {
        player.setVelocityX(-360);
    } else if (control.right.isDown) {
        player.setVelocityX(300);
    } else {
        player.setVelocityX(380);
    }

    // Keyboard double jump
    if (control.up.isDown && player.body.touching.down) {
        player.setVelocityY(-800);
        player.canDoubleJump = true;
        
        
    } 

    // Ground touch করলে double jump reset
    if (player.body.touching.down) {
        player.canDoubleJump = true;
        jumpCount = 0;
    }
}
 