User Story 1 - The user should be able to view a series of increasingly harder questions in order to challenge themselves.
User Story 2 - The user should be given a set of answers that are randomly mixed each time they play to increase difficulty.
User Story 3 - The user should laugh and enjoy the theme of the game so that they want to play it again.
User Story 4- The user should get less points for each right answer depending on the amount of time it takes to answer.
User Story 5 - The user should be tested against a timer so that there is a sense of urgency in the game play.

| Overall Structure |

The main problem I had to solve in creating this game was to figure out a way to tie together three elements: appending questions and answers to the page, having the user be able to click on those answers, and having that click event lead to the next set of questions and answers. The simplest way to do this would be to include a "Next" button that would automatically load the next set, but I chose to tie the load to automatically go off after the right answer is clicked.

The second main problem to solve was in differentiating the right answer from the wrong ones in terms of functionality. I decided to create a big object that contained all of the answers in an array, with corresponding key value pairs that contained the questions, the answers, the answer key, and the question time. I created a set of conditionals on the click event that basically said "if this clicked on div's html is equal to the answer key of the current question, you got it right."

Finally, one of the hardest challenges (the hardest challenge, to be honest), was in creating a function that eliminated a few wrong options as the timer counted down. Eventually I settled on using timeOut methods, but in hindsight, I think the difficulty stemmed from the way I appended the answer values to the DOM and the fact I used a shuffle method to mix up the answers. I settled on a possible solution, but I think there would be a better way to get the answer list on the page next go around.

| Key Features |

- Timer with decreasing point scores as the time wears on
- Answers that are randomized in order each time you play
- Intro modal and outro modal ... including cake!
- A shakespeare pop up that roots the player on for right answers
- A set of loss conditions including getting too many wrong and running out of time
- A point counter that keeps score
