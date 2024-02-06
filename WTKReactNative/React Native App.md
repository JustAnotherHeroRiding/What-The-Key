# [Api Docs](https://what-the-key.vercel.app/docs)
# [Icons](https://icons.expo.fyi/Index)


## Multi platform App

Instead of using Kotlin to create a native android app, let's use React native to create a multi platform app.
We need to implement the same 4 pages with full feature parity

## Navigation
- Navigate between the pages, using the same logos and look from the website #DONE 

## Home page
- Get random track #DONE 
- Debounce the input and only make a request after 300 ms have passed of no changes to the query #DONE 
##### [Custom debounce](https://sugandsingh5566.medium.com/mastering-throttle-and-debounce-functions-in-react-native-with-javascript-a03965240829) or we will use lodash. For now i am thinking using lodash
- Search spotify tracks #DONE 
- Style the search results #DONE 
- Add the close single result button inside of the component itself #DONE 
- Add tracks to library from the search results #DONE 
- Search results will be styled similar to spotify, small rows with small images of containers #DONE  
- Add track option from the random track #DONE 
- Responsive context menu when adding track #DONE 
- When adding a track, we should check that it is both not in the library or the recycle bin #Maybe 
#### Currently if i try to add a track that is is in the trash to the library, it will be moved which is actually not bad

## Services
To reduce code repetition, let's store all of the api calls into a single service 
- Create a track service #DONE 
- Move the add to library function to the service #DONE 
- Inject the service in all components where we do track related calls(Track, SearchResultTrack, RandomTrack) #DONE 
- Create a service for the spotify endpoint requests #DONE 
- Create two queries for searching tracks and getting a random track #DONE 
- Implement the functions from the service in the home page #DONE 
  - Add and get tab functions #DONE 

## React query
Implement react query to simplify all the data management
- The add track mutation is throwing a type error despite the fetch call being correctly type #DONE 
- Get tracks query #DONE 
- Permanently delete track mutation #DONE 

## Toasts
###### Bug alert
- Sometimes toasts are not showing up when adding tracks, even thought they should always be triggered from the mutation
Let's push the toast a bit higher as it is blocking the menu #DONE 

##### Image Distortion
- Currently the left and right sides of the image are being distorted in the result card due to the image being stretched. Make sure that the image does not lose quality and is preserved #DONE 
#### For now I set the width and height to be the same to keep the aspect ratio, object-contain was distorting the edges

## Track component
- Create a separate track component that will be used in the library and bin #DONE 
- equip it with all options like delete/restore, permanent delete, show/add tabs and open the spotify link
- Manage context menu boolean in each component separately #DONE 
- Adding and getting the tabs #DONE 
- Displaying tabs if they have been added #DONE 

## Library
- See all tracks in the user's library #DONE 
- Flatlist to render the tracks #DONE 
- Pull to refresh to make another request #DONE 
- Delete the tracks to send them to the recycle bin #DONE 
- Infinite scroll for tracks
- Display tabs in the context menu #DONE 
## Deleted 
- See all tracks added to the recycle bin #DONE 
- Restore tracks to library or delete them permanently #DONE 
- Display tabs in the context menu #DONE 

## Animations
- When the Random track is closed or opened there should be a smooth animation, similar to the balloon effect in the webapp #DONE 
	- See where we can implement animation in other places. I think adding and removing tracks are obvious candidates but they should not mess with the cache refreshes from react query

## Adding tracks and cache
- Adding a track works but there was a bug where no toast was displayed yet the track was added #Bug
- Also the context menu should also close #DONE 
- The cache needs to be invalidated, it seems to be autocached #DONE #ReactQuery

## Auth
- Log in and manage the library of tracks using the same database as the website #DONE 
- Use the supabase tutorial to set up the auth flow [Link](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native) #DONE 
- Do an auth check on the auth screen, and then render the profile or sign in component depending on the session #DONE 
- Set up the profile picture and profile views #DONE 
- Image uploading #DONE 
- The profile picture changes on the client, but it does not get updated in the db #DONE 
##### In the sql functions i did not add my url and service key when copying them from the guide. After that i had single and double quotes around the url. Uploading correctly updates the profile now.
- Implement deep linking for verifying the email [Deep linking Guide](https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native)

## Combining Library and Deleted into one component
- The logic is the same, the only difference is the source being passed to the fetch location and the track component. Since there difference is only one variables, I can maybe pass it as a prop from the nav menu #DONE 
- While we're at it, let's move the tab modal into a component as it only needs the track as a prop #DONE 

## Prettier
- The formatter is barely doing anything, why is that?  #DONE 
#### It was because prettier was not set as the default formatter

## Tab url and context menu
- When the context menu of the first track reaches the second, the text of the second track has a higher z-index. Perhaps I will have to sent the context menu to the parent just like the tab modal. Or maybe it does not have to be absolute #DONE 
- Create a new component for the context menu #DONE 
- Style the tab modal, the slate background color does not look good #DONE 
- Text input extends beyond the screen width #DONE 
- Currently to find a url we have to leave the app and open a browser manually. Let's embed a link to the system browser/search engine to search for tabs and then go back #DONE  

