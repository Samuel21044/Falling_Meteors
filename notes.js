//THIS IS ONLY FOR WRITTING NOTES IN

/*
-Old notes from when I was making game-

---------------------------------------------------------------

Game.js file----------------

I need to add a resize function to make it so that the canvas gets bigger when going full screen and all objects inside it get proportionally bigger too for when you go full screen.

How to fix future collision problems
Or what I could do is I could add the image but then I add a rectangle showing the hitbox to make sure im doing this bs right

For shop---
I will change collision based on what image 
I will resize every single image

Perks-
revive
Immunity for x seconds
A multiplier for score
A multiplier for points
Lower the amounts of meteors
Make meteors smaller
make meteors slower
make player smaller
make player faster
Limit the amount of perks you can use
Decrease the price of perks
Decrease the price of characters


For perks
In top I have list of what player is currently using
For images I will use text
For upgrades I use ctrl to use them
To upgrade when unclicked it says to upgrade
And when hover it will say what you can do
And if you double click on an upgrade it will ask you to upgrade for x points
I will have a button deleting the items from the list


HOw to be better at programming

Be able to have multiple collision points for objects, like have a list of collision blocks you can hit for obj instead of having one big block

Make buttons less complicated
When having mouse over block and always looking for collision lags the game, the event listener (mousemove) lags the game, so instead I have a tiny object that is always following mouse so that way I can always use collision instead of mouse so I dont have to use event listeners anymore. Also have an if statement above event listneer so it doesnt lag out as much


BUG REPORT---------
-Whenever maxNumOfPerks is reached in a nested perk the maxNumOfPerks stops working properly
So something is NOT turning if reached max (if reached max num of perks) 
Or something is turning if reached max off when its on

Subtract Num Of Perks is being tunred on by it being more than 2

So the bug is basically what was happening with the perks being activatred wihlst on a diffrent screen



FOR SHOP-----------
1. Take a break (taking a break will clear my mind and give me new ideas)
2. Take a look at old game and really take it what I did, how it worked, and how to replicate it.


So basically stoped incrementing change state of perk and stop decreasing time whenever 'IfReachedMax' is on. 
And whenever I click on one that is not the one that is trapped then it turns 'IfReachedMax' off.



So I have a couple options for the perks and score multiplier but heres my dialema

So there can only be one, its confusing to code
So this is what I can do



Add a seperate scene for the score and perks
Have score and point multiplier go add one at a time

Have both score and point multiplier in the same scene so you can only activate one at a time


Score multiplier-
Ability to get score faster per second

Point Multiplier-

NEED TO ADD LONG TERM-
-Fix perk bugs
-Create more character sprites
-Add save file to all of perks and space ships


NEED TO DO-
Get brodys opinion on the following things-
If revive bar is a good idea and if it should be longer
Ask about immunity and if its good
If cost of perks is too much


BROKEN THINGS-
Counting is off by 0.2 seconds (fine, wont fix)
Cant perks and score cant reset

Go to using perk and check if item is more than current item else if dont let player use it
Nested Perks are the problem, and there are many bugs that lets player use more perks than allowed to

So here is what I need to do for the perk things-
If buying for the first time, dont reset everything, just reset the one that you clicked on.

As long as more perks adder is greater than already thing, then do it.

NEXT ON THE AGENDA-
-Bug with num of perks total and 5th tab
-Add another save file for the spaceships

-How that will work-
Everytime I click on a new spaceship then it calls the file


NEED to FIX-
Full screen mode
Full-screen is changed by 50px on y variable-


HOW TO FIX SCREEN CHANGE-
Whenever I go full screen it will save something and set it to true. And whenever it refreshes in the first screen and then I check if that savce file is set to true. If it is I set it to whatever scene I saved it to and then I will change it to false.
{DONE}

Now, all I need are the spaceship images, except I procastinate way too much and havebeen putting them off for a long time, thats all I need, and then the game will be done

First 14 "this.game.shopItems[" is a loop that is counting based on WHERE THE ITEMS ARE PLACED IN THE LIST. That is bad since im adding new ones so I need to fix all 14 of them counting based of of their item


So another bug... The save file is the problem again. I dont know what exactly what happened but ill solve it.

BUGS-
-Alert function activating twice in nested perks whenever I click on a perk multiple times
-Screen flickers whenever you go full-screen
-Shop is laggy
-Score timer is off
-Points timer is off
-Collision spaceships
-More spaceships
-Perks dont immediately activate when in game, you have to go to shop, then play in order to have perks work on load
Randomly brings you back to menu if you minimize and expand screen too many times

-A bunch of weird stuff is happening in the shop whenever we go fullScreen or minimize it. Like------
Perks flicker for a millisecond-
Randomly brings you back to the main menu if you minimize and full screen to many times-

For two bugs in shop heres how to fix them-
Move all of the code that determines the text to the first scene so it is automatically done for when you switch,-
For second bug move code that changes scene to the top or at least above the code that actuvates the reload so it will switch it before it will have the ability to change into the normal scene.


I will have a list containing all the collison types for every single spaceship, and that will be the collision.
Since we spawn with diffrent spaceships, those diffrent spaceships all have to align perfecf=tly in the center, so in order to do that I have to call it once when the game loads to make sure that the spaceships loads in the middle, I can also use this to make sure all the perks are activated here.


BUGS I WILL FIX-
-More spaceships        ---
-Collision spaceships   ---
-Center all spaceships  ---
-Change SpaceShip prices
-Shop bugs are back again... I HATE MYSEKF FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK

Bugs im focused on rn-
-Spaceship stuff (more spacesips, add collision)

     "New bugs"
--------------------
* Test every perk out {DONE}
* Test every spaceship out {DONE}
* Perks dont activate until player goes into shop {DONE}
* Other perk bug {DONE}
* Whenever deactivating perks when at max, it will show an alert when its not suppoed to {DONE}
* NumOfUsingPerks will not update whenever player is using 2 perks and decides to upgrade numOfPerks (should be three) wheter buy or not {DONE}
* Two perks in 5th tab are activating at the same time {DONE}

* After all of this I will test all of these things again to make sure I didnt break anything {DONE}

So with all of that, I think the game is finished. Some last thing I want to add is maybe an alert, that alerts you that you cant buy anything if you try and click on something and you dont have enough money, and maybe one more spaceship and I should be good,

Final things I want to make-
* Center all spaceships regardless if theyre minimized or not {DONE}
* Choose prices for space ships {DONE}

So basically it wont center whenever the following happens-
* Nothing

It DOES center whenever I do the following-
Go back to main menu with keys (even with smaller perks)
* Go back to main menu with buttons (even with smaller perks)
* Die in game (even with smaller perks)
* In game in general (even with smaller perks)
* Game whenver you start game (even with smaller perks)
* Revive (even with smaller perks)
* Refresh Game
* Buy new space ship

Bug- Revive doesnt work when player is small {FIXED}





Player.js file----------------

NOTE- Whenever finding out ratio, divide total length/height by length/height by pixels.





------------------------------------------------------------------------------------------------------

2,807 lines of code, 1 year and six months, lots of anger, furstration, and hard work later... its finally done.
Im so happy for what I have completed, acomplished, and made. I  cant wait for what else I make, and im happy to say that 

its
done.

Finished on Tuesday, September 5th 2023, 8:30 AM
*/