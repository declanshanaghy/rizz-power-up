# Task Rules

1. Code Mode must never complete a task without asking FiremanDecko to 
   confirm that everything is working as expected.
2. Always run the frontend build locally to ensure that the github actions won't fail
3. After confirmation and prior to returning results to the Orchestrator always 
   commit changes to git. See the section below for specifics (Commit changes to git before task completion)
4. The Orchestrator must always re-read TODO.md before starting a new task. Things might have 
   changed since the last time you read it.

# Commit changes to git before task completion
Prior to completing a task, ensure that all changes are committed to git and pushed to the origin
Create a git commit which includes all changes since last commit on this branch 
Generate a a summary of changes from the diff of all changed files and your context for the commit message
Disable the pager for all git commands while figuring out the diff
Use the latest API cost of this task for the API Cost metric.
Use time difference between now and the last commit timestamp for the development time metric

# Tasks

- [x] Setup a new git repo for rizz-power-up, then push it up to GitHub in a public repo
- [x] Read the PRD.md file and create a plan for the project. Ask for feedback using yes or no questions on how the app should operate
   - [x] As new tasks are discovered write them back into the TODO.md file for future work
- [x] Generate a README.md for the project, refer to style-guide.md for the style guide for all documentation
- [x] Initialize a new typescript react project in apps/frontend
- [x] Configure an aws profile for "rizz-power-up" using ~/Downloads/rizz-power-up_accessKeys.csv
- [x] Rewrite the copied opentofu modules inside ./infrastructure to handle the rizz-power-up app, instead of dollar-game
- [x] Run the state.tf Tofu module first to get the state resrouces created
   - Run all the rest of the required infrastructure resources with OpenTofu and ensure they create successfully
- [x] Rewrite the copied GitHub actions inside .github to handle the rizz-power-up app, instead of dollar-game
- [x] Run the github actions locally using act to ensure that they deploy properly
- [x] Commit all changes to git, push to origin, and validate that the actions are succeeding
- [x] Change the License to Apache 2.0 and remove the requests for contributors in README.md
   - [x] Add a LICENSE.md file to the root of the project with the Apache 2.0 license text in it.
- [x] Investigate GitHub action failures
   - https://github.com/declanshanaghy/rizz-power-up/actions/runs/14829279656
   - https://github.com/declanshanaghy/rizz-power-up/actions/runs/14829279648
   - https://github.com/declanshanaghy/rizz-power-up/actions/runs/14829279639
   - Fixed by updating GitHub secrets and correcting license mismatch in package.json files
- [x] There seem to be duplicate GitHub action, remove the duplicates


## Frontend Tasks
- [x] Refine image filenames
   - Read the prompts in apps/frontend/public/memes/rizz_image_prompts_no_text_overlay.md
   - Rename the files in the bood and bad subdirectories to be URL compatible
      - Only use chars from regex /[0-9a-zA-Z-.]+/ and .png extension
      - Generate a typescript file for the frontend app that can be used to reference both the good and bad images images for displays
- [x] Create a vaporwave-inspired TailwindCSS theme
  - Generate a theme for the app based on ./design/mockups/mock1.png and mock2.png
  - Use ./design/mockups/ui.html as a reference, it's an implementation-ready HTML+Tailwind component
- [x] Add a buy me a coffee button to the app and README.md https://buymeacoffee.com/firemandecko
   - <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="firemandecko" data-color="#FFDD00" data-emoji="☕"  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
- [x] Integrate new Rizz button based on images in apps/frontend/public/buttons/rizz.png
   - The button image may need to be pre-processed to split it up into its 3 states: disabled, enabled no hover, enabled hovering
- [x] Ensure the game always scales to fit within the window
- [x] Update rizz_image_prompts_no_text_overlay.md so that it has 2 fields per prompt
   - the prompt itself which is already in the doc
   - a description field which can be used to describe the card in the game, keep it vague but descriptive of the prompt
   - Update the meme-converter to generate the new memeImages.ts file with the description field instead of the prompt
- [x] Fix build error in https://github.com/declanshanaghy/rizz-power-up/actions/runs/14831001364/job/41632002398
- [x] Design and implement the main game screen with Rizz button
  - Clicking the rizz button should deal a random card from memeImages.ts
  - The card should be animated in to display in the center of the screen
  - The card should have a fabulous border and shadow
  - The card should display the descrption and effects on the player's stats
  - The card should disappear after a few seconds and the players score adjusted according to the attributes of the card
  - Modify the attrbiute panel at the bottom to show the score (integer) in the center the and emoji of the score on the right side
  - Apply the cards effects on the player's stats
  - Ask the player if they want to deal another card or bank their high score
- [x] Attribute scoring
   - Convert the string keys in Integrate apps/frontend/src/rizz_attributes_emojis.json  to integars.
   - Integrate apps/frontend/src/rizz_attributes_emojis.json into the app to determine what emoji should be shown according to the attribute score
- [x] Run the meme generator to create the new meme images.
   - Run the meme generator in ./apps/meme-converter to create the new memeImages.ts file so they an be integrated into the app
- [x] Fix the alignment of the button image when the mouse hover over it. 
  - It appears to move upwards when the mouse is over it.
- [x] Modify the game flow so that the player returns to the main attrbiute display screen after a card was dealt.
   - The delay to return to the screen should be inversely proportional to the number of times the user clicks on the screen. 
   - The more the user clicks, the slower they return to the main screen.
   - Cap the maxumum time to 5 seconds and minimum time to 1 second.
   - After dealing a card, the main display should show:
      - The Rizz up Button
      - The bank score button
