# TODO Things

## Commit changes to git before task completion
Prior to completing a task, ensure that all changes are committed to git and pushed to the origin
Create a git commit which includes all changes since last commit on this branch 
Generate a a summary of changes from the diff of all changed files and your context for the commit message
Ensure to include Development Cost Metrics. Don't use $ in API Cost, replace it with USD xx.yy
Disable the pager for all git commands while figuring out the diff
Use the latest API cost of this task for the API Cost metric.
Use time difference between now and the last commit timestamp for the development time metric

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
- [] Refine image filenames
   - Read the prompts in apps/frontend/public/memes/rizz_image_prompts_no_text_overlay.md 
   - Rename the files in the bood and bad subdirectories to be URL compatible
      - Only use chars from regex /[0-9a-zA-Z-.]+/ and .png extension
      - Generate a typescript file for the frontend app that can be used to reference both the good and bad images images for displays
- [] Create a vaporwave-inspired TailwindCSS theme
  - Generate a theme for the app based on ./design/mockups/mock1.png and mock2.png
  - Use ./design/mockups/ui.html as a reference, it's an implementation-ready HTML+Tailwind component
- [] Design and implement the main game screen with Rizz button
- [] Create a database of predefined Rizz quotes (at least 100 unique quotes)
- [] Implement local storage for saving user progress
- [] Implement stats system (Vibe Level, Swagger, Cringe Avoidance, Rizz Level)
- [] Create special events system that triggers every 10 taps
- [] Implement hybrid visual style (clean base with glitchy effects during special events)
- [] Set up Google Analytics for basic user engagement tracking

## Infrastructure Tasks
- [] Update S3 bucket configuration for rizz-power-up
- [] Configure CloudFront distribution for the new app
- [] Set up Route53 DNS records
- [] Configure SSL certificate
- [] Test the infrastructure deployment

## Testing Tasks
- [] Test the app on various mobile devices and screen sizes
- [] Verify that local storage works correctly for saving progress
- [] Test special events system
- [] Verify analytics tracking is working properly