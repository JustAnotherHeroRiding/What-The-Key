
# What The Key
- An app whose purpose to is provide an easy way to find the key of a song using the Spotify API
- This is helpful for anyone that wants to play along with the song and is not sure in which key the song is
- Apart from the key, information such as BPM, name of the artist, year, album and various other song metadata will be shown
- Users can save song information, edit it to add notes or tips when playing over it
- Maybe use the GPT api to provide the chord suggestions or playing information
- There should be a field where users can add their a tab link




## Provide sample chord progressions and scales
- Let's try using the openai api to do this, after providing the song name, album, genre and other relevant song data besides the key and bpm

## Displaying Modes
- Show where that track is in a minor or major key using the mode field, Major is 1, minor is 0 #DONE 

## Drag and drop
- Allow users to rearrange their tracks and have the order be permanent, this will most likely have to do a db call
- There should be a icon on the top right that will be the only place where a track can be dragged from instead of making the entire track draggable
## Playing songs
- Figure out a way to play the song directly from spotify using the user's account
- This way the user can see the information about the track and play along


## fetch tracks and populate the card
- Input bar to search #DONE 
- If user is not typing for more than 300ms then the search will be triggered making a call to the spotify api #DONE  
- A list of tracks will be shown as search results after a debouncer function ticks down to 300ms #DONE 
- If a Track is clicked, it should open the details for the track #DONE 

## Loading spinners
- Implement a loading spinner while the tracks are searching #DONE 
###### - When adding or deleting a track, add a spinner

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
- Save tracks when fetching a random track #DONE 