- [x] Extract the Bank Score button into a separate component
   - It's marked by this comment in App.tsx: {/* Bank Score Button - Always visible */}
   - It should not be visible when a new game starts
   - Ensure it is not ALWAYS visible, it should only be visible after the user has clicked the Rizz Up button
- [x] Adjust the vertical scaling of the all component inside the main App to leave 5% space on top and bottom
- [x] Extract the stats Panel into a separate component
- [x] Extract the Rizz Level Panel into a separate component
- [x] Extract the High Score Panel into a separate component
- [x] Ensure the Rizz up button, Bank button and Give up buttons are all the same size in both x and y.
- [x] Implement local storage for banking the user's high score
- [x] Modify the main display so that the Bank score button only shows when the user has scored more than the high score.
- [x] Implement stats system (Vibe Level, Swagger, Cringe Avoidance, Rizz Level)
- [x] Remove the title from the app that reads "RIZZ POWER-UP SIMULATOR"
   - Add a background image to the app using bg1.png
- [x] Ensure that the images display within the card component with the right aspect ratio
   - The images are 1024 × 1536 pixels maintain the aspect ratio when displayed in the card component but scale it down to fit on the screen comfortably
- [x] Create special events system that trigger randomly ~ every 18 taps
   - Plsce logic for special events in SpecialEvent.tsx
   - Ensure the special events are displayed on top of the card component.
   - The speial event should either increase or decrease the players stats by a large random amount.
   - The amount shoudl be negative if it's a bad event and positive if it's a good event. 
- [x] Fix the error in GitHub Actions workflow
   - Fixed animation conflict in SpecialEvent component
   - Resolved TypeScript errors preventing build
   - Removed unused imports and variables
- [x] Incorporate sound effects for the following events
   - When dealing a card randomly select and play one of the upbeat sound effects if the card is good, randomly select and play one of the negative sound effects if the card is bad using these MP3s:
      - public/sounds/card_good_00.mp3 through card_good_04.mp3
      - public/sounds/card_bad_00.mp3 through card_bad_04.mp3
   - Play a cash register sound when banking a score from this mp3: public/sounds/bank_score.mp3
   - Play a celebratory sound when the Rizz level surpasses the high score using this mp3: public/sounds/rizz_level_up.mp3
- [x] Make the following emojis & scores bigger and more prominent
   - Rename "Vibe Level" to "Vibe"
   - Make the scores bigger for: vibe, swagger, cringe avoidance and rizz level
   - Make the emojis bigger and more prominent for: vibe, swagger, cringe avoidance and rizz level
   - Add mouseover effects to the emojis so they are highlighted when the mouse is over them
- [x] Add video and sound effects to the app when banking a score
   - The video and a continue button should be displayed in a modal panel 
   - The video should play in the top portion of the modal panel
   - The continue button should be displayed in below the video aligned in 
      the center and spaced out for visual clarity
   - Video is in public/videos/bank_01.mp4 
   - Sound is in sounds/bank_01.wav
   - Play the sound continuously while the dialog is displayed
   - The video should loop continuously while the dialog is displayed
   - There should be a button below the video labeled "Continue" to return to the game
   - When the user clicks the continue button, the modal panel should 
      close and the video and sound must stop playing
- [x] Adjust the game Timing
   - Allow the user to click on the displayed card to make it disappear.
   - In general the game should be faster paced
   - If the user becomes more impatient and clicks in fast succession, the game should tend to slow down
     to antagonize them. 
   - If the user becomes more patient and clicks slower, the game should tend to speed up to 
     encourage them.
   - Make it obvious to the user that this is happening, with witty toast messages that pop up and fly away
- [x] Run the linter and fix all errors
- [x] Replace the good card and bad card sounds
   - sounds/card_good_NN.mp3 have been replaced with sounds/card_good_NN.wav
   - Same for bad sound cards. Integrate the wav files into the app
   - Remove the mp3 files from the project and the git repo.
- [x] Implement a new modal dialog for the give up button
   - Play sounds/giveup_00.wav
   - Display the video from public/videos/giveup_00.mp4
   - Reuse the same panel that was used for the bank score modal just
      with a different video and sound
   - The button should be labeled "I confe$$, I have no R13z" instead of "Continue"
- [x] Enhance the user experience
   - Pre-download all images, videos and sounds when the app loads
   - Include logging about stats as # of resources downloaded, sizes and MB/S
   - Fix resource preloading to only happen once when the app initially loads
- [x] Make good cards give 1.25% bigger scores
   - Apply a 1.25x multiplier to attribute values for good cards
   - Add logging to show the original and multiplied values
- [] Enhance the user experience with animations
   - Animate the stats, label, emoji and score individually.
   - Make them bounce up and down and left and right
   - Make them bounce more when the score is higher and less when the score is lower
   - Make all the emojis insanely bigger and emphasized
   - Animate the card as it's dealt
   - Animate the card as it's removed from play
   - Animate the bank score modal as it's opened and closed
   - Animate the give up modal as it's opened and closed
   - Animate the Rizz level as it's increased
   - Animate the special events as they're triggered
- [] Implement hybrid visual style (clean base with glitchy effects during special events)
- [] Set up Google Analytics for basic user engagement tracking
   - prompt the user for a new streaming project id

## Infrastructure Tasks
- [x] Update S3 bucket configuration for rizz-power-up
- [x] Configure CloudFront distribution for the new app
- [x] Set up Route53 DNS records
- [x] Configure SSL certificate
- [x] Test the infrastructure deployment

## Testing Tasks
- [] Test the app on various mobile devices and screen sizes
- [] Verify that local storage works correctly for saving progress
- [] Test special events system
- [] Verify analytics tracking is working properly