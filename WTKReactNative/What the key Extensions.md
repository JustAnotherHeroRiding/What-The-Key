Now that the basic functionality is complete and users can search and save songs, have tabs ready to go along with a powerful study screen to learn all scales, modes, triad positions and 7th chords, we can get to work on extending and improving the existing features to provide a professional feeling UX

## Home page - Recently Opened
Currently when opening the home page we have a search bar, get random track button and the search button. Let's fill up the home page.
- The search button can be removed completely as the searching happens automatically after the debounce period, can be replaced with a random scale #DONE 
- Add a prop to the Study screen that will preselect a scale #DONE 
- Make the scale selected be randomly selected #DONE 
- Open a new random scale on each button click #DONE 
#### Time to get back to the backend for an update. I will need to either add a new table, separate from the existing track table or attach a new table with userId and view count and a time stamp for when the track was opened, so that I can sort by the timestamp for recently opened
- Update the api endpoint to accept a used id and make a db call if one has been passed #DONE 
- Track whenever a user opens the single track page and keep statistics of how many times a track has been opened #DONE 

### Recently Opened
Add a couple of recently opened tracks so that users can keep playing from where they left off
- Make an endpoint where we can fetch the last 8 tracks opened by a user #DONE 
- Fetch them sorted by the timestamp, and limit the amount to 8 #DONE 
- In the home page, make a request and display a horizontal `FlatList` of these tracks #DONE 
### Favorites
- Show a `flatlist` of most opened tracks #DONE 
- Added type to reuse the same endpoint for fetching the history #DONE 
- Used raw sql queries to return the correct data #DONE 
### Recommendations
Use the current tracks in the library as the seed for recommendations in a horizontal `FlatList` of tracks. Better yet we can use a mix of the latest and most popular tracks.
- Create a component where the `flatlist` will be displayed #DONE 
- If the user uses **Safe** mode, we will put the 5 most opened tracks as the 5 track seeds #DONE 
- If the user uses **New** mode, the we will use the last 5 opened tracks #DONE 
- Scale/mode/triad/seventh of the day - Pick one at random and when clicking on it, it should open the study page with the fretboard open. #DONE 
##### Keep working on it so that all types are displayed correctly as we just expanded the scale data type, so all types need to tested
- Learn more link that will open the study page #DONE 
- On the theory of the day widget, there should be a couple of examples such as position one of the scales, notes/interval columns, name of the theory topic
- notes/intervals added #DONE 
- name and description #DONE 

## Sound
Record each note so that users can click on each fret to play the note and see these scales sound like.
- Record each note for the first 16 frets #DONE 
- Create a sound context to manage the playing of files globally #DONE 

### Create a separate wav file for each note
- High E string #DONE 
- B #DONE 
- G #DONE 
- D #DONE 
- A #DONE 
- Low E #DONE 

### Make clicking the frets play the notes
- Clicking on a fret will play the note #DONE 
- Double clicks should stop the previous clip and start again #DONE 
- Test and see if double click should stop the first clip or play it twice, try to make it feel as if you are playing a real guitar #DONE 
- Only one note can be active per string #DONE 
##### the `unloadAsync()` function from `expo-av` causes the click, the note clips themselves are good. Used a hack fix where i just mute the string but a better solution is needed
- Fix notes with a click, identify badly cut notes #TODO

#### Playable Note/Intervals columns
When displaying the note and interval columns for the selected scale, clicking on each column should play the appropriate note #DONE 


#### Theory of the day continuation
- Format the name so that it is not in camelCase #DONE 
- Manually test to see if the correct type will be preselected with all 4 theory types #TODO


### Scale description
Each scale object already has a short description, but we have to find it as we are only using an array of string/mode names
- Let's add a short description for each scale #DONE 


## Note/Interval column
As this is being used in multiple places and has more complicated logic now that it can also play sounds, let's create a separate 
component for it
- Create the component and replace all uses of it #DONE 
- Currently it is being used in the theory of the day #DONE 
- Study page #DONE 

## Redesign the library/deleted split
Library should be for songs I am learning to play #DONE 
Deleted should be for songs I have already learned or stopped learning #DONE 
##### Limit the number of tracks in the library to encourage focus on a couple of songs
- Add the counter #DONE 
- Take the current number of tracks to display #DONE 
- Change color to orange at 15 #DONE 
- Change to red at 20 #DONE 
##### Multiple ways to handle the global access to the number of added tracks.
- Add a backend endpoint that will simply return the number of tracks that a user has added #DONE 
- Reuse the profile profile context to access the profile settings #DONE 
- Extend the user model to include the `trackLimitEnabled` flag #DONE 
- Stop add track requests if the limit is reached
- Add settings in the profile to allow users to disable the limit
- Add an info sign next to the limit to explain what it does with a little pop up modal
## **Scrapped** I will not add the track limit


### Single track update
- When a track is added from the single track page, update the save button to an open tab button #DONE 
- Make only the button load and not the entire page #DONE 


## Filters and search
- When in the Lib/Bin screen, users can apply filters or search tracks in the library #DONE 
- The search bar can be somewhere on top in the header, with the title on the left edge #DONE 
- Create an endpoint to fetch only a single page #DONE 
- Create separate component to use the infinite query and test it out with a button to get the next page #DONE 
- Make the library/bin query infinite #DONE 
##### Seems to be fetching the same 5 tracks for both the library and the deleted page. changing the param manually also returns the same 5 ids #FIXED
- Render the combined items from all pages in a **Flatlist** so it is scrollable #DONE 
##### Trying to fetch the last page currently crashes the app the api returns an error
- Scrolling down will trigger the second page to load, make the limit 20 tracks #DONE 
- Create a search endpoint that will search the user's library or deleted tracks.  #Scrapped
###### Since we are using paginated data, it is better to be safe and use db search instead of filtering locally. However since we have no track metadata outside of the id, we cannot filter our db so we must fetch all tracks and then filter those. The initial query will be cached so this will be a one time big query.
- Make a db call to display the filtered results, the query key will be the location and the query #DONE 
The search endpoint uses the get all tracks to filter as we have no metadata in the database. If we start including the track, artist and album names it would make sense to use an infinite query and make it work #TODO 


## Multi Touch
- When pressing on two notes/columns at the same time, both notes should play #DONE
- Add feedback when a click is registered #DONE 
- Turn the fretboard maps into `FlatList` #DONE 
- Remove the nested virtualized list warning, perhaps convert the child flatlist to a normal view #DONE 
- After I removed the scrollview from the study page, the scaleslist do not get rendered #DONE - Reverted it back to maps
- After refactoring the fretboard to use flatlists when going into landscape mode it is upside down #REMOVED - the landscape mode is not really needed and only used for the fretboard. the note rotation handles a landscape use case
#### Bug - Sometimes quick taps keep the button stuck with low opacity and it will reset only on a new tap #DONE This bug was caused when we press and slide the finger away, causing the END state to never trigger
- Add it to the fretboard #DONE 
