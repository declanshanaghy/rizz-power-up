# TODO Things

## Commit changes to git before task completion
Prior to completing a task, ensure that all changes are committed to git and pushed to the origin
Create a git commit which includes all changes since last commit on this branch 
Generate a a summary of changes from the diff of all changed files and your context for the commit message
Ensure to include Development Cost Metrics. Don't use $ in API Cost, replace it with USD xx.yy
Disable the pager for all git commands while figuring out the diff
Use the latest API cost of this task for the API Cost metric.
Use time difference between now and the last commit timestamp for the development time metric

- [] Setup a new git repo for rizz-power-up, then push it up to GitHub in a public repo
- [] Read the PRD.md file and create a plan for the project. Ask for feedback using yes or no questions on how the app should operate
   - [] As new tasks are discovered write them back into the TODO.md file for future work
- [] Initialize a new typescript react project in apps/frontend
- [] Configure an aws profile for "rizz-power-up"
- [] Rewrite the copied opentofu modules inside ./infrastructure to handle the rizz-power-up app, instead of dollar-game
- [] Rewrite the copied GitHub actions inside .github to handle the rizz-power-up app, instead of dollar-game