#### Filters
- Map the button names to the actual TrackData fields #DONE 
##### Should we flatten the track data into one array so that we do not have bother looking in both track and audio features?
- Only one filter can be active at a time, clicking another one will reset the active filter #DONE 
- Some filters should be able to mix, but it should not possible by default, for example we should be able to sort by energy and decade together
- Make each filter work #DONE 
[[Song Key#^filters-list]]
## ----------Filter ends here-----------

## Tabs
- Added a new table that will save the relation between the track, the url of the tabs and the user that added the link #DONE 
- Special field for the tab links to ultimate guitar or any other website. There should be another icon #DONE 
- For now each user will upload their own link #DONE 
- Maybe even display a little preview of the tabs on hover. Let's display the tab link in the modal #DONE 
- Style the modal until it looks nice #DONE 
- Once the tab successfully get's updated, display it and clear the input #DONE 

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
so previously i was manually fetching it, let's set one token for all spotify service requests #DONE 
- Handle the token refresh correctly for all requests
###### [A spotify access token lasts for 1 hour](https://developer.spotify.com/documentation/web-api/concepts/access-token)

## Spotify Service
- Copy the service and correct all the imports #DONE 
- See what won't work and how we can adjust the endpoints #DONE 
- This will have to be transferred to the backend when it comes to making requests in order to hide the keys #DONE 
- The angular spotify service should only call the api which will handle the data fetching on the back end #DONE 
##### Seems to be working for now. Random track, searching, library and deleted are working without issues and I did not have to make any changes to the components. Pay attention for any failed requests
- After one hour the token expires and requests start failing with an error code 401 due to the token being invalid, we will have to implement a token refresh #DONE 
##### I added a timestamp and once it reaches 3600 seconds from the current time, it will refresh the token once a request is made


## Local storage to database
- Replace all data previously stored in local storage to use the database instead. So far we have adding a track and the library of tracks, let's handle the rest of the data #DONE 
- Fix the filters to work again #DONE 
- Loading spinners while the data is loading #DONE 


## Caching data
- When a user first loads a component, it will make a db call. If a user then renders that component again, the track data should be cached and another request will not be needed unless the cache expires #DONE 
##### Seems like i handled all the cases where track data needs to be invalidated, but let's pay attention if stale data will show up somewhere

### Caching User data
- User cache service #DONE 
##### Let's' think where i will need to update the cache, most likely just in the profile component. The navbar should also use the cache
- Let's also cache the user data for the profile page so that it does not send a new request every time #DONE 
- Use the observable session instead of the synchronous #DONE 

### Caching single tracks
- An object containing track id as key and the track data as a value to store the cache #DONE 
- Updated track cache to handle caching and invalidating the single track data #DONE 
- When opening the same single track page it should display the cached data #DONE 

## Lazy load
##### Right now all components are loaded when the page first renders. Let's make it so that they are only rendered once their route is opened.
`    path: 'news', loadChildren: () => import('./news/weather.module').then(m => m.WeatherModule)`
This is how the example for lazy loading was. A new module was created. We will need to create a new module for each feature in my app that I do not want to load on the initial page render.
- Create a module for the library and recycle bin/deleted components as the logic is mostly the same here. These can even be condensed to one component. #DONE 
- Shared module for components such as spinners that are needed in multiple modules #DONE 
- Module for auth components #DONE 


## Junction tables
- Add 2 new models to use as tables for the library and recycle bin for each user #DONE 
- Currently when adding a track it does not work from the home page as the prisma operation does not seem to be valid #DONE 
- Also adding a track to the bin does not remove it from the library #DONE 

## Add Tab modal transition
- It should grow like a balloon to its intended size #DONE 

## Figure out why it is so slow after creating the new supabase project 
##### I believe that I have sped it up as much as possible and with the cache the experience will be much better.
- When loading the library or deleted sections it is very very slow compared to before
##### Optimization Possibility
- We could store the array of track ids as one string which we can get directly from the db and make the call to spotify with it instead of fetching all track ids which is slower. However let's see what the actual bottleneck is.



## Create an auth guard
- If a user that is not logged in is trying to access sites such as /profile, /library, /deleted, they should be redirected to the log in screen #DONE 
- Add a canLoad method for lazy loaded routes #DONE 

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
- Working filter for descending, ascending and reset #DONE 
- Style the button depending on the current state #DONE 
##### 2. **Energy Filter:**

- Similar to danceability, filter tracks based on their energy level. Again, a slider or predefined ranges could be used. #DONE 
###### Used the same asc/desc/normal function again here
##### 3. **Mood/Valence Filter:**

- Valence measures the musical positiveness conveyed by a track. You could filter tracks that are more positive/upbeat versus those that are more negative/somber. #DONE 
##### 4. **Acousticness Filter:**

- Users can filter tracks based on how acoustic they are. This could be useful for finding more organic, less electronically-influenced music. #DONE 
##### 5. **Instrumentalness Filter:**

- This would be great for users who are looking for instrumental tracks, perhaps for background music or study sessions. #DONE 
##### 6. **Duration Filter:**

- Allow users to filter tracks based on their length. This could be handy for those who are looking for either quick listens or longer experiences. #DONE 
- We could add a minimum/maximum length length
##### 7. **Popularity Filter:**

- Users might want to filter tracks based on their popularity, which can be a proxy for how well-liked or recognized a track is. #DONE 
##### 8. **Loudness Filter:**

- While not a common filter, some users might be interested in filtering tracks based on their loudness levels. #DONE 
##### 9. **Tempo Filter:**

- For users who are looking for music of a certain tempo (measured in beats per minute), this filter could be quite useful. #DONE 
- We could add an input here to enter a number 
##### 10. **Artist/Album Filter:**

- Allow filtering by artist or album. This is more straightforward but very useful, especially in a large library.
- No need to filter by artist/album as we can just search for it #DONE 
##### 11. **Explicit Content Filter:**

- Some users might want to filter out tracks with explicit content. #DONE 
##### 12. **Key Filter**
- Filter songs by the key they were written in, going back to the main point of the website #DONE 
##### 13. **Mode**
- Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0. #DONE 
##### 14. **Decade**
- We can get the release year and filter songs by the decade
