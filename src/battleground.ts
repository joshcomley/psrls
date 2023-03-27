export class Battleground {
    public static Run(): void {
        const warriors = new Array<any>();
        const warriorSize = 60;
        let warrior = null;
        let battle: any = null;
        let x = 0;
        let y = 0;
        const num = 30;
        const battleground = document.getElementById("battleground")!;
        const battlegroundWidth = battleground.offsetWidth - warriorSize * 2 - 5;
        const battlegroundHeight = battleground.offsetHeight - warriorSize * 2 - 5;

        function generateWarriors(num: number) {
            for (let i = 0; i < num; i++) {
                warrior = document.createElement("div");
                if (i % 3 == 1) {
                    warrior.className = "rock";
                } else if (i % 3 == 2) {
                    warrior.className = "paper";
                } else {
                    warrior.className = "scissor";
                }
                warrior.style.height = `${warriorSize}px`;
                warrior.style.width = `${warriorSize}px`;
                setStartingPosition(i);
                for (let j = 0; j < i; j++) {
                    const newWarrior = warriors[i];
                    const existingWarrior = warriors[j];
                    checkStartingPositions(newWarrior, existingWarrior, i);
                }
                warrior.style.left = `${x}px`;
                warrior.style.top = `${y}px`;
                battleground.appendChild(warrior);
            }
        }
        function setStartingPosition(i: number) {
            x = Math.floor(Math.random() * battlegroundWidth);
            y = Math.floor(Math.random() * battlegroundHeight);
            warriors[i] = { Left: x, Right: x + warriorSize, Top: y, Bottom: y + warriorSize };
        }
        function checkStartingPositions(newWarrior: any, existingWarrior: any, i: number) {
            if ((newWarrior.Left > existingWarrior.Left && newWarrior.Left < existingWarrior.Right) || (newWarrior.Right > existingWarrior.Left && newWarrior.Right < existingWarrior.Right)) {
                if ((newWarrior.Top > existingWarrior.Top && newWarrior.Top < existingWarrior.Bottom) || (newWarrior.Bottom > existingWarrior.Top && newWarrior.Bottom < existingWarrior.Bottom)) {
                    x += warriorSize + 5;
                    y += warriorSize + 5;
                    warriors[i] = { Left: x, Right: x + warriorSize, Top: y, Bottom: y + warriorSize };
                }
            }
        }
        function checkNewPositions(newWarrior: any, existingWarrior: any) {
            const l1 = newWarrior.getBoundingClientRect().left;
            const r1 = newWarrior.getBoundingClientRect().right;
            const t1 = newWarrior.getBoundingClientRect().top;
            const b1 = newWarrior.getBoundingClientRect().bottom;
            const l2 = existingWarrior.getBoundingClientRect().left;
            const r2 = existingWarrior.getBoundingClientRect().right;
            const t2 = existingWarrior.getBoundingClientRect().top;
            const b2 = existingWarrior.getBoundingClientRect().bottom;
            if (l1 >= l2 && l1 <= r2) {
                if (t1 >= t2 && t1 <= b2) {
                    duel(newWarrior, existingWarrior);
                }
                if (b1 >= b2 && b1 <= t2) {
                    duel(newWarrior, existingWarrior);
                }
            }
            if (r1 <= r2 && r1 >= l2) {
                if (t1 >= t2 && t1 <= b2) {
                    duel(newWarrior, existingWarrior);
                }
                if (b1 >= b2 && b1 <= t2) {
                    duel(newWarrior, existingWarrior);
                }
            }
        }
        function duel(newWarrior: any, existingWarrior: any) {
            if (newWarrior.className == "rock") {
                if (existingWarrior.className == "paper") {
                    newWarrior.className = "paper";
                } else if (existingWarrior.className == "scissor") {
                    existingWarrior.className = "rock";
                }
            } else if (newWarrior.className == "paper") {
                if (existingWarrior.className == "scissor") {
                    newWarrior.className = "scissor";
                } else if (existingWarrior.className == "rock") {
                    existingWarrior.className = "paper";
                }
            } else if (newWarrior.className == "scissor") {
                if (existingWarrior.className == "rock") {
                    newWarrior.className = "rock";
                } else if (existingWarrior.className == "paper") {
                    existingWarrior.className = "scissor";
                }
            }
        }
        generateWarriors(num);
        function moveRock() {
            battle = battleground.querySelectorAll("div");
            for (let i = 0; i < battle.length; i++) {
                let moveX = Math.random() < 0.5 ? -1 : 1;
                let moveY = Math.random() < 0.5 ? -1 : 1;
                let changeX = false;
                let changeY = false;
                let adjustX = 0;
                let adjustY = 0
                window.setInterval(function () {
                    if (moveX !== 0) {
                        changeX = Math.random() < 0.01 ? true : false;
                        if (changeX == true) {
                            if (moveX == -1) {
                                adjustX = 1;
                            } else {
                                adjustX = -1;
                            }
                        }
                        moveX += adjustX;
                    } else {
                        moveX += adjustX;
                        adjustX = 0;
                    }
                    if (moveY !== 0 && changeX == false) {
                        changeY = Math.random() < 0.01 ? true : false;
                        if (changeY == true) {
                            if (moveY == -1) {
                                adjustY = 1;
                            } else {
                                adjustY = -1;
                            }
                        }
                        moveY += adjustY;
                    } else {
                        moveY += adjustY;
                        adjustY = 0;
                    }

                    x = parseInt(battle[i].style.left);
                    x += moveX;
                    if (x == 0) {
                        moveX = 1;
                        adjustX = 0;
                    }
                    if (x == battlegroundWidth) {
                        moveX = -1;
                        adjustX = 0;
                    }
                    y = parseInt(battle[i].style.top);
                    y += moveY;
                    if (y == 0) {
                        moveY = 1;
                        adjustY = 0;
                    }
                    if (y == battlegroundHeight) {
                        moveY = -1;
                        adjustY = 0;
                    }
                    for (let j = 0; j < i; j++) {
                        checkNewPositions(battle[i], battle[j]);
                    }
                    battle[i].style.left = `${x}px`;
                    battle[i].style.top = `${y}px`;
                }, 5)
            }
        }
        moveRock();
    }
}