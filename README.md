# smarthome-handler
## "Home Alone" like event handling to compliment IFTTT
Use case: When motion is detected at front door, turn on living room lights, wait 5 minutes, then turn them off

This was built because there is currently no "wait" functionality in IFTTT (see what they say about it [here](https://help.ifttt.com/hc/en-us/articles/360059005834-Can-I-add-a-timer-or-a-delay-to-my-Applets-)) so this must be done manually 

Note: No persistance layer. waiting is done in memory.
