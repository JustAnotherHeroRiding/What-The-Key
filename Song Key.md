
# What The Key
- An app whose purpose to is provide an easy way to find the key of a song using the Spotify API
- This is helpful for anyone that wants to play along with the song and is not sure in which key the song is
- Apart from the key, information such as BPM, name of the artist, year, album and various other song metadata will be shown
- Users can save song information, edit it to add notes or tips when playing over it
- Maybe use the GPT api to provide the chord suggestions or playing information
- There should be a field where users can add their a tab link




## Also provide some sample chord progressions
- Let's try using the openai api to do this, after providing the song name, album, genre and other relevant song data besides the key and bpm


## fetch tracks and populate the card
- Input bar to search #DONE 
- If user is not typing for more than 300ms then the search will be triggered making a call to the spotify api #DONE  
- A list of tracks will be shown as search results after a debouncer function ticks down to 300ms #DONE 
- If a Track is clicked, it should open the details for the track #DONE 

## Loading spinner when searching
- Implement a loading spinner while the tracks are searching #DONE 

## Icons for Navbar and Buttons
- Use Dall-E to generate a logo #DONE
- Generate icons for the menu items #DONE 

## Route handling
- Make the navbar menu link to the pages of my site #DONE 
- Create separate components for each route #DONE 
- Home component for everything we have created so far #DONE 
- Library component for saved tracks #DONE 
- Deleted component for recently deleted tracks that can be restored or deleted permanently #DONE 
## Save tracks
- A user can save the tracks and it's information #DONE 
- Toast messages to give feedback when a message is added or has already been added #DONE 
- When navigating to the library section, all the saved tracks will be shown #DONE 
- Here the user can search for the saved tracks #DONE 
- Or use filters to display tracks according the characteristics in the audio features object #DONE 

#### Filters
- Make each filter work
[[Song Key#^filters-list]]
## ----------Filter ends here------------
- Special field for the tab links to ultimate guitar or any other website
- Maybe even display a little preview of the tabs on hover
## Delete tracks
- Add a delete button #DONE 
- Users can delete each of the saved tracks #DONE 
- This will put them in the garbage #DONE 
- Show the tracks in the recycling bin on the deleted page #DONE 
- Restore button #DONE 
- Figure out how we can delete them after a certain time has passed
- Users can also delete them permanently if they wish #DONE 
- The logic for the library and the deleted is similar, perhaps condense to one component #DONE 
## Add custom description or notes to tracks
- When clicking on a track there will be a single page open #DONE 
- Here users can edit tracks
- Turn the track into a component #DONE 
- Stop propagation #DONE 

## Back End
- Link a supabase db to the project #DONE 
- Create two tables for the library and the recycle bin #DONE 
- Use supabase auth #DONE 
- Create a supabase client for the back end #DONE 
- Endpoint to fetch all users #DONE 
### PARSE THE REQUEST FROM ANGULAR #DONE 
##### Turns out my url was just wrong, users instead of user
- Stores the track ids for users in a database instead of local storage #DONE 
- Adding a track should save the track id in the library and connect it with the user #DONE 
- Replace the function using local storage with our back end service #DONE 
- fetch the tracks by first fetching the ids and then the tracks with a batch request to spotify #DONE 
##### So the reason is that the bearer token is null in the headers. Why is it null here but is correctly setting using the same function previously? 
so previously i was manually fetching it, let's set one token for all spotify service requests

## Auth
##### How does it work? The supabase service provides a way to interface with the database and our auth. Here we have the session that will most likely give us data about our user. Let's use it in the navbar
- Style the auth components #DONE 
- Fetch the session correctly to use in navbar #DONE 
- Style the log in Screen #DONE 
- Add a email and password log in option #DONE 
- Show an empty image if no profile pic #DONE 
- Separate the menu-end items in the navbar #DONE 
- Sync profile changes in the navbar #DONE 
##### Created a service and components can subscribe to the changes
- Allow the avatar component to accept styles #DONE 
- Make the name mandatory #DONE 
- Different routes for login/register #DONE 
- Add a github and google provider #DONE 




## Filters ^filters-list 

##### 1. **Danceability Filter:**

- Filter tracks based on their danceability score. You could create a slider or a set of predefined ranges (e.g., low, medium, high) for users to choose from.
##### 2. **Energy Filter:**

- Similar to danceability, filter tracks based on their energy level. Again, a slider or predefined ranges could be used.
##### 3. **Mood/Valence Filter:**

- Valence measures the musical positiveness conveyed by a track. You could filter tracks that are more positive/upbeat versus those that are more negative/somber.
##### 4. **Acousticness Filter:**

- Users can filter tracks based on how acoustic they are. This could be useful for finding more organic, less electronically-influenced music.
##### 5. **Instrumentalness Filter:**

- This would be great for users who are looking for instrumental tracks, perhaps for background music or study sessions.
##### 6. **Duration Filter:**

- Allow users to filter tracks based on their length. This could be handy for those who are looking for either quick listens or longer experiences.
##### 7. **Popularity Filter:**

- Users might want to filter tracks based on their popularity, which can be a proxy for how well-liked or recognized a track is.
##### 8. **Loudness Filter:**

- While not a common filter, some users might be interested in filtering tracks based on their loudness levels.
##### 9. **Tempo Filter:**

- For users who are looking for music of a certain tempo (measured in beats per minute), this filter could be quite useful.
##### 10. **Artist/Album Filter:**

- Allow filtering by artist or album. This is more straightforward but very useful, especially in a large library.
##### 11. **Explicit Content Filter:**

- Some users might want to filter out tracks with explicit content.
##### 12. **Key Filter**
- Filter songs by the key they were written in, going back to the main point of the website
##### 13. **Mode**
- Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
##### 14. **Decade**
- We can get the release year and filter songs by the decade
