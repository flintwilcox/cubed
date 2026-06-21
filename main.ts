namespace SpriteKind {
    export const enemy2 = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const enemy3 = SpriteKind.create()
    export const bossH1 = SpriteKind.create()
    export const bossHead = SpriteKind.create()
    export const bossH2 = SpriteKind.create()
}
function enemyColission (colider1: Sprite, colider2: Sprite) {
    if (mySprite.x < colider1.x && mySprite.x < colider2.x) {
        if (colider2.x < colider1.x) {
            colider1.follow(mySprite, 0)
        } else {
            colider2.follow(mySprite, 0)
        }
    } else {
        if (colider2.x > colider1.x) {
            colider1.follow(mySprite, 0)
        } else {
            colider2.follow(mySprite, 0)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bossH2, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "boss")
})
function bossStateMachiene () {
    if (bossAttackCooldown > 0) {
        bossAttackCooldown += -1
    }
    if (bossState == "idle" && bossAttackCooldown <= 0) {
        attack = randint(1, 3)
        if (attack == 1) {
            bossState = "left hand moving"
        } else if (attack == 2) {
            bossState = "right hand moving"
        } else {
            bossState = "lower"
        }
        bossAttackCooldown = 60
    }
    // LEFT HAND
    // RIGHT HAND
    // SWIPE ATTACK
    if (bossState == "left hand moving") {
        if (Math.abs(bossHand1.x - mySprite.x) < 2) {
            bossState = "left hand hover"
            leftHoverTimer = 20
        } else if (bossHand1.x < mySprite.x) {
            bossHand1.x += 1
        } else {
            bossHand1.x -= 1
        }
    } else if (bossState == "left hand hover") {
        if (bossHand1.x < mySprite.x) {
            bossHand1.x += 1
        } else {
            bossHand1.x -= 1
        }
        leftHoverTimer += -1
        if (leftHoverTimer <= 0) {
            bossState = "left hand down"
        }
    } else if (bossState == "left hand down") {
        bossHand1.y += 6
        if (bossHand1.y >= scene.screenHeight()) {
            scene.cameraShake(4, 500)
            extraEffects.createSpreadEffectOnAnchor(bossHand1, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Smoke, ExtraEffectPresetShape.Cloud), 1000, 48, 20)
            bossState = "left hand up"
        }
    } else if (bossState == "left hand up") {
        bossHand1.y -= 4
if (bossHand1.y <= H1Y) {
            bossHand1.y = H1Y
            bossState = "left pos"
        }
    } else if (bossState == "left pos") {
        if (Math.abs(bossHand1.x - H1X) < 2) {
            bossHand1.setPosition(H1X, H1Y)
            bossState = "idle"
        } else if (bossHand1.x < H1X) {
            bossHand1.x += 1
        } else {
            bossHand1.x -= 1
        }
    } else if (bossState == "right hand moving") {
        if (Math.abs(bossHand2.x - mySprite.x) < 2) {
            bossState = "right hand hover"
            rightHoverTimer = 20
        } else if (bossHand2.x < mySprite.x) {
            bossHand2.x += 1
        } else {
            bossHand2.x -= 1
        }
    } else if (bossState == "right hand hover") {
        if (bossHand2.x < mySprite.x) {
            bossHand2.x += 1
        } else {
            bossHand2.x -= 1
        }
        rightHoverTimer += -1
        if (rightHoverTimer <= 0) {
            bossState = "right hand down"
        }
    } else if (bossState == "right hand down") {
        bossHand2.y += 6
        if (bossHand2.y >= scene.screenHeight()) {
            scene.cameraShake(4, 500)
            extraEffects.createSpreadEffectOnAnchor(bossHand2, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Smoke, ExtraEffectPresetShape.Cloud), 1000, 48, 20)
            bossState = "right hand up"
        }
    } else if (bossState == "right hand up") {
        bossHand2.y -= 4
if (bossHand2.y <= H2Y) {
            bossHand2.y = H2Y
            bossState = "right pos"
        }
    } else if (bossState == "right pos") {
        if (Math.abs(bossHand2.x - H2X) < 2) {
            bossHand2.setPosition(H2X, H2Y)
            bossState = "idle"
        } else if (bossHand2.x < H2X) {
            bossHand2.x += 1
        } else {
            bossHand2.x -= 1
        }
    } else if (bossState == "lower") {
        if (Math.abs(bossHand1.x - mySprite.x) > 2) {
            if (bossHand1.x < mySprite.x) {
                bossHand1.x += 1
            } else {
                bossHand1.x -= 1
            }
        } else {
            bossHand1.setFlag(SpriteFlag.GhostThroughWalls, true)
            bossState = "swipe_down"
        }
    } else if (bossState == "swipe_down") {
        bossHand1.y += 2
        if (bossHand1.y >= scene.screenHeight() - 20) {
            scene.cameraShake(4, 500)
            extraEffects.createSpreadEffectOnAnchor(bossHand1, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Smoke, ExtraEffectPresetShape.Cloud), 2000, 48, 20)
            if (bossHand1.x < mySprite.x) {
                bossState = "swipeR"
            } else {
                bossState = "swipeL"
            }
        }
    } else if (bossState == "swipeR") {
        bossHand1.x += 5
        if (bossHand1.x >= scene.screenWidth() + 20) {
            bossState = "reverse"
        }
    } else if (bossState == "swipeL") {
        bossHand1.x -= 5
if (bossHand1.x <= -20) {
            bossState = "reverse"
        }
    } else if (bossState == "reverse") {
        bossHand1.y -= 4
if (bossHand1.y <= H1Y) {
            bossHand1.y = H1Y
            bossState = "up"
        }
    } else if (bossState == "up") {
        if (Math.abs(bossHand1.x - H1X) > 2) {
            if (bossHand1.x > H1X) {
                bossHand1.x -= 2
            } else {
                bossHand1.x += 2
            }
        } else {
            bossHand1.setPosition(H1X, H1Y)
            bossState = "idle"
        }
    }
}
function launchSprite (_from: Sprite, sprite: Sprite, speed: number) {
    timer.background(function () {
        if (_from.x < sprite.x) {
            sprite.vx = speed
        } else {
            sprite.vx = 0 - speed
        }
        timer.after(1000, function () {
            sprite.vx = 0
        })
    })
}
function startGame () {
    info.setScore(1)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    tiles.setCurrentTilemap(tilemap`level1`)
    spawnSprites()
    inMenu = 0
    gravity = 1.8
    gravityPlayer = 500
    bulletSpeed = 50
    doubleJump = 1
    timer2 = 4
    e1Speed = 30
    e3speed = e1Speed + 10
    playerSpeed = 80
    jumpSpeed = mySprite.jumpVelocity
    upgradeList = [
    miniMenu.createMenuItem("+1 midair jump"),
    miniMenu.createMenuItem("faster movement speed"),
    miniMenu.createMenuItem("higher jump"),
    miniMenu.createMenuItem("invincibility at start")
    ]
    info.startCountdown(timer2)
    game.setDialogTextColor(1)
    game.setDialogCursor(img`
        . . . . 3 3 3 3 3 . . . . 
        . . 3 3 3 3 3 3 3 3 3 . . 
        . 3 3 3 3 3 3 3 3 3 3 3 . 
        3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 . . . 3 3 3 . . . 3 3 
        3 3 . . . 3 3 3 . . . 3 3 
        3 3 . . 3 3 . 3 3 . . 3 3 
        3 3 3 3 3 . . . 3 3 3 3 3 
        . 3 3 3 3 . 3 . 3 3 3 3 3 
        . 3 3 3 3 3 3 3 3 3 3 3 . 
        . 3 . 3 3 3 3 3 3 3 . 3 . 
        . 3 . 3 3 . . . 3 3 . 3 . 
        . 3 . . . . . . . . . 3 . 
        . 3 3 3 . . . . 3 . . 3 . 
        . 3 3 3 . 3 3 . 3 3 3 3 . 
        . . 3 3 3 3 3 3 3 3 3 . . 
        . . . . 3 3 3 3 3 . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy2, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "enemy")
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemyColission(sprite, otherSprite)
})
info.onCountdownEnd(function () {
    if (inMenu == 0) {
        inMenu = 1
        myMenu = miniMenu.createMenuFromArray(upgradeList)
        miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.ScrollIndicatorColor, 1)
        miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.BorderColor, 15)
        sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
        miniMenu.onButtonPressed(myMenu, miniMenu.Button.A, function (selection, selectedIndex) {
            fireRate += -100
            e1Speed += 5
            e3speed = e1Speed + 10
            timer2 += 2
            inMenu = 0
            if (selectedIndex == 0) {
                doubleJump += 1
                miniMenu.close(myMenu)
            }
            if (selectedIndex == 1) {
                playerSpeed += 10
                miniMenu.close(myMenu)
            }
            if (selectedIndex == 2) {
                jumpSpeed += 5
                miniMenu.close(myMenu)
            }
            if (selectedIndex == 3) {
                invincibility = 1
                miniMenu.close(myMenu)
                upgradeList.pop()
                animation.runImageAnimation(
                mySprite,
                [img`
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    4 4 4 4 4 
                    `,img`
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    `],
                700,
                true
                )
            }
            for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
                launchSprite(mySprite, value, 120)
            }
            for (let value2 of sprites.allOfKind(SpriteKind.enemy2)) {
                launchSprite(mySprite, value2, 120)
            }
            for (let value22 of sprites.allOfKind(SpriteKind.enemy3)) {
                launchSprite(mySprite, value22, 120)
            }
            info.changeScoreBy(1)
            info.startCountdown(timer2)
            if (info.score() == 4) {
                tiles.setCurrentTilemap(tilemap`level7`)
                spawnSprites()
            }
            if (info.score() == 6) {
                tiles.setCurrentTilemap(tilemap`level2`)
                spawnSprites()
            }
            if (info.score() == 10) {
                tiles.setCurrentTilemap(tilemap`level3`)
                spawnSprites()
            }
            if (info.score() == 2) {
                info.stopCountdown()
                info.startCountdown(timer2 + 8)
                tiles.setCurrentTilemap(tilemap`level4`)
                sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                sprites.destroyAllSpritesOfKind(SpriteKind.enemy2)
                sprites.destroyAllSpritesOfKind(SpriteKind.enemy3)
                sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
                spawnSprites()
                bossState = "idle"
            }
            if (info.score() >= 16) {
                sprites.destroyAllSpritesOfKind(SpriteKind.bossH1)
                sprites.destroyAllSpritesOfKind(SpriteKind.bossHead)
                sprites.destroyAllSpritesOfKind(SpriteKind.bossH2)
                if (randint(1, 2) == 1) {
                	
                } else if (randint(1, 2) == 1) {
                    tiles.setCurrentTilemap(tilemap`level2`)
                } else {
                    if (randint(1, 2) == 1) {
                        tiles.setCurrentTilemap(tilemap`level3`)
                    } else {
                        tiles.setCurrentTilemap(tilemap`level7`)
                    }
                }
                spawnSprites()
            }
        })
    }
})
sprites.onOverlap(SpriteKind.enemy3, SpriteKind.enemy3, function (sprite, otherSprite) {
    enemyColission(sprite, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "projectile")
})
function spawnSprites () {
    for (let value3 of tiles.getTilesByType(assets.tile`myTile6`)) {
        mySprite = corgio.create(SpriteKind.Player)
        mySprite.verticalMovement(true)
        mySprite.horizontalMovement(true)
        mySprite.setImage(img`
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            1 1 1 1 1 
            `)
        mySprite.z = 50
        tiles.placeOnTile(mySprite, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
    }
    for (let value4 of tiles.getTilesByType(assets.tile`myTile0`)) {
        myEnemy = sprites.create(img`
            4 4 4 4 4 
            4 3 2 2 4 
            4 2 3 2 4 
            4 2 2 3 4 
            4 3 2 2 4 
            4 3 2 3 4 
            4 2 3 2 4 
            4 2 3 3 4 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value4)
        tiles.setTileAt(value4, assets.tile`transparency16`)
    }
    for (let value5 of tiles.getTilesByType(assets.tile`myTile1`)) {
        myEnemy2 = sprites.create(img`
            4 4 4 4 4 
            4 5 5 3 4 
            4 5 5 2 4 
            4 2 2 5 4 
            4 5 2 2 4 
            4 5 2 5 4 
            4 2 5 2 4 
            4 2 5 5 4 
            4 5 5 5 4 
            4 5 5 5 4 
            `, SpriteKind.enemy2)
        tiles.placeOnTile(myEnemy2, value5)
        tiles.setTileAt(value5, assets.tile`transparency16`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`myTile2`)) {
        myEnemy3 = sprites.create(img`
            4 4 4 
            4 2 4 
            4 3 4 
            4 3 4 
            4 3 4 
            `, SpriteKind.enemy3)
        tiles.placeOnTile(myEnemy3, value6)
        tiles.setTileAt(value6, assets.tile`transparency16`)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`myTile5`)) {
        bossHead2 = sprites.create(img`
            f......................333333333333...............
            .....................3333333333333333.............
            ...................33333333333333333333...........
            .................333333333333333333333333.........
            ................33333333344444433333333333........
            ...............3333333344444444433333333333.......
            ..............333333344444444444433333333333......
            .............33333344444444444444433333333333.....
            ............3333334444444444444444333333333333....
            ............3333344444444444444443333333333333....
            ...........333334444444443444444433333344443333...
            ...........333334444444333344444333333344444333...
            ..........33333444444433333333333333333444443333..
            ..........33333444444333333333333333333344443333..
            .........3343334444333333333333333333333344433333.
            .........3443333333333333333333333333333333333333.
            .........3443333333333333333333333333333333333333.
            .........3443333333333333333333333333333333333334.
            .........4443333333333333333333333333333333333334.
            .........4443333333333333333333333333333333333344.
            .........4443333333333333333333333333333333333344.
            .........4443333333333333333333333333333333333344.
            .........4443333333333333443333433333333333333344.
            ........44443333344333333444334444444444333333344.
            ........44433344444444444444334444444444444443344.
            ........44333444444444433444334433333444444443334.
            ........443.3433333333333344344333333333333333.344
            ........443.3333.........33434333.........3333.344
            ........433.33............333333............33.334
            ........43..33............333333............33..34
            ........43..33............333333............33..34
            ........43..33.....cc....33333333...cc......33..34
            ........43..33.....cc....33333333...cc......33..34
            ........43..33..........3343334333..........33..34
            ........43..33..........3343334433..........33..34
            ........33..333......3333343..3433333......333..33
            ...........4444333333333343....3443333333333444...
            ..........44444333333344443....34444333333344443..
            ..........44444344444444433....33444444444344333..
            ..........3333443444444433...3..3344444444344333..
            ..........3333333333344433..33..3344443333343333..
            ..........3333333333334433.333..3334333333333333..
            ............3333333333343333333333443333333333....
            .............33333333333333333333333333333333.....
            .............33.33333333333333333333333333.33.....
            .............33..333333333333333333333333..33.....
            .............33..333333333333333333333333..33.....
            .............33..333333333333333333333333..33.....
            .............33....3333333333333..3333.....33.....
            .............33......3333.........33.......33.....
            .............33............................33.....
            .............33............................33.....
            .............33............................33.....
            .............33333......................33333.....
            .............33333...............33.....33333.....
            .............334333..3333........3333.3.34333.....
            .............334433333333..33..33333333444333.....
            .............333444443333..333333334444433333.....
            ..............333334444433333333444443333333......
            ...............3333334444444444444433333333.......
            ................33333344444444444333333333........
            ..................3333334444444433333333..........
            ....................333333333333333333............
            f......................333333333333...............
            `, SpriteKind.bossHead)
        tiles.placeOnTile(bossHead2, value7)
        tiles.setTileAt(value7, assets.tile`transparency16`)
    }
    for (let value8 of tiles.getTilesByType(assets.tile`myTile3`)) {
        bossHand1 = sprites.create(img`
            ....44.......................
            ..444444.....................
            .444555444..............33...
            .4445445544..44444454...3443.
            2444555444444455555544.344443
            2244555555555555555554434333.
            22455555555555555555544343334
            .245545555....544545443333334
            ..22433........344434.333333.
            ..2234443....33333333.433334.
            .44434344433344444334354433..
            .24433333333333333334453444..
            .2443333333333333333343442...
            .224433333333333333334342....
            .222244333.......44443442....
            ..24455555....4444555442.....
            ..2454445..4445555555542.....
            .44454544445555555555542.....
            .4245555555555555555422......
            .2245555555555555...544......
            ..244455555555..4555544......
            ..22445555555445555554.......
            ...22455544455555555.........
            ......44455555555............
            .....2445555555..............
            .....22444...................
            ......222....................
            `, SpriteKind.bossH1)
        tiles.placeOnTile(bossHand1, value8)
        bossHand1.z = 80
        H1X = bossHand1.x
        H1Y = bossHand1.y
        tiles.setTileAt(value8, assets.tile`transparency16`)
        bossHand1.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
    for (let value9 of tiles.getTilesByType(assets.tile`myTile4`)) {
        bossHand2 = sprites.create(img`
            .......................44....
            .....................444444..
            ...33..............444555444.
            .3443...45444444..4455445444.
            344443.4455555544444445554442
            .3334344555555555555555554422
            43334344555555555555555555422
            433333344545445....555545542.
            .333333.434443........33422..
            .433334.33333333....3444322..
            ..33445343344444333444343444.
            ..44435443333333333333333442.
            ...2443433333333333333333442.
            ....243433333333333333334422.
            ....24434444.......333442222.
            .....2445554444....55555442..
            .....2455555555444..5444542..
            .....24555555555554444545444.
            ......2245555555555555555424.
            ......445...5555555555555422.
            ......4455554..555555554442..
            .......45555554455555554422..
            .........55555555444555422...
            ............55555555444......
            ..............5555555442.....
            ...................44422.....
            ....................222......
            `, SpriteKind.bossH2)
        tiles.placeOnTile(bossHand2, value9)
        bossHand2.z = 99
        H2X = bossHand2.x
        H2Y = bossHand2.y
        tiles.setTileAt(value9, assets.tile`transparency16`)
        bossHand2.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
    if (false) {
        boss2Head = sprites.create(img`
            f......................333333333333...............
            .....................3333333333333333.............
            ...................33333333333333333333...........
            .................333333333333333333333333.........
            ................33333333344444433333333333........
            ...............3333333344444444433333333333.......
            ..............333333344444444444433333333333......
            .............33333344444444444444433333333333.....
            ............3333334444444444444444333333333333....
            ............3333344444444444444443333333333333....
            ...........333334444444444444444433333344443333...
            ...........333334444444344444444333333344444333...
            ..........33333444444433344433433333333444443333..
            ..........3333344444433334431b343333333344443333..
            .........33433344443333344431b3433333333344433333.
            .........3443333333333334431dbd343333333333333333.
            .........3443333333333334431dbd343333333333333333.
            .........344333333333334431ddbbd34333333333333334.
            .........444333333333334431ddcbd34333333333333334.
            .........44433333333335431ddbccbb3433333333333344.
            .........44433333333335533bccbbb33333333333333344.
            .........44433333333333353dbcbdb33333333333333344.
            .........444333333333333433dbdb333333333333333344.
            ........4444333334433333343dbdb344444444333333344.
            ........44433344444444444433bb3444444444444443344.
            ........44333444444444433443bb3433333444444443334.
            ........443.3433333333333343334333333333333333.344
            ........443.3333ffcccccff33434433ffcccccff3333.344
            ........433.33ffccbbbbbbcf343433fcbbbbbbccff33.334
            ........43..33ffcbbddddbbc333333cbbddddbbcff33..34
            ........43..33fccbdd11ddbc333333cbdd11ddbccf33..34
            ........43..33fccbd1111db33333333bd1111dbccf33..34
            ........43..33fccbd1111db33333333bd1111dbccf33..34
            ........43..33fccbdd11dd3343334333dd11ddbccf33..34
            ........43..33ffcbbddddb3343334433bddddbbcff33..34
            ........33..333ffcbbb3333343dd3433333bbbcff333..33
            ...........4444333333333343b11b3443333333333444...
            ..........44444333333344443d11d34444333333344443..
            ..........44444344444444433d1dd33444444444344333..
            ..........3333443444444433b1d31b3344444444344333..
            ..........3333333333344433bd33bd3344443333343333..
            ..........3333333333334433c333cb3334333333333333..
            ............3333333333343333333333443333333333....
            .............33333333333333333333333333333333.....
            .............33f34333333333333333333333333f33.....
            .............33ff434333333333333333333343ff33.....
            .............33ff444333343343344334334344ff33.....
            .............33ff334434443344344334434433ff33.....
            .............33ff3f3334443333333db3433fffff33.....
            .............33ffffff3333dd3313ddd33cffffff33.....
            .............33fffffcc33dd131111dd3cccfffff33.....
            .............33ff3ffccc3dd111111ddbcccfffff33.....
            .............33f33ffcccbdd111111ddbcccfff3f33.....
            .............33334f3fccbbdd1111dd3bcccff33333.....
            .............33344f3fc3cbdddddddd43c3fff34333.....
            .............3343344f3343bdd3dd3b4333f3f34333.....
            .............334433433443cb33bb43443434444333.....
            .............333444443333cc343344334444433333.....
            ..............333334444433344333444443333333......
            ...............3333334444444444444433333333.......
            ................33333344444444444333333333........
            ..................3333334444444433333333..........
            ....................333333333333333333............
            f......................333333333333...............
            `, SpriteKind.bossHead)
    }
    if (false) {
        boss2Head = sprites.create(img`
            f.................................................
            ..................................................
            ..................................................
            ..................................................
            .........................445c54...................
            .......................444445c55c.................
            .....................44444455ccc45................
            ...................4444444555c44555...............
            ..................4444445555cc55455...............
            .................44444455555c45455................
            ................4444455555ccc5555......5444.......
            ................444455555c55c355.......54445......
            ...............54445555..c533c5........53345......
            ...............555555....5331b34........5555......
            ...........43..5555.....44331b34.........555...3..
            ..........4433..........4331dbd34..............3..
            ..........4433..........4331dbbc4..............3..
            ..........4433.........433dbdbcd34.............34.
            .........4433..........4331dccbd34.............343
            .........4433.........54.1ddbfcbb.4............343
            .........443..........55..bcfbbc..............3343
            .........443..........555.dccbdb..5...........3333
            .........443..........554..cbdb..555...55.....3333
            ........4443.....44...5554.dbdb554554454555....333
            ........3433..444444444554..bb354554444554445..333
            ........3433.44555555555554.bb3455555544445555.333
            ........343.5555.........55...455.....555555555.34
            .......3343.55....ccccc...54.445...ccccc.....55.34
            .......3333.....ccbbbbbbc.54.45..cbbbbbbcc......34
            .......3333.....cbbddddbbc.5.55.cbbddddbbc......34
            .......3333....ccbdd11ddbcc....ccbdd11ddbcc.....34
            .......333.....ccbd1111dbcc....ccbd1111dbcc.....33
            ........33.....ccbd1111dbcc....ccbd1111dbcc.....33
            ........33.....ccbdd11ddbc4ccc4ccbdd11ddbcc....333
            ........33......cbbddddbbc5cbb54cbbddddbbc.....333
            .................cbbbbbbcc5bdd35ccbbbbbbc......33.
            ...........4444..cccccccc4cb11bc54ccccccc...445...
            ..........54445....ccc4445bd11db5544ccc....4455...
            ..........55555.544444445cbd1ddbc544444445545.....
            .............555.5555445.cb1db1bc554444445545.....
            .....................555.cbdbcbdb.54455555.5......
            ......................55.ccbcccbc.5555............
            .............44........5...cc..c..555......4......
            .............43...........................43......
            .............3...4.....cccccccccccc.......33......
            .............3.5.4.4..ccccbbbbbbcccc...4...3......
            ...............5.545..cc5bb5bb45bc4c.4.54.........
            .................3344c554bd44d44bb54c4433.4.......
            .................4...c544ddddddddb45c.....5.......
            .....................ccbbdd1111ddb44c.............
            ....................cccbdd111111dd4ccc..4.........
            ...............4....cccbdd111111ddbccc..4.........
            ...............54...cccbdd111111ddbccc..45........
            .................4.4cccbbdd1111dd4bccc..5.........
            ................45.4.c4cbdddddddd44c4....4........
            ...............43345.3344bdd4dd4b4343.3..4........
            ...............5433433443cb44bb43553434455........
            ................555543333cc3433543344555..........
            ...................555443334533344455.............
            .....................55444555544555...............
            ......................55555554455.................
            ........................55555555..................
            ..................................................
            f.................................................
            `, SpriteKind.bossHead)
    }
    if (false) {
        boss2Head = sprites.create(img`
            f......................333333333333...............
            .....................3333fcaf33333333.............
            ...................33333ffffff33333ff33...........
            .................33cff333ffff333333fffc33.........
            ................33caff33344444433333ffca33........
            ...............33fff3334444444fff333fffcf33.......
            ..............3333333444ff4444ffff333ffff333......
            .............3333334444fcf4444ffccf333fff3333.....
            ............33333344444ff444444fcaf3333ff33333....
            ............33355444444444444444fff33333333333....
            ...........3335f5444444443444444433333344443333...
            ...........333fff444444333355444333333344444333...
            ..........333ffff44444333ffff3333333333444443333..
            ..........333fcff444433fffffff33f333333344443333..
            .........334facff4433fffffffff3fc333333334fff3333.
            .........344fcfff3333ffccfffff3ff33333333caff3333.
            .........344ffff3333ffcaccfff33333fff333ffcaf3333.
            .........344ffff3333ffcaacfff3333caff333ffff33334.
            .........4445ff333333ffccfff33333fff33333ff333334.
            .........4443333333333fffff3333333333333333333344.
            .........4443333333333333333333333333333333333344.
            .........4443333333333333333333333333333333333344.
            .........4443333333333333443333445334444444333344.
            ........44443333344333333444334555444444444434344.
            ........44433344444444444444334344444444334444344.
            ........44333444444444433444334433333333333333334.
            ........443.34333333333333443444333ffffffff533.344
            ........443.3333fffffffff33434333ffffcccffff53.344
            ........433.33ffffffffffff3333333fffcccccfff53.334
            ........43..33ffffcccfffff3333333fffcaaccfff53..34
            ........43..33fffcccccffff3333333fffcaaacfff53..34
            ........43..33fffccaacfff33333433ffffcccffff33..34
            ........43..33fffcaaacfff333333333fffffffff333..34
            ........43..33ffffcccfff3343334435555555555334..34
            ........43..33ffffffffff3545554444555555555333..34
            ........33..333ffffff3333433343444444433344443..33
            ...........4444333333333343ff333354444444444344...
            ..........4444433333334443ffff333555333333344443..
            ..........4444434444444443ffff344455444444344333..
            ..........3333443444444433ffff33454445ffff344333..
            ..........333333333334443fff3ff335444fcff3343333..
            ..........333333333333443ff33ff335343fff33333333..
            ............3333333333343f333ff345443333333333....
            .............33434333333333333334333333333333.....
            .............33f43333333333333443333333333f33.....
            .............33ff443333333333333333333434ff33.....
            .............33ff433333333333333333333434ff33.....
            .............33ff443434434334343434343344ff33.....
            .............33ff4f4434334434344ff4344ff4ff33.....
            .............33ffffff3343f4f4f4fff43fffffff33.....
            .............34fffffff34fffffffffff4fffffff43.....
            .............34fffffff4ffffffffffffffffffff43.....
            .............34f4ffffffffffffffffffffffff4f43.....
            .............34344fffffffffffffff4ffffff44433.....
            .............33334ffffff4ffffffff34fffff43433.....
            .............334334ff3344ff4fff4f3434f4f34333.....
            .............334434333434ff44ff44333333444333.....
            .............333444443334ff433343334444433333.....
            ..............333334444433333333444443333333......
            ...............3333334444444444444433333333.......
            ................33333344444444444333333333........
            ..................3333334444444433333333..........
            ....................333333333333333333............
            f......................333333333333...............
            `, SpriteKind.bossHead)
    }
    if (false) {
        boss2Head = sprites.create(img`
            f.....................................................................
            .............................333333333333.............................
            ......................4....3333333333333333....4......................
            ......................4..33333333333333333333..4......................
            ......................43333333333333333333333334......................
            .....................4443333333444444333333333444.....................
            .....................3443333344444444433333333443.....................
            ....................334433344444444444433333334433....................
            ...................33334444444444444444433333443333...................
            ..................3333344444444444444444333334433333..................
            ..................3333334444444444444443333344333333..................
            .................333333344444443444444433333443333333.................
            ...4333333.......333333334444333344444333334433344333.......3333334...
            4444443333333...33333433344433333333333333344333443333...3333333444444
            ...444443333333.33333433334433333333333333443333443333.333333344444...
            ......4444333333343334433334433333333333344333344433333333334444......
            ........444433333333333333334433333333334433333333333333334444........
            ..........44433333333333333334333333333343333333333333333444..........
            ............4433334333334333343333333333433334333334333344............
            .............44333433333345334333333333343354333333433344.............
            ..............444433333333444333333333333444333333334444..............
            ...............4443333333333333333333333333333333333344...............
            ...............4443333333333333333333333333333333333344...............
            ...............4443333333333333333334333333333333333344...............
            ..............44443333344333333333434355544444333333344...............
            ..............44433344444444444333434454444444444443344...............
            ..............44333444444444444454434344433444444443334...............
            ..............443.3433333333344445333344333333333333.344..............
            ..............443.3333fffff5554445333344555fffff3333.344..............
            ..............433.33fffffffff554443333445fffffffff33.334..............
            ..............43..33ffffffffff5344333443ffffffffff33..34..............
            ..............43..33fffffcffff5334333433ffffcfffff33..34..............
            ..............43..33ffffcccffff33334333ffffcccffff33..34..............
            ..............43..33fffcccccfff33334333fffcccccfff33..34..............
            ..............43..33ffffcccfff3343444333fffcccffff33..34..............
            ..............43..33fffffcffff3343334433ffffcfffff33..34..............
            ..............33..333ffffff3333343ff3433333ffffff333..33..............
            .................4444333333333343ffff3443333333333444.................
            ..............4444444433333344443ffff344443333333444444...............
            ..........44444455544344444444433ffff33444444444344433544444..........
            ............55553333443444444433fff3ff33444444443443335555............
            ..............553333333333344433ff33ff334444333334333355..............
            ................3333333333334433f333ff3334333333333333................
            ..................3333333333343333333333443333333333..................
            ...................33333333333333333333333333333333...................
            ...................33f33333333333333333333333333f33...................
            ...................33ff433333333333333333333433ff33...................
            ...................33ff433333333333333333333453ff33...................
            ...................33ff443433333333334333433343ff33...................
            ...................33ff4f3433434334344ff4433f4fff33...................
            ...................33ffffff334345f4fffff44fffffff33...................
            ...................33fffffff44f44ffffffff4fffffff33...................
            ...................33f4ffffff4ff4ffffffffffffff5f33...................
            ...................3355ffffffffffffffffffffffff5433...................
            ...................33345fff4fffffffffff4ffffff34433...................
            ...................33334fff44f4ffffffff44f4fff33333...................
            ...................334333ff4534ff4fffff4534f3f34333...................
            ...................334433334334ff43ff33433333444333...................
            ...................4334444433335f433333334444433334...................
            ...................44333344444333433334444433333344...................
            ..................4334333334444444444444433333334334..................
            .................4333.33333344444444444333333333.3334.................
            ...............4333.....3333334444444433333333.....3334...............
            ............3333..........443333333333333344..........3333............
            .........................43333333333333333334.........................
            .........................333..............333.........................
            ........................43..................34........................
            f.....................................................................
            `, SpriteKind.bossHead)
    }
}
function killAllSprites () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy2)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy3)
    sprites.destroyAllSpritesOfKind(SpriteKind.bossH1)
    sprites.destroyAllSpritesOfKind(SpriteKind.bossHead)
    sprites.destroyAllSpritesOfKind(SpriteKind.bossH2)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
}
sprites.onOverlap(SpriteKind.enemy2, SpriteKind.enemy2, function (sprite, otherSprite) {
    enemyColission(sprite, otherSprite)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inMenu == 0) {
        timer.throttle("action", 500, function () {
            countdown = info.countdown()
            info.stopCountdown()
            inMenu = 1
            pausedMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("resume"),
            miniMenu.createMenuItem("quit to menu")
            )
            miniMenu.setDimensions(pausedMenu, 100, 100)
            miniMenu.setTitle(pausedMenu, "Game Paused ||")
            miniMenu.setStyleProperty(pausedMenu, miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 15)
            miniMenu.setStyleProperty(pausedMenu, miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 1)
            pausedMenu.setPosition(80, 100)
            timer.after(500, function () {
                miniMenu.onButtonPressed(pausedMenu, miniMenu.Button.A, function (selection, selectedIndex) {
                    if (selectedIndex == 0) {
                        inMenu = 0
                        info.startCountdown(countdown)
                        miniMenu.close(pausedMenu)
                    }
                    if (selectedIndex == 1) {
                        color.startFade(color.originalPalette, color.White, 500)
                        color.pauseUntilFadeDone()
                        killAllSprites()
                        tiles.setCurrentTilemap(tilemap`level6`)
                        bossState = "none"
                        fireRate = 5000
                        bossHand1X = 0
                        bossHand2X = 0
                        isJumping = 0
                        StartGame()
                    }
                })
            })
        })
    }
})
function killPlayer (player2: Sprite, colider: Sprite, colisionType: string) {
    if (inMenu == 0) {
        if (invincibility == 0) {
            timer.after(10, function () {
                if (player2.overlapsWith(colider)) {
                    playerSpeed = 0
                    inMenu = 2
                    scene.cameraShake(4, 200)
                    timer.after(250, function () {
                        if (score > highScore) {
                            highScore = score
                        }
                        info.stopCountdown()
                        game.setDialogCursor(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `)
                        game.splash("You Died", "Score: " + score + " High Score: " + highScore)
                        color.startFade(color.originalPalette, color.White, 500)
                        color.pauseUntilFadeDone()
                        killAllSprites()
                        startGame()
                        color.startFade(color.White, color.originalPalette, 500)
                        color.pauseUntilFadeDone()
                    })
                }
            })
        } else {
            if (colisionType == "enemy") {
                launchSprite(player2, colider, 180)
                timer.after(200, function () {
                    invincibility = 0
                })
            }
            if (colisionType == "boss") {
                timer.after(600, function () {
                    invincibility = 0
                })
            }
            if (colisionType == "projectile") {
                sprites.destroy(colider)
                timer.after(200, function () {
                    invincibility = 0
                })
            }
            upgradeList.push(miniMenu.createMenuItem("invincibility at start"))
            timer.background(function () {
                animation.stopAnimation(animation.AnimationTypes.ImageAnimation, mySprite)
                mySprite.setImage(img`
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    1 1 1 1 1 
                    `)
            })
        }
    }
}
function menuInteraction () {
    miniMenu.onButtonPressed(startMenu, miniMenu.Button.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            color.startFade(color.originalPalette, color.White, 500)
            color.pauseUntilFadeDone()
            sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
            sprites.destroyAllSpritesOfKind(SpriteKind.UI)
            startGame()
            color.startFade(color.White, color.originalPalette, 500)
        }
        if (selectedIndex == 1) {
            sprites.destroyAllSpritesOfKind(SpriteKind.UI)
            miniMenu.close(startMenu)
            scene.setBackgroundImage(img`
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f111f111fff111f111f111f1f1f1fff1f1f111f1f1f111fff111f111fff1f1f1fff111fff111fff11ffff111f111fff1fff1f111f1f1f111fffffffffffffffffffffffffffffffffffffffffff
                ff1f1f1fff1fffff1f1f1f1f1f1f1f1f1fff1f1f1fff1f1f1fffff1f1f1f1fff1f1f1fff1f1fff1fffff1f1ffff1ff1f1fff11f11f1f1f1f1f1fffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f111f11ffff111f111f1f1f1f1f1fff11ff11ff1f1f111fff1f1f111fff1f1f1fff111fff111fff1f1ffff1ff1f1fff1f1f1f1f1f1f1f11ffffffffffffffffffffffffffffffffffffffffffff
                ff1f1fff1f1fffff1f1f11ff1f1f11f11fff11ff1ffff1ffff1fff1f1f11ffff11f11fff1f1fffff1fff1f1ffff1ff1f1fff1f1f1f1f1f1f1f1fffffffffffffffffffffffffffffffffffffffffffff
                ff111f111f111fff1f1f1f1f111f1fff1fff1f1f111ff1ff111fff111f1f1fff1fff1f1f1f1f1f111f1f11fffff1ff111fff1f1f1f111ff1ff111f1fffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffff1fffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff111f1f1f111f111f11ffff111f1ff1f1f1f111f1f1f111f1ff1f111fff333f333f33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f1f1f1f1ff1ff1f1fff1f1f11f1f1f1ff1ff1f1ff1ff11f1f1fffff3f3f3fff3f3fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff111f1f1f1f1ff1ff1f1fff111f1f11f1f1ff1ff111ff1ff1f11f1fffff333f33ff3f3fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1ff1ff1f1ff1ff1f1fff1f1f1ff1ff1fff1ff1f1ff1ff1ff1f1f1fff33ff3fff3f3fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1ff1ff111f111f11ffff1f1f1ff1ff1fff1ff1f1f111f1ff1f111fff3f3f333f33ff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff111f1f1f1fff1f111fff111f1f1f111f111fff111f1f1f111fff111f1ff1f111f1fff1f111f111f111fff111f111fff111f1f1f111f111f11ffff111f1f1f111f1fff1ffffffffffffffffffffffff
                fff1ff1f1f11f11f1f1fff1f1f1f1f1fff1f1ffff1ff1f1f1fffff1fff11f1f1fff11f11ff1ff1fff1ffffff1ff1f1fff1f1f1f1f1f1ff1ff1f1ffff1ff1f1f1fff11f11ffffffffffffffffffffffff
                fff1ff1f1f1f1f1f111fff1f1f1f1f11ff111ffff1ff111f11ffff11ff1f11f11ff1f1f1ff1ff11ff111ffff1ff1f1fff111f1f1f1f1ff1ff1f1ffff1ff111f11ff1f1f1ffffffffffffffffffffffff
                fff1ff1f1f1f1f1f1fffff1f1f1f1f1fff11fffff1ff1f1f1fffff1fff1ff1f1fff1f1f1ff1ff1fffff1ffff1ff1f1fff1f1f1f1f1f1ff1ff1f1ffff1ff1f1f1fff1f1f1ffffffffffffffffffffffff
                ff11ff111f1f1f1f1fffff111ff1ff111f1f1ffff1ff1f1f111fff111f1ff1f111f1f1f1f111f111f111ffff1ff111fff1f1ff1ff111f111f11fffff1ff1f1f111f1f1f1f1ffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff111f111f111f111f111fff111f1f1f111fff111f111f1fff1f111f111fff111f111f111f111fff111f111f111fff1f1f111f1f1fff111f111f111fff111f111fff111f111f111f1f1fff111f1ff1ff
                ff1f1f1ffff1ff1fff1f1ffff1ff1f1f1ffffff1fff1ff11f11f1fff1f1fff1fff1f1f1fff1fffff1f1f1fff1fffff1f1f1f1f1f1fff1fff1ffff1fffff1ff1f1fff1f1ff1ff1fff1f1fff1f1f11f1ff
                ff111f11fff1ff11ff111ffff1ff111f11fffff1fff1ff1f1f1f11ff111fff1fff1f1f11ff111fff1f1f11ff11ffff1f1f1f1f1f1fff1fff11fff1fffff1ff1f1fff111ff1ff1fff11ffff111f1f11ff
                ff1f1f1ffff1ff1fff11fffff1ff1f1f1ffffff1fff1ff1f1f1f1fff11ffff1f1f1f1f1fffff1fff1f1f1fff1ffffff1ff1f1f1f1fff1f1f1ffff1fffff1ff1f1fff1ffff1ff1fff11ffff1f1f1ff1ff
                ff1f1f1ffff1ff111f1f1ffff1ff1f1f111ffff1ff111f1f1f1f111f1f1fff111f111f111f111fff111f1fff1ffffff1ff111f111fff111f111ff1fffff1ff111fff1fff111f111f1f1fff1f1f1ff1ff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f111f111f111f111f11ff111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f1f1f1fff1f1f1f1f1f1f1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f111f1fff111f111f1f1f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff1f1f1fff1f1f11ff1f1f1f1f1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ff111f1fff111f1f1f1f1f11ff111f1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                `)
            controlsMenu = miniMenu.createMenu(
            miniMenu.createMenuItem("exit")
            )
            controlsMenu.setPosition(80, 100)
            miniMenu.onButtonPressed(controlsMenu, miniMenu.Button.A, function (selection, selectedIndex) {
                miniMenu.close(controlsMenu)
                scene.setBackgroundImage(img`
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333344444433333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333344444444433333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333344444444444433333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333344444444444444433333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444444444444333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333344444444444444443333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444444443444444433333344443333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444444333344444333333344444333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333444444433333333333333333444443333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333444444333333333333333333344443333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3343334444333333333333333333333344433333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333443333433333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44443333344333333444334444444444333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44433344444444444444334444444444444443344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44333444444444433444334433333444444443334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff443f3433333333333344344333333333333333f344fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff443f3333fffffffff33434333fffffffff3333f344fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff433f33ffffffffffff333333ffffffffffff33f334fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffffff333333ffffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffffff333333ffffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33fffffffffff33333333fffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33fffffffffff33333333fffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffff3343334333ffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffff3343334433ffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333ffffff3333343ff3433333ffffff333ff33fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444333333333343ffff3443333333333444ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444333333344443ffff34444333333344443fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444344444444433ffff33444444444344333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333443444444433fff3ff3344444444344333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333344433ff33ff3344443333343333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333334433f333ff3334333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333343333333333443333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33f33333333333333333333333333f33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffff3333333333333ff3333fffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffff3333fffffffff33fffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333ffffffffffffffffffffff33333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333fffffffffffffff33fffff33333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff334333ff3333ffffffff3333f3f34333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff334433333333ff33ff33333333444333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333444443333ff333333334444433333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444433333333444443333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444444444433333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333344444444444333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444433333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    `)
                Title = sprites.create(img`
                    ....................3333333.....................
                    ..........333...33..3333333...33333333..........
                    ..........333...33..333....3..33333333..........
                    33333333..333...33..333....3..333.......3333333.
                    33333333..333...33..333....3..333.......3333333.
                    333...33..333...33..333....3..333.......333....3
                    333.......333...33..333....3..333.......333....3
                    333.......333...33..3333333...333.......333....3
                    333.......333...33..3333333...333.......333....3
                    333.......333...33..333....3..33333.....333....3
                    333.......333...33..333....3..333.......333....3
                    333.......333...33..333....3..333.......333....3
                    333.......333...33..333....3..333.......333....3
                    333.......333...33..333....3..333.......333....3
                    333.......333...33..3333333...333.......333....3
                    333.......333...33..3333333...33333333..333....3
                    333.......33333333............33333333..333....3
                    333...33................................3333333.
                    33333333................................3333333.
                    `, SpriteKind.UI)
                Title.setPosition(80, 15)
                startMenu = miniMenu.createMenu(
                miniMenu.createMenuItem("Start Run"),
                miniMenu.createMenuItem("Controls")
                )
                startMenu.setPosition(60, 100)
                miniMenu.setDimensions(startMenu, 100, 100)
                menuInteraction()
            })
        }
    })
}
function StartGame () {
    info.setScore(0)
    Title = sprites.create(img`
        ....................3333333.....................
        ..........333...33..3333333...33333333..........
        ..........333...33..333....3..33333333..........
        33333333..333...33..333....3..333.......3333333.
        33333333..333...33..333....3..333.......3333333.
        333...33..333...33..333....3..333.......333....3
        333.......333...33..333....3..333.......333....3
        333.......333...33..3333333...333.......333....3
        333.......333...33..3333333...333.......333....3
        333.......333...33..333....3..33333.....333....3
        333.......333...33..333....3..333.......333....3
        333.......333...33..333....3..333.......333....3
        333.......333...33..333....3..333.......333....3
        333.......333...33..333....3..333.......333....3
        333.......333...33..3333333...333.......333....3
        333.......333...33..3333333...33333333..333....3
        333.......33333333............33333333..333....3
        333...33................................3333333.
        33333333................................3333333.
        `, SpriteKind.UI)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333344444433333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333344444444433333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333344444444444433333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333344444444444444433333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444444444444333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333344444444444444443333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444444443444444433333344443333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444444333344444333333344444333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333444444433333333333333333444443333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333444444333333333333333333344443333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3343334444333333333333333333333344433333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3443333333333333333333333333333333333334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333333333333333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4443333333333333443333433333333333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44443333344333333444334444444444333333344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44433344444444444444334444444444444443344ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44333444444444433444334433333444444443334ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff443f3433333333333344344333333333333333f344fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff443f3333fffffffff33434333fffffffff3333f344fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff433f33ffffffffffff333333ffffffffffff33f334fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffffff333333ffffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffffff333333ffffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33fffffffffff33333333fffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33fffffffffff33333333fffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffff3343334333ffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43ff33ffffffffff3343334433ffffffffff33ff34fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333ffffff3333343ff3433333ffffff333ff33fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444333333333343ffff3443333333333444ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444333333344443ffff34444333333344443fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444344444444433ffff33444444444344333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333443444444433fff3ff3344444444344333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333344433ff33ff3344443333343333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333334433f333ff3334333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333333333343333333333443333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333333333333333333333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33f33333333333333333333333333f33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ff333333333333333333333333ff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffff3333333333333ff3333fffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffff3333fffffffff33fffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33ffffffffffffffffffffffffffff33ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333ffffffffffffffffffffff33333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333fffffffffffffff33fffff33333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff334333ff3333ffffffff3333f3f34333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff334433333333ff33ff33333333444333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333444443333ff333333334444433333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333334444433333333444443333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444444444433333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff33333344444444444333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3333334444444433333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333333333fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff333333333333ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    startMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Start Run"),
    miniMenu.createMenuItem("Controls")
    )
    startMenu.setPosition(60, 100)
    Title.setPosition(80, 15)
    miniMenu.setDimensions(startMenu, 100, 100)
    color.startFade(color.White, color.originalPalette, 500)
    color.pauseUntilFadeDone()
    menuInteraction()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy3, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "enemy")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.bossH1, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "boss")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    killPlayer(sprite, otherSprite, "enemy")
})
let projectile: Sprite = null
let Title: Sprite = null
let controlsMenu: Sprite = null
let startMenu: Sprite = null
let highScore = 0
let score = 0
let pausedMenu: Sprite = null
let countdown = 0
let boss2Head: Sprite = null
let bossHead2: Sprite = null
let myEnemy3: Sprite = null
let myEnemy2: Sprite = null
let myEnemy: Sprite = null
let invincibility = 0
let myMenu: Sprite = null
let upgradeList: miniMenu.MenuItem[] = []
let jumpSpeed = 0
let playerSpeed = 0
let e3speed = 0
let e1Speed = 0
let timer2 = 0
let doubleJump = 0
let bulletSpeed = 0
let gravityPlayer = 0
let gravity = 0
let H2X = 0
let H2Y = 0
let rightHoverTimer = 0
let H1X = 0
let H1Y = 0
let leftHoverTimer = 0
let attack = 0
let bossAttackCooldown = 0
let mySprite: Corgio = null
let isJumping = 0
let bossHand2X = 0
let bossHand1X = 0
let fireRate = 0
let inMenu = 0
let bossState = ""
let bossHand2: Sprite = null
let bossHand1: Sprite = null
let attack2 = 0
let attack22 = 0
bossState = "none"
inMenu = 2
fireRate = 5000
bossHand1X = 0
bossHand2X = 0
isJumping = 0
StartGame()
game.onUpdate(function () {
    if (inMenu == 0) {
        for (let value11 of sprites.allOfKind(SpriteKind.Enemy)) {
            value11.y += gravity
        }
        for (let value12 of sprites.allOfKind(SpriteKind.enemy2)) {
            value12.y += gravity
        }
        for (let value13 of sprites.allOfKind(SpriteKind.enemy3)) {
            value13.y += gravity
        }
        for (let value132 of sprites.allOfKind(SpriteKind.bossHead)) {
            bossStateMachiene()
        }
        for (let value13 of sprites.allOfKind(SpriteKind.Projectile)) {
            extraEffects.createSpreadEffectOnAnchor(value13, extraEffects.createSingleColorSpreadEffectData(12, ExtraEffectPresetShape.Spark), 100, 1, 2)
            extraEffects.createSpreadEffectOnAnchor(value13, extraEffects.createSingleColorSpreadEffectData(4, ExtraEffectPresetShape.Twinkle), 100, 1, 2)
            extraEffects.createSpreadEffectOnAnchor(value13, extraEffects.createSingleColorSpreadEffectData(2, ExtraEffectPresetShape.Spark), 100, 1, 2)
        }
    } else {
        for (let value1322 of sprites.allOfKind(SpriteKind.MiniMenu)) {
            value1322.z = 100
        }
    }
})
game.onUpdateInterval(fireRate, function () {
    if (inMenu == 0) {
        for (let value14 of sprites.allOfKind(SpriteKind.enemy2)) {
            if (mySprite.x > value14.x) {
                projectile = sprites.createProjectileFromSprite(img`
                    2 2 
                    2 2 
                    `, value14, bulletSpeed, 0)
            } else {
                projectile = sprites.createProjectileFromSprite(img`
                    2 2 
                    2 2 
                    `, value14, 0 - bulletSpeed, 0)
            }
            projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        }
    }
})
forever(function () {
    score = info.score()
    if (inMenu == 2) {
    	
    } else {
        if (inMenu == 0) {
            mySprite.maxMoveVelocity = playerSpeed
            mySprite.maxJump = doubleJump
            mySprite.jumpVelocity = jumpSpeed
            mySprite.gravity = gravityPlayer
            for (let value15 of sprites.allOfKind(SpriteKind.Enemy)) {
                value15.follow(mySprite, e1Speed)
            }
            for (let value16 of sprites.allOfKind(SpriteKind.enemy3)) {
                value16.follow(mySprite, e3speed)
            }
            for (let value17 of sprites.allOfKind(SpriteKind.enemy2)) {
                value17.follow(mySprite, 5)
            }
        } else {
            mySprite.setVelocity(0, 0)
            mySprite.maxMoveVelocity = 0
            mySprite.maxJump = 0
            mySprite.jumpVelocity = 0
            mySprite.gravity = 0
            for (let value18 of sprites.allOfKind(SpriteKind.Enemy)) {
                value18.follow(mySprite, 0)
            }
            for (let value19 of sprites.allOfKind(SpriteKind.enemy3)) {
                value19.follow(mySprite, 0)
            }
            for (let value20 of sprites.allOfKind(SpriteKind.enemy2)) {
                value20.follow(mySprite, 0)
            }
        }
    }
})