## Single track page
- This will have to be a new screen #DONE 
- Users can click on the context menu open details option to access it #DONE 
- Additional option in the context menu on tracks in the library #DONE 
- Users can also access this page from the search results or the random track
- The screen should make a call to the audio analysis spotify endpoint that will give more data to work with.  #DONE 
- This api endpoint will be a new spotify endpoint in our spotify controller #DONE 
- Figure out why the single track page does not have a 100% opacity #DONE 
- Single track page details do not load on the first open, only after the second time #DONE 
##### The single track page is proving to be problematic, It might have something to do with the fact that it is a separate stack. The transparent nav theme seems to be affecting it. When I go back using the header, it works.
###### Turns out that the animation of the Stack.Navigator was causing the issue as the transition is problematic. I disabled it as there is no mention of this issue anywhere.
- Display the basic information #DONE 
- Display the tabs on the single track page for logged in users #DONE 
- create an endpoint to check if the user has added the track before displaying the tabs on the backend #DONE 
- Make the check on the front end to see if it was added 
Here we will display much more info about a track than before, for motivation let's use the notes in the main file


## Intermission - Installing it
- Generate an APK that we can install locally #DONE 
 [APK_URL](https://expo.dev/artifacts/eas/3VCd3Fy9B9vJ3d25BKYKaJ.apk)
- Install it and see how it feels to use it #DONE 
- Change icon, name and splash screen #DONE 

## Sign In/up Experience
- Show password button #DONE 
- Show error if the email is not valid
- DEEP LINKS #DONE 
##### When signing out the profile image should be reset #DONE 
- Add the Oauth providers(spotify and github) #DONE 
- Signing seems to be kind of buggy and is not refreshing or responsive at all even though the user will get signed in, maybe redirect on success #DONE 
- Icons for the provider log in #DONE 
- Reset password #DONE 
- Input validation to make sure that the email is valid before the buttons will make a request #DONE 
- Loading indicators when logging in #DONE 
- Show a message when requesting a magic link #DONE 

## Consistent Context menu design
- On the home page the context menu is still absolute, let's make it a dropdown like in lib/bin #DONE 

##### Loading spinner size prop
- Let's make the spinner more customizable instead of having a fixed size #DONE 

## Music Theory Help
###### On the Detailed Track page, we have buttons for Scales, chords, triads and chord progressions. When the user clicks on these buttons they should get diagrams and info on what will sound good in the key of the song.
Each button will lead to a new child screen of the single page track screen #DONE 
Correct the type errors when navigation the track page
- For chords we can display each interval of the I chord and some common voicings(With an expand button to display all voicings)
- For Scales we can diagrams of scales that will sound good in the current key
- Same for modes
- For triads we can show the different positions of each chord, this will not vary much between tracks. I will also need to research what triads are #Research
- Chord Progressions - This one I'm not too sure. I could display some common chord progressions starting from the key of the song as the I chord, but I do not know if I can extract the chord progression of the song itself. Maybe by analyzing the sections/bars.
- Twelve bar blues chart in chord progressions to play blues over any song. In the play section we can make it interactive

## Play mode
When we click play, we start the play along experience
- Use the bars and add some sort of indicator to show the progress
- Add a tick on each beat, play a sound if the users wants to function as a metronome
- We can loop over all of the beats
- Sections can be used to change the track info displayed
- Each section will display  the tempo, key , mode, time-signature
- For segments, try to use the pitch and timbre, but learn first what they represent
- For tatums, as they are less than a beat, we can have some sort of visual indicator but no sound or progress on the bar
- Scale schematics and chords will display in the middle of the image while track is playing
- Let's try to play it using a the user's own spotify account
- The image, name and artist will shift to the bottom
- Allow user to mute the track and only use the metronome, or just hear the track to play along


## Redesign the library/deleted split
- Library should be for songs I am learning to play
- Deleted should be for songs I have already learned or stopped learning
- Maybe add a tag and have many sections so that users can filter them more effectively
- Perhaps limit the number of tracks in the library to encourage focus on a couple of songs

## Drag and drop
- Allow users to reorder the tracks in the library/Bin
## Filters and search
- When in the Lib/Bin screen, users can apply filters or search tracks in the library
- The search bar can be somewhere on top in the header, with the title on the left edge
- This will be local until I implement an infinite query, after which it will make a db call

## Shazam-like integration
- Activate the mic to detect a song
- Afterwards search for that song and open the track details page
Possible APIs: [Audd](https://audd.io/) or [AcrCloud](https://www.acrcloud.com/) We need to use the recorded audio from the mic to make a call to an api/service to detect the song

## Supabase emails Design
Style the emails that supabase sends for email confirmation/reset password and everything else that we will use
###### It seems that Css is not being applied in the email being sent
###### After using the Figma plugin Marka, it generated a template that was rendered as intended on gmail. I have added a template for the forgot password, email but it needs a lot of work.
#### [Figma Email Templates](https://www.figma.com/file/aBU8v75k4laGQ5Qg7MaDod/Mail-design-system-for-Marka-Plugin-(Community)-(Copy)?type=design&node-id=0-1&mode=design&t=Oj8jOeNboUIQeaaV-0)
- Working email styles #DONE 
- Personalize the forgot password email using Figma to style the email
- Use a similar looking template for sign up and magic link emails
## Ui Motivation
- Have a look at the Spotify and ChatGPT apps for possible improvements to my UI

## Rate Limiting
- Currently users can spam the refresh button, limit it so that this is not possible

## Zustand
- If react query is not enough, use zustand to manage global state