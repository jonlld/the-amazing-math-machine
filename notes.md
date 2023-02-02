Development Notes:

1. Basic registration! (center)

- Prompt user to enter name DONE
- Save name to local storage DONE
- Switch to game screen DONE

2. Game screen! (center)

- Choose game mode to start TODO
  - sum type (addition, subtraction)
  - game type
    - zen
    - normal (each sum is timed, ramping difficulty, bonus points)
    - rush (how many sums in 60 seconds - separate leaderboard)

3. Start!

- Display sum with input, and check answers DONE
- Add score for correct answer DONE
- Add strike (max 3) for incorrect answer DONE
- Add gameover state / screen once 3 strikes DONE
- Update user stored data on game over DONE
- Allow click to restart game DONE
- Show user highscore on start screen TODO
- Progress / level tracker? TODO

4. Other

- Leaderboard, populated from local storage
- 'About' page / modal
- Make it pretty, use icons, colors, animations TODO
- Sounds
- Refactor
- Make responsive (number boxes for touch input)

* Bonus ideas

- Add a TNT power for every 10 sums answered - allows you to skip an answer?

* References / Resources

Imported Font:
https://fonts.google.com/specimen/Press+Start+2P

Layout:
https://www.w3schools.com/howto/howto_css_stacked_form.asp

CSS - BEM:
https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/

Transitions - add a key: TODO
https://stackoverflow.com/questions/63186710/how-to-trigger-a-css-animation-on-every-time-a-react-component-re-renders

Animations - wiggle effect
https://blog.hubspot.com/website/css-animation-examples

https://stackoverflow.com/questions/26986129/play-multiple-css-animations-at-the-same-time

Retrieving attribute on button click:
https://stackoverflow.com/questions/58634154/react-typescript-get-data-attribute-from-click-event
