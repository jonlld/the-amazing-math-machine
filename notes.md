Development Notes / Todo list:

1. Login screen!

- Prompt user to enter name DONE
- Save name to local storage DONE
- Retrieve highscore if user exists DONE
- Switch to Game Choose screen DONE
- Retrieve and show leaderboard for current users on login screen DONE
- Allow click on name to login DONE
- Sort leaderboard DONE
- Add a trophy marker to the best score DONE

2. Game Choose screen!

- Code: Export header to component TODO
- Choose game mode to start
  - game type (addition, subtraction, multiplication, random) DONE
  - add logic for various operands and treatment DONE
  - add additional game modes TODO
    - peaceful
    - standard (each sum is timed, ramping difficulty, bonus points)
    - speedrun (how many sums in 60 seconds - separate leaderboard)

3. Sum and Score screens!

- Display sum with an input box DONE
- Disallow submission if input is empty DONE
- Add sum submission button DONE
- Check answer on submit and show result DONE
- If correct, add 10 to score DONE
- If incorrect, add 1 strike (max 3) DONE
- Keep num of strikes visible DONE
- Animate answer results DONE
- If game over (3 strikes) update user data DONE
- Add pause / resume feature TODO
  - add pause button and save game data to local storage (one save game limit for now) DONE
  - add check for saved game data and show message on login if any DONE
  - add button to restart saved game (isRestarted) DONE
  - clear save game data once that game is completed - if isRestarted && isGameOver - and remove save game message from login screen TODO
- Add (optional) timer to complete sum or receive a strike TODO
- If incorrect, show sum and correct answer? TODO
- Show user tailored log - how many times played / best score / average score / favourite mode TODO

4. Game Over screen!

- Show score and highscore DONE
- Allow click to restart game DONE
- Allow click to change game mode DONE
- Add transitions for game over screen DONE

5. Other

- 'How to play' / 'About' pages TODO
- Add polish - icons, colors, a little animation, a little sound TODO
- Refactor - layout / state/ modularity TODO
- Make responsive! TODO

---

- Other Ideas:

* Add a TNT power for every 10 sums answered - allows you to skip an answer?
* Speedrun - do x # of random sums in a fixed time

- References / Resources:

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

Underline transition:
https://www.30secondsofcode.org/css/s/hover-underline-animation

https://stackoverflow.com/questions/26986129/play-multiple-css-animations-at-the-same-time

Retrieving attribute on button click:
https://stackoverflow.com/questions/58634154/react-typescript-get-data-attribute-from-click-event